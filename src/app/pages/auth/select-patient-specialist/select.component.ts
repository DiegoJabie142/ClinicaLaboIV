import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component'
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ HeaderComponent, LogoComponent, MatButton, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: [
    trigger('slideInOut', [
      // Deslizar desde abajo cuando el componente entra
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),  // Comienza fuera de la pantalla
        animate('600ms ease-out', style({ transform: 'translateY(0)' }))  // Se mueve hacia su posición original
      ]),
      // Deslizar hacia abajo cuando el componente sale
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)' }))  // Se desliza hacia abajo
      ])
    ])
  ]
})


export class SelectComponent {

  isVisible = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  constructor(private router: Router){}

  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  
  firebaseSvc = inject(FirebaseService);

  ngOnInit(){
  }
   
  redirectToSignUpPatient(event: Event){
    event?.preventDefault();
    this.router.navigateByUrl('/sign-up/patient');
  }

  redirectToSignUpSpecialist(event: Event){
    event?.preventDefault();
    this.router.navigateByUrl('/sign-up/specialist');
  }

}
