import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FirebaseService } from '../../../services/firebase.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [HeaderComponent, NgFor,NgIf, CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})
export class PacientesComponent {
  

  uid: string = ''; 

  pacientesIds: any[] = [];

  pacientesDatos: any[] = [];

  firebaseSvc = inject(FirebaseService);

  historiaClinica: any[] = [];

  async ngOnInit(): Promise<void> {
    this.getUidFromLocalStorage();  // Llamar para obtener el UID

    this.pacientesIds = await this.firebaseSvc.obtenerPacientesUnicos(this.uid);

    await this.cargarPacientesDatos();

    this.historiaClinica = await this.cargarHistoriasClinicas(this.pacientesIds);
  }

  async cargarPacientesDatos(): Promise<void> {
    for (const pacienteId of this.pacientesIds) {
      const datosPaciente = await this.firebaseSvc.getPatientData(pacienteId);
      this.pacientesDatos.push(datosPaciente);
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


  async cargarHistoriasClinicas(pacientesUid: string[]): Promise<any> {
    // Mostrar el Swal de carga
    Swal.fire({
      title: 'Cargando historias clínicas...',
      text: 'Por favor, espera mientras se cargan las historias clínicas.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();  // Muestra el ícono de carga
      }
    });
  
    let todasLasHistoriasClinicas: { [uid: string]: any[] } = {};
  
    // Iteramos sobre todos los pacientes
    for (const uid of pacientesUid) {
      let historia = await this.firebaseSvc.getHistoriaClinicaConEspecialista(uid, this.uid);
  
      if (historia && historia.length > 0) {
        // Parseamos la fecha y la hora de inicio para poder ordenarlas
        historia = historia.map((item) => {
          const [day, month, year] = item.fecha.split('-');
          const [hour, minute] = item.horaInicio.split(':');
          const fechaObj = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  
          return {
            ...item,
            fechaObj,
          };
        });
  
        // Ordenamos las historias clínicas de más reciente a más antigua
        historia.sort((a, b) => b.fechaObj.getTime() - a.fechaObj.getTime());
  
        // Seleccionamos solo las tres más recientes
        historia = historia.slice(0, 3);
  
        // Elimina fechaObj
        historia = historia.map(({ fechaObj, ...resto }) => resto);
  
        // Guardamos las historias clínicas en el objeto con el uid del paciente como clave
        todasLasHistoriasClinicas[uid] = historia;
      } else {
        // Si no hay historias clínicas para este paciente, podemos asignar un array vacío
        todasLasHistoriasClinicas[uid] = [];
      }
    }
  
    // Cerrar el Swal una vez que se haya cargado todo
    Swal.close();
  
    return todasLasHistoriasClinicas;
  }

  // Función auxiliar para capitalizar el primer carácter de una palabra
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  verHistoriaClinica(historia: any) {
    if (!historia || Object.keys(historia).length === 0) {
      // Mostrar mensaje de que no hay historia clínica
      Swal.fire({
        icon: 'info',
        title: 'Historia Clínica',
        text: 'No hay historia clínica disponible para este paciente.',
        confirmButtonColor: '#0078D4'
      });
      return;
    }
  
    // Construir el HTML para mostrar la historia clínica de forma dinámica
    let historiaHtml = '<ul style="text-align: left;">';
    
    // Recorrer dinámicamente las claves del objeto
    for (const key in historia) {
      if (historia.hasOwnProperty(key)) {
        historiaHtml += `<li style="margin-bottom: 15px;">
          <strong>${this.capitalize(key)}:</strong> ${historia[key]}<br>
        </li>`;
      }
    }
    historiaHtml += '</ul>';
  
    // Mostrar el modal con la historia clínica
    Swal.fire({
      title: 'Historia Clínica',
      html: historiaHtml,
      width: '600px',
      confirmButtonColor: '#0078D4'
    });
  }
}
