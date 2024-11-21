import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component'
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ HeaderComponent, CustomInputComponent, MatButton, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent {

  constructor(private router: Router){}
  private fb = inject(FormBuilder);

  profilePicUrls: { [key: string]: string | null } = {};

  protected form = this.fb.group({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })


  async loadAllProfiles(): Promise<void> {
    // Cargar imágenes de 6 pacientes
    await Promise.all([
      this.loadPatientProfilePic('PlKconfsyoWx6agk75Ws0AGpf6N2','profilePic1'),
      this.loadPatientProfilePic('3rcznUybAYQkboNwqJesSVDmq3j1', 'profilePic2'),
      this.loadPatientProfilePic('NJcEP6RJYONCq0R7qukuVC1fNgr2', 'profilePic3'),
      this.loadSpecialistProfilePic('QJu2zBkbuXWmNixsbWXsijKCXCj2', 'profilePic4'),
      this.loadSpecialistProfilePic('ME2G08oTkPdZo6gpZFzEKq6j1cr1', 'profilePic5'),
      this.loadAdminProfilePic('aZQeRJAafQYMXbHxSfgDUGIsCzx2', 'profilePic6')
    ]);
  }

  firebaseSvc = inject(FirebaseService);

  ngOnInit(){
    this.loadAllProfiles();
  }
   
  redirectToSignUp(event: Event){
    event?.preventDefault();
    this.router.navigateByUrl('/sign-up/select');
  }

  async submit() {
    const formValue = this.form.value;
    if(formValue.email && formValue.password){
      await this.firebaseSvc.sigIn(formValue.email, formValue.password)
      .then(res => {
        console.log(res);
        // Redirigir al Home después del inicio de sesión exitoso
        this.router.navigate(['./home']);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  async loadPatientProfilePic(uid: string, imageKey: string): Promise<void> {
    try {
      const profilePicUrl = await this.firebaseSvc.getPatientProfilePic(uid);
      
      if (profilePicUrl) {
        this.profilePicUrls[imageKey] = profilePicUrl; // Guardamos la imagen con el key proporcionado
      } else {
        console.warn('No se encontró la foto de perfil para el usuario con UID:', uid);
      }
    } catch (error) {
      console.error('Error al cargar la foto de perfil:', error);
    }
  }

  async loadAdminProfilePic(uid: string, imageKey: string): Promise<void> {
    try {
      const profilePicUrl = await this.firebaseSvc.getAdminProfilePic(uid);
      
      if (profilePicUrl) {
        this.profilePicUrls[imageKey] = profilePicUrl; // Guardamos la imagen con el key proporcionado
      } else {
        console.warn('No se encontró la foto de perfil para el usuario con UID:', uid);
      }
    } catch (error) {
      console.error('Error al cargar la foto de perfil:', error);
    }
  }

  async loadSpecialistProfilePic(uid: string, imageKey: string): Promise<void> {
    try {
      const profilePicUrl = await this.firebaseSvc.getSpecialistsProfilePic(uid);
      
      if (profilePicUrl) {
        this.profilePicUrls[imageKey] = profilePicUrl; // Guardamos la imagen con el key proporcionado
      } else {
        console.warn('No se encontró la foto de perfil para el usuario con UID:', uid);
      }
    } catch (error) {
      console.error('Error al cargar la foto de perfil:', error);
    }
  }


  //Paciente 6
  //v2o6wpixai@qacmjeq.com
  //123456
  //PlKconfsyoWx6agk75Ws0AGpf6N2

  // Función de acceso rápido
  accesoRapido1(): void {
    this.form.patchValue({
      email: 'v2o6wpixai@qacmjeq.com',
      password: '123456',
    });
  }

  accesoRapido2(): void {
    this.form.patchValue({
      email: '7xnfrrjfp8@zlorkun.com',
      password: '123456',
    });
  }

  accesoRapido3(): void {
    this.form.patchValue({
      email: 'bqvw60eqzr@tidissajiiu.com',
      password: '123456',
    });
  }

  // Función de acceso rápido
  accesoRapido4(): void {
    this.form.patchValue({
      email: 'ltpbfz6mbs@gonetor.com',
      password: '123456',
    });
  }

  accesoRapido5(): void {
    this.form.patchValue({
      email: 't8c3i7fds9@somelora.com',
      password: '123456',
    });
  }

  //uid QJu2zBkbuXWmNixsbWXsijKCXCj2
  accesoRapido6(): void {
    this.form.patchValue({
      email: 'xx9rz70tbc@dygovil.com',
      password: '123456',
    });
  }
  
}
