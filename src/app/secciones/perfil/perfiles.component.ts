import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { AddSuffixPipe } from '../../pipes/addSufixPipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss'
})
export class PerfilesComponent {
  title = 'MyClinic';
  headerLinks: Array<{ label: string; route: string }> = [];
  uid: string = '';

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  isLoggedIn:boolean = false;

  historiaClinica: any;
  atencionIds: string[] = [];  // Aquí guardamos los IDs de las atenciones

  buttons: string[] = [];

  userData: any;

  role: string | null = '';  // Variable para almacenar el UID

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.estaLoggeado();
    this.loadUserData();
    this.role =  this.getRoleFromLocalStorage();
    this.getUidFromLocalStorage();
    if (this.role == 'paciente') {
      this.firebaseSvc.getHistoriaClinica(this.uid)
        .then(historia => {
          this.historiaClinica = historia; // Guarda la historia clínica en la variable
          this.buttons = this.generateButtons(this.historiaClinica);
          this.atencionIds = Object.keys(this.historiaClinica);
        })
        .catch(error => {
          console.error('Error al obtener la historia clínica:', error.message);
          // Aquí puedes manejar el error si es necesario
        });
    }
  }

  generateButtons(historiaClinica: any): string[] {
    const buttons: string[] = [];
  
    // Iteramos sobre cada atencionId (que son las claves del objeto historiaClinica)
    for (const atencionId in historiaClinica) {
      if (historiaClinica.hasOwnProperty(atencionId)) {
        const atencionData = historiaClinica[atencionId];
        
        // Extraemos los componentes de la fecha y los horarios
        const [day, month, year, startHour, endHour] = atencionId.split('_');
        
        // Formateamos la fecha y los horarios
        const formattedDate = `${day}/${month}/${year}`;
        const formattedStart = `${startHour}:00`;
        const formattedEnd = `${endHour}:00`;
        
        // Creamos el texto del botón con el formato deseado
        const buttonText = `${formattedDate} Inicio ${formattedStart} Fin ${formattedEnd}`;
        
        // Añadimos el texto del botón al array
        buttons.push(buttonText);
      }
    }
  
    return buttons;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  capitalizeFirstLetter(str: string): string {
    if (!str) return str;  // Si el string está vacío, lo retornamos tal cual
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();  // Pone la primera letra en mayúscula y el resto en minúscula
  }

  getRoleFromLocalStorage(): string | null {
    try {
      // Recuperar el objeto del usuario desde localStorage
      const user = localStorage.getItem('user');
      
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.role || null;
      }
  
      return null; // Si no existe el usuario en localStorage
    } catch (error) {
      console.error('Error al obtener el rol del usuario desde localStorage:', error);
      return null;
    }
  }

  getUidFromLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');  // Obtener el usuario desde localStorage
    if (user && user.uid) {
      this.uid = user.uid;  // Asignar el UID si existe
    } else {
      console.error('UID no encontrado en localStorage');
    }
  }


  async estaLoggeado(): Promise<boolean> {
    return  await this.firebaseSvc.isUserLoggedIn(); // Usando Firebase como ejemplo.
  }


  async loadUserData(){
    try {
      this.userData = await this.firebaseSvc.getUserData();
      console.log(this.userData);
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }

  async mostrarDetallesAtencion(atencionId: string): Promise<void> {
    // Buscar la atención correspondiente en los datos de historia clínica
    const atencion = this.historiaClinica[atencionId];
  
    if (atencion) {
      // Obtener el UID del especialista
      const especialistaId = atencion.horarioData.especialistaId;
  
      // Mostrar un indicador de carga mientras se obtiene el nombre del especialista
      Swal.fire({
        title: 'Cargando detalles...',
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      try {
        // Obtener el nombre del especialista
        const nombreEspecialista = await this.getEspecialistaNombre(especialistaId);
  
        // Construir los detalles de la atención
        let detallesAtencion = `
          <strong>Reseña:</strong> ${atencion.horarioData.reseña} <br><br>
          <strong>Especialidad:</strong> ${atencion.horarioData.especialidad} <br><br>
          <strong>Especialista:</strong> ${nombreEspecialista} <br><br>
          <strong>Datos de la Historia Clínica:</strong> <br>
        `;
  
        // Recorremos los datos de la historia clínica para mostrarlos en un formato más legible
        const historiaClinicaData = atencion.historiaClinicaData;
        for (const key in historiaClinicaData) {
          if (historiaClinicaData.hasOwnProperty(key)) {
            detallesAtencion += `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${historiaClinicaData[key]} <br>`;
          }
        }
  
        // Actualizar el swal.fire con los detalles
        Swal.fire({
          title: 'Detalles de la Atención',
          html: detallesAtencion,
          icon: 'info',
          confirmButtonText: 'Cerrar',
        });
      } catch (error) {
        console.error('Error al obtener el nombre del especialista:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar el nombre del especialista.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se encontraron los detalles de esta atención.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  }
  
  
  getEspecialistaNombre(uid: string): Promise<string | null> {
    return this.firebaseSvc.getEspecialistaNombre(uid);
  }

}
