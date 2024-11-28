import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { PictureInputComponent } from '../../../shared/components/picture-input/picture-input.component';
import { CaptchaDirective } from '../../../directivas/captcha.directive';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sign-up-patient',
  standalone: true,
  imports: [HeaderComponent, CustomInputComponent, LogoComponent, MatButton, ReactiveFormsModule, FormsModule, NgIf, PictureInputComponent, CaptchaDirective],
  templateUrl: './sign-up-patient.component.html',
  styleUrl: './sign-up-patient.component.scss',
  animations: [
    trigger('slideInOut', [
      // Animación de entrada (desde la izquierda)
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),  // Comienza fuera de la vista en la izquierda
        animate('1000ms ease-out', style({ transform: 'translateX(0)' }))  // Desliza a su posición original
      ]),
      // Animación de salida (hacia la izquierda)
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))  // Desliza fuera hacia la izquierda
      ])
    ])
  ]
})
export class SignUpPatientComponent {

  @Input() header: boolean = true; // Inicializado en true por defecto
  @Input() esAdmin: boolean = false; // Inicializado en false por defecto
  @Input() color: string = 'blue';
  @Output() patientUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();


  isVisible = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  constructor(private router: Router) {}

  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('^[a-zA-Z]+$')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    socialWork: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    profilePic: new FormControl<File | null>(null, [Validators.required]),
    profilePic2: new FormControl<File | null>(null, [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
  });
  
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  
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
      const profilePic2File = formValues.profilePic2;

      if (profilePicFile && profilePic2File) {
        const uploadTasks = [
          this.firebaseSvc.uploadImage(profilePicFile, `profilePics/${formValues.name}_${formValues.dni}_1`),
          this.firebaseSvc.uploadImage(profilePic2File, `profilePics/${formValues.name}_${formValues.dni}_2`),
        ];
  
        // Usar Promise.all para esperar ambas cargas
        Promise.all(uploadTasks)
          .then(([profilePicUrl, profilePic2Url]) => {
            // Verificar que ambas URLs se hayan obtenido
            if (profilePicUrl && profilePic2Url) {
              // Crear el objeto del paciente con las URLs de las imágenes
              const patientData = {
                uid: formValues.uid,
                name: formValues.name,
                lastName: formValues.lastName,
                dni: formValues.dni,
                socialWork: formValues.socialWork,
                email: formValues.email,
                profilePic: profilePicUrl,
                profilePic2: profilePic2Url,
                age: formValues.age
              };
  
              // Registrar al usuario en Firebase Authentication
              if (formValues.email && formValues.password) {
                this.firebaseSvc.signUp(formValues.email, formValues.password)
                  .then(userCredential => {
                    const user = userCredential.user;
                    patientData.uid = user.uid;
  
                    // Guardar los datos del paciente en Firestore
                    this.firebaseSvc.saveUserDataAsPatient(patientData)
                      .then(() => {
                        console.log('Paciente registrado con éxito');
                        if(this.esAdmin==false){
                          this.router.navigate(['./home']);
                        }  
                        this.patientUploaded.emit(true);
                        this.form.reset();
                      })
                      .catch(error => {
                        console.error('Error al guardar los datos del paciente: ', error);
                      });
                  })
                  .catch(error => {
                    console.error('Error al registrar el usuario: ', error);
                  });
              } else {
                console.log('Faltan email o contraseña para registrar al paciente');
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
  

  onFileRemoved(): void {
    // Aquí se manejaría la lógica cuando se elimina la imagen
    this.form.get('profilePic')?.setValue(null);
  }
  
  onFileRemoved2(): void {
    // Aquí se manejaría la lógica cuando se elimina la imagen
    this.form.get('profilePic2')?.setValue(null);
  }

  onCaptchaOnSubmit():() => Promise<void>{
    return () => this.onSubmit();
  }

}
