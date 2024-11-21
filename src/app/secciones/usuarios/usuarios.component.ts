import { Component, Input, ViewChild } from '@angular/core';
import { DetallesComponent } from '../../usuarios/detalles/detalles.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { NgIf } from '@angular/common';
import { SignUpPatientComponent } from "../../pages/auth/sign-up-patients/sign-up-patient.component";
import { SignUpSpecialistComponent } from "../../pages/auth/sign-up-specialists/sign-up-specialist.component";
import { SignUpAdministratorComponent } from "../../pages/auth/sign-up-administrator/sign-up-administrator.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [DetallesComponent, HeaderComponent, NgIf, SignUpPatientComponent, SignUpSpecialistComponent, SignUpAdministratorComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  header = false; // Lógica que controle el valor de header

  isAddingPatient: boolean = false;
  isAddingSpecialist: boolean = false;
  isAddingAdmin: boolean = false;

  @ViewChild(DetallesComponent) childDetails: DetallesComponent | undefined;

  onPatientUploaded(success: boolean) {
    if (success) {
      console.log('hola');
      this.childDetails?.refreshPatients();
    }
  }

  onSpecialistUploaded(success: boolean) {
    if (success) {
      this.childDetails?.refreshSpecialists();
    }
  }

  onAdministratorUploaded(success: boolean) {
    if (success) {
      this.childDetails?.refreshAdmins();
    }
  }
  


  onButtonClick(type: 'patient' | 'specialist' | 'admin') {
    // Resetear todos los booleanos
    this.isAddingPatient = false;
    this.isAddingSpecialist = false;
    this.isAddingAdmin = false;

    // Activar el booleano correspondiente
    if (type === 'patient') {
      this.isAddingPatient = true;
    } else if (type === 'specialist') {
      this.isAddingSpecialist = true;
    } else if (type === 'admin') {
      this.isAddingAdmin = true;
    }
  }
  
}
