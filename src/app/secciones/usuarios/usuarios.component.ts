import { Component, inject, Input, ViewChild } from '@angular/core';
import { DetallesComponent } from '../../usuarios/detalles/detalles.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CommonModule, NgIf } from '@angular/common';
import { SignUpPatientComponent } from "../../pages/auth/sign-up-patients/sign-up-patient.component";
import { SignUpSpecialistComponent } from "../../pages/auth/sign-up-specialists/sign-up-specialist.component";
import { SignUpAdministratorComponent } from "../../pages/auth/sign-up-administrator/sign-up-administrator.component";
import { FirebaseService } from '../../services/firebase.service';
import * as XLSX from 'xlsx';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [DetallesComponent, HeaderComponent, NgIf, SignUpPatientComponent, SignUpSpecialistComponent, SignUpAdministratorComponent, MatIconModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  animations: [
    trigger('zoom', [
      // Animación de entrada (escala al entrar)
      transition(':enter', [
        style({ transform: 'scale(0)' }),  // Comienza reducido
        animate('300ms ease-out', style({ transform: 'scale(1)' }))  // Aumenta a tamaño original
      ]),
      // Animación de salida (escala al salir)
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0)' }))  // Se reduce a 0
      ])
    ])
  ]
})
export class UsuariosComponent {

  isVisible = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  header = false; // Lógica que controle el valor de header

  isAddingPatient: boolean = false;
  isAddingSpecialist: boolean = false;
  isAddingAdmin: boolean = false;

  pacientes: any[] = [];
  especialistas: any[] = [];
  administradores: any[] = [];

  captchaStatus: boolean = false; // Variable para almacenar el estado del captcha

  firebaseSvc = inject(FirebaseService);

  @ViewChild(DetallesComponent) childDetails: DetallesComponent | undefined;

  async ngOnInit(): Promise<void> {
     this.pacientes = await this.firebaseSvc.getAllPatients();
     await this.cargarEspecialistas();
     this.administradores = await this.firebaseSvc.getAllAdmins();
     this.captchaStatus = await this.firebaseSvc.isCaptchaActivated();
  }

  async cargarEspecialistas(): Promise<void> {
    try {
      // Cargar los datos de los especialistas desde Firebase
      const especialistas = await this.firebaseSvc.getAllSpecialists();
  
      // Transformar las especialidades de cada especialista
      this.especialistas = especialistas.map((especialista: any) => {
        // Asegurarse de que 'specialties' sea un array, y convertirlo a un string separado por comas
        if (Array.isArray(especialista.specialties)) {
          especialista.specialties = especialista.specialties.join(', ');
        }
        return especialista;
      })
    } catch (error) {
      console.error('Error al cargar los especialistas:', error);
    }
  }

  eliminarDatosInnecesarios(datos: any[]): any[] {
    return datos.map(item => {
      // Desestructuramos los datos que queremos eliminar
      const { uid, profilePic, profilePic2, horarios, specialtyDurations, age, name, lastName, activated, socialWork, specialities, ...sinDatosInnecesarios } = item;
  
      if (age !== undefined) {
        sinDatosInnecesarios.Edad = age;
      }

      if (activated !== undefined) {
        if(activated){
          sinDatosInnecesarios.Habilitado = 'Sí' ;
        }else{
          sinDatosInnecesarios.Habilitado = 'No' ;
        }
      }

      if (name !== undefined) {
        sinDatosInnecesarios.Nombre = name;
      }


      if (lastName !== undefined) {
        sinDatosInnecesarios.Apellido = lastName;
      }

      if (socialWork !== undefined) {
        sinDatosInnecesarios.Obra_Social = lastName;
      }

        // Convertimos el array 'specialities' en un string y lo guardamos como 'especialidades'
      if (specialities && Array.isArray(specialities)) {
        sinDatosInnecesarios.Especialidades = specialities.join(', ');
      }

    
        return sinDatosInnecesarios;
      });
  }

   // Función para exportar todos los datos a un solo archivo Excel
   exportarTodosADownloadExcel(): void {
    // Filtrar los datos de pacientes, especialistas y administradores
    const pacientesSinDatosInnecesarios = this.eliminarDatosInnecesarios(this.pacientes);
    const especialistasSinDatosInnecesarios = this.eliminarDatosInnecesarios(this.especialistas);
    const administradoresSinDatosInnecesarios = this.eliminarDatosInnecesarios(this.administradores);

    // Crear hojas de trabajo para cada tipo de datos
    const wsPacientes: XLSX.WorkSheet = XLSX.utils.json_to_sheet(pacientesSinDatosInnecesarios);
    const wsEspecialistas: XLSX.WorkSheet = XLSX.utils.json_to_sheet(especialistasSinDatosInnecesarios);
    const wsAdministradores: XLSX.WorkSheet = XLSX.utils.json_to_sheet(administradoresSinDatosInnecesarios);

    // Crear un libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Agregar las hojas de trabajo al libro
    XLSX.utils.book_append_sheet(wb, wsPacientes, 'Pacientes');
    XLSX.utils.book_append_sheet(wb, wsEspecialistas, 'Especialistas');
    XLSX.utils.book_append_sheet(wb, wsAdministradores, 'Administradores');

    // Descargar el archivo Excel
    XLSX.writeFile(wb, 'Datos_Completos.xlsx');
  }


  onPatientUploaded(success: boolean) {
    if (success) {
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

  async toggleCaptcha(): Promise<void> {
    try {
      await this.firebaseSvc.toggleCaptchaStatus();
    } catch (error) {
      console.error('Error al cambiar el estado del captcha:', error);
    }

    this.captchaStatus = await this.firebaseSvc.isCaptchaActivated();
  }
  
}
