import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { CaptchaDirective } from '../../directivas/captcha.directive';



@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor, CaptchaDirective],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.scss'
})
export class SolicitarTurnoComponent {
  
  title = 'MyClinic';

  headerLinks: Array<{ label: string; route: string }> = [];

  horariosFiltrados: any[] = [];

  especialistas: any[] = [];

  horariosDiponibles: any[] = [];

  pacientes: any[] = [];

  diasDisponibles: any[] = [];

  selectedEspecialista: any = null;

  selectedPaciente: any = null;

  especialidades: any[] = [];

  selectedEspecialidad: any = null;
  
  horariosDisponibles: any[] = [];

  horariosPorDia: any[] = [];

  selectedDia: string | null = null; // Día seleccionado

  firebaseSvc = inject(FirebaseService);

  utilSvc = inject(UtilsService);

  isLoggedIn:boolean = false;
  


// Función para obtener la hora formateada en 12 horas
getFormattedTime(hour: string): string {
  const hours = parseInt(hour.split(':')[0], 10); // Obtener la parte de la hora
  const minutes = hour.split(':')[1]; // Obtener los minutos

  let formattedHour = hours;
  if (hours > 12) {
    formattedHour = hours - 12; // Restar 12 si la hora es mayor a 12
  } else if (hours === 0) {
    formattedHour = 12; // Si la hora es 0, la cambiamos a 12 (para mostrar "12:xx PM")
  }

  return `${formattedHour}:${minutes}`; // Devuelve la hora formateada
}

// Función para obtener AM/PM
getAmPm(hour: string): string {
  const hours = parseInt(hour.split(':')[0], 10); // Obtener la parte de la hora
  return hours < 12 || hours === 0 ? 'AM' : 'PM'; // Si es menor a 12 o es 0, es AM; si es mayor, es PM
}

  role: string | null = '';  // Variable para almacenar el UID

  async ngOnInit(): Promise<void> {
    this.getEspecialistas();
    this.role = this.getRoleFromLocalStorage(); // Llamar para obtener el ROL
    if(this.role == 'administrador'){
      this.getPacientes();
    }
  }

  // Obtener especialistas de Firebase
  async getEspecialistas() {
    this.especialistas = await this.firebaseSvc.getEspecialistas();
  }

  // Obtener especialistas de Firebase
  async getPacientes() {
    this.pacientes = await this.firebaseSvc.getPacientes();
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

  getEspecialidadImage(especialidad: any): string {
    return especialidad?.image || 'path/to/default-image.jpg';
  }

  // Seleccionar un especialista y cargar sus especialidades
  async selectEspecialista(especialista: any) {
    try {
      // Asignar el especialista seleccionado
      this.selectedEspecialista = especialista;

      // Obtener la lista completa de especialidades desde Firebase
      const allSpecialties = await this.firebaseSvc.getSpecialties();

      // Filtrar las especialidades del especialista que coinciden con las especialidades disponibles
      this.especialidades = allSpecialties.filter((specialty: any) =>
        especialista.specialities.includes(specialty.nombre)
      );
    } catch (error) {
      console.error('Error al seleccionar el especialista:', error);
    }

    this.selectedEspecialidad = null;
  }

    // Seleccionar un especialista y cargar sus especialidades
    async selectPaciente(paciente: any) {
      try {
        // Asignar el especialista seleccionado
        this.selectedPaciente = paciente;
      } catch (error) {
        console.error('Error al seleccionar el especialista:', error);
      }
      this.selectedEspecialista=null;
    }

 
    async selectEspecialidad(especialidad: any): Promise<void> {
      if (this.selectedEspecialista) {
        try {
          // Obtener los horarios disponibles del especialista
          this.diasDisponibles = await this.firebaseSvc.getDiasDisponiblesEspecialista(this.selectedEspecialista.uid);
      
        } catch (error) {
          console.error('Error al cargar los horarios disponibles:', error);
        }
      }
    
      this.selectedEspecialidad = especialidad.nombre;

      this.selectedDia = null;
    }
    

    async selectDia(dia: string) {
      try {
        this.selectedDia = dia;
    
        // Mostrar loading
        Swal.fire({
          title: 'Cargando horarios',
          text: 'Por favor, espera...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        
        const especialidadConDuracion = await this.firebaseSvc.getDuracionEspecialidad(this.selectedEspecialista.uid, this.selectedEspecialidad);

        this.horariosDiponibles = await this.firebaseSvc.getHorariosDisponibles(this.selectedEspecialista.uid, dia, especialidadConDuracion);
    
        // Cerrar el loading cuando termine
        Swal.close();
  
      } catch (error) {
        console.error('Error al seleccionar el día:', error);
    
        // Cerrar el loading en caso de error
        Swal.close();
    
        // Mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al cargar los horarios. Intenta de nuevo.',
        });
      }
    }
    
    async seleccionarHorario(horario: any): Promise<void> {
      try {
        // Mostrar loading
        Swal.fire({
          title: 'Reservando horario',
          text: 'Por favor, espera...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
    
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = this.role === 'administrador' ? this.selectedPaciente?.uid : user?.uid;
    
        if (this.selectedDia) {
          await this.firebaseSvc.reservarHorarioTurno(
            this.selectedEspecialista.uid,
            this.selectedDia,
            horario,
            userId,
            this.selectedEspecialidad
          );
    
          // Cerrar el loading y mostrar mensaje de éxito
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Turno reservado',
            text: 'El turno ha sido reservado exitosamente.'
          });
        }
    
        this.selectedEspecialidad = null;
      } catch (error) {
        console.error('Error al reservar el horario:', error);
    
        // Cerrar el loading y mostrar mensaje de error
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al reservar el turno. Intenta de nuevo.'
        });
      }

      this.horariosDiponibles = [];
      this.selectedEspecialidad = null;
      this.selectedDia = null;
    }

    onCaptchaHorario(horario: any): () => Promise<void> {
      return () => this.seleccionarHorario(horario);
    }
} 
