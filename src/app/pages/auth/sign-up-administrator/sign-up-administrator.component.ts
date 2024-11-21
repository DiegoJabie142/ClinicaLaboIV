import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { PictureInputComponent } from '../../../shared/components/picture-input/picture-input.component';

@Component({
  selector: 'app-sign-up-administrator',
  standalone: true,
  imports: [HeaderComponent, CustomInputComponent, LogoComponent, MatButton, ReactiveFormsModule, FormsModule, NgIf, PictureInputComponent],
  templateUrl: './sign-up-administrator.component.html',
  styleUrl: './sign-up-administrator.component.scss'
})
export class SignUpAdministratorComponent {

  @Input() header: boolean = true; // Inicializado en true por defecto
  @Input() color: string = 'blue';
  @Input() esAdmin: boolean = false;
  @Output() administratorUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('^[a-zA-Z]+$')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    profilePic: new FormControl<File | null>(null, [Validators.required]),
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
  onSubmit() {
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
              // Crear el objeto del paciente con las URLs de las imágenes
              const adminData = {
                uid: formValues.uid,
                name: formValues.name,
                lastName: formValues.lastName,
                dni: formValues.dni,
                email: formValues.email,
                profilePic: profilePicUrl,
                age: formValues.age
              };
  
              // Registrar al usuario en Firebase Authentication
              if (formValues.email && formValues.password) {
                this.firebaseSvc.signUp(formValues.email, formValues.password)
                  .then(userCredential => {
                    const user = userCredential.user;
                    adminData.uid = user.uid;
  
                    // Guardar los datos del paciente en Firestore
                    this.firebaseSvc.saveUserDataAsAdministrator(adminData)
                      .then(() => {
                        console.log('Administrador registrado con éxito');
                        this.administratorUploaded.emit(true);
                        if(this.esAdmin==false){
                          this.router.navigate(['./home']);
                        }
                        // Limpiar el formulario después de un registro exitoso
                        this.form.reset();  // Limpiar formulario
                        
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


}
