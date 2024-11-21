import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component'
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ HeaderComponent, LogoComponent, MatButton, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})


export class SelectComponent {

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
