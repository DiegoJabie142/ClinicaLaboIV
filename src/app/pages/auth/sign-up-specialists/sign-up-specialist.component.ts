import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { PictureInputComponent } from '../../../shared/components/picture-input/picture-input.component';
import { CaptchaDirective } from '../../../directivas/captcha.directive';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sign-up-specialist',
  standalone: true,
  imports: [HeaderComponent, CustomInputComponent, MatButton, ReactiveFormsModule, FormsModule, NgIf, PictureInputComponent, NgFor, LogoComponent, CaptchaDirective],
  templateUrl: './sign-up-specialist.component.html',
  styleUrl: './sign-up-specialist.component.scss',
  animations: [
    trigger('fadeScale', [
      // Animación de entrada
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),  // Comienza siendo pequeño y transparente
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))  // Se hace grande y visible
      ]),
      // Animación de salida
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))  // Se reduce y desvanece
      ])
    ])
  ]
})
export class SignUpSpecialistComponent {

  isVisible = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  @Input() header: boolean = true; // Inicializado en true por defecto
  @Input() color: string = 'blue';
  @Input() esAdmin: boolean = false;
  @Output() specialistUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  private fb = inject(FormBuilder);
  
  specialties: any[] = [];
  specialtiesDefault: any[] = [];

  form = this.fb.group({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('^[a-zA-Z]+$')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    specialities: new FormControl<string[]>([], [Validators.required]), // Especificar que es un array de strings
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    profilePic: new FormControl<File | null>(null, [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(25), Validators.max(100)]),
  });
  
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  specialtyForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]], // validaciones
    descripcion: ['']
  });


  async ngOnInit(): Promise<void> {
    this.specialties = await this.firebaseSvc.getSpecialties();
    this.specialtiesDefault = await this.firebaseSvc.getSpecialties();
  }

  onCheckboxChange(speciality: string) {
    // Usamos ?? [] para asignar un array vacío si el valor es null o undefined
    const selectedSpecialities: string[] = this.form.get('specialities')?.value ?? [];
  
    if (selectedSpecialities.includes(speciality)) {
      // Si ya está en la lista, lo eliminamos
      const updatedSpecialities = selectedSpecialities.filter((item: string) => item !== speciality);
      this.form.get('specialities')?.setValue(updatedSpecialities);
    } else {
      // Si no está en la lista, lo agregamos
      selectedSpecialities.push(speciality);
      this.form.get('specialities')?.setValue([...selectedSpecialities]);
    }
  }


  
  // Obtener los controles del formulario
  get formControls() {
    return this.form.controls as { [key: string]: FormControl };
  }
 
  onFileSelected(file: File, controlName: string): void {
  
    if (file.size > 2097152) {
      console.log("El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.");
      this.formControls[controlName].setValue(null);
    } else {
      this.formControls[controlName].setValue(file);
    }
  }
  
  // Enviar formulario
  async onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const profilePicFile = formValues.profilePic;

      if (profilePicFile) {
        const uploadTasks = [
          this.firebaseSvc.uploadImage(profilePicFile, `profilePics/${formValues.name}_${formValues.dni}_1`),
        ];
  
        // Usar Promise.all para esperar ambas cargas
        Promise.all(uploadTasks)
          .then(([profilePicUrl]) => {
            // Verificar que ambas URLs se hayan obtenido
            if (profilePicUrl) {
              // Crear el objeto del especialista con las URLs de las imágenes
              const specialistData = {
                uid: formValues.uid,
                name: formValues.name,
                lastName: formValues.lastName,
                dni: formValues.dni,
                specialities: formValues.specialities,
                email: formValues.email,
                age: formValues.age,
                profilePic: profilePicUrl,
                activated: false
              };
  
              // Registrar al usuario en Firebase Authentication
              if (formValues.email && formValues.password) {
                this.firebaseSvc.signUp(formValues.email, formValues.password)
                  .then(userCredential => {
                    const user = userCredential.user;
                    specialistData.uid = user.uid;
  
                    // Guardar los datos del especialista en Firestore
                    this.firebaseSvc.saveUserDataAsSpecialist(specialistData)
                      .then(() => {
                        this.syncSpecialties();
                        console.log('Especialista registrado con éxito');
                        this.specialistUploaded.emit(true);
                        this.form.reset();
                        if(this.esAdmin==false){
                          this.router.navigate(['/home']);
                        }
                        
                      })
                      .catch(error => {
                        console.error('Error al guardar los datos del especialista: ', error);
                      });
                  })
                  .catch(error => {
                    console.error('Error al registrar el usuario: ', error);
                  });
              } else {
                console.log('Faltan email o contraseña para registrar al especialista');
              }
            } else {
              console.error('No se pudieron obtener las URLs de las imágenes');
            }
          })
          .catch(error => {
            console.error('Error al subir las imágenes: ', error);
          });
      } else {
        console.log('Las imágenes no se han seleccionado correctamente');
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  allowOnlyLetters(event: KeyboardEvent) {
    const regex = /^[a-zA-Z ]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  async addNewSpecialty() {
    if (this.specialtyForm.valid) {
      const specialtyData = this.specialtyForm.value; // Obtiene el valor del formulario
  
      // Validar que specialtyData.nombre no sea null o undefined
      const specialtyName = specialtyData.nombre?.trim(); // Usamos trim() y guardamos en una constante
      if (!specialtyName) {
        console.log('El nombre de la especialidad no puede estar vacío.');
        return;
      }
  
      // Verificar si la especialidad ya existe en la lista
      const specialtyExists = this.specialties.some(
        (specialty) => specialty.nombre?.toLowerCase() === specialtyName.toLowerCase()
      );
  
      if (specialtyExists) {
        console.log('La especialidad ya existe en la lista.');
        return; // No se agrega si ya existe
      }
  
      // Agregar la especialidad a la lista
      this.specialties.push({ nombre: specialtyName, ...specialtyData }); // Aseguramos que el nombre siempre esté presente
      console.log('Especialidad añadida a la lista exitosamente');
  
      // Resetear el formulario
      this.specialtyForm.reset();
    } else {
      console.log('Formulario no válido');
    }
  }

  onFileRemoved(): void {
    // Aquí se manejaría la lógica cuando se elimina la imagen
    this.form.get('profilePic')?.setValue(null);
  }

  async syncSpecialties(): Promise<void> {
    try {
      // Identificar especialidades faltantes en specialtiesDefault que están en specialties
      const newSpecialties = this.specialties.filter(currentSpecialty => {
        return !this.specialtiesDefault.some(
          defaultSpecialty => defaultSpecialty.nombre?.toLowerCase() === currentSpecialty.nombre?.toLowerCase()
        );
      });
  
      if (newSpecialties.length > 0) {
        console.log(`Subiendo ${newSpecialties.length} nuevas especialidades...`);
  
        // Subir especialidades faltantes a Firebase
        for (const specialty of newSpecialties) {
          await this.firebaseSvc.addSpecialty(specialty);
          console.log(`Especialidad añadida: ${specialty.nombre}`);
        }
  
        // Actualizar specialtiesDefault para reflejar los cambios
        this.specialtiesDefault = await this.firebaseSvc.getSpecialties();
        console.log('Sincronización completada.');
      } else {
        console.log('No hay nuevas especialidades para subir.');
      }
    } catch (error) {
      console.error('Error durante la sincronización de especialidades:', error);
    }
  }
  
  onCaptchaOnSubmit():() => Promise<void>{
    return () => this.onSubmit();
  }

}
