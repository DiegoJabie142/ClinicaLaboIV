import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.scss'
})
export class SolicitarTurnoComponent {

  title = 'MyClinic';
  headerLinks: Array<{ label: string; route: string }> = [];

  especialistas: any[] = [];

  pacientes: any[] = [];

  selectedEspecialista: any = null;

  selectedPaciente: any = null;

  especialidades: any[] = [];

  selectedEspecialidad: any = null;
  
  
  horariosDisponibles: any[] = [];

  horariosPorDia: { [key: string]: any[] } = {}; // Almacena horarios agrupados por día
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
    this.isLoggedIn = await this.estaLoggeado();
    this.getEspecialistas();
    this.role = this.getRoleFromLocalStorage(); // Llamar para obtener el ROL
    if(this.role == 'administrador'){
      this.getPacientes();
    }
  }

  async signOut(): Promise<void> {
    console.log('Intentando cerrar sesión...');
    try {
      await this.firebaseSvc.signOut();
      console.log('Sesión cerrada exitosamente');
      this.isLoggedIn = false;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async estaLoggeado(): Promise<boolean> {
    return  await this.firebaseSvc.isUserLoggedIn(); // Usando Firebase como ejemplo.
  }



  // Obtener especialistas de Firebase
  async getEspecialistas() {
    this.especialistas = await this.firebaseSvc.getEspecialistas();
  }

  // Obtener especialistas de Firebase
  async getPacientes() {
    this.pacientes = await this.firebaseSvc.getPacientes();
  }

  get diasDisponibles(): string[] {
    return Object.keys(this.horariosPorDia);
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

  async selectEspecialidad(especialidad: string): Promise<void> {

    if (this.selectedEspecialista) {
      try {
        this.horariosDisponibles = await this.firebaseSvc.getHorariosDisponibles(
          this.selectedEspecialista.uid,
        );

        // Agrupar horarios por día
        this.horariosPorDia = this.horariosDisponibles.reduce((acc: any, horario: any) => {
          const fecha = horario.date; // Suponiendo que 'date' está en formato 'DD-MM-YYYY'
          if (!acc[fecha]) {
            acc[fecha] = [];
          }
          acc[fecha].push(horario);
          return acc;
        }, {});

        this.selectedDia = null; // Reiniciar el día seleccionado
      } catch (error) {
        console.error('Error al cargar los horarios disponibles:', error);
      }
    }

    this.selectedEspecialidad = especialidad;
  }

  selectDia(dia: string): void {
    this.selectedDia = dia;
  }

  async seleccionarHorario(horario: any): Promise<void> {
    try {
      // Obtener el objeto del usuario desde localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = this.role === 'administrador' ? this.selectedPaciente?.uid : user?.uid;
  
      if (!userId) {
        console.error('UID del usuario no encontrado o no válido.');
        this.utilSvc.showError('No se pudo obtener tu información. Intenta nuevamente.');
        return;
      }
  
      // Llamar a la función reservarHorario con el UID del usuario o del paciente seleccionado
      await this.firebaseSvc.reservarHorario(
        this.selectedEspecialista.uid,
        horario,
        userId,
        this.selectedEspecialidad.nombre
      );
  
      // Filtrar el horario reservado de horariosPorDia[this.selectedDia] si selectedDia no es null
      if (this.selectedDia && this.horariosPorDia[this.selectedDia]) {
        this.horariosPorDia[this.selectedDia] = this.horariosPorDia[this.selectedDia].filter(
          h => h !== horario
        );
      }
  
      this.utilSvc.showSuccess('Turno reservado exitosamente. Debe esperar que el especialista acepte su cita.');
    } catch (error) {
      console.error('Error al reservar el horario:', error);
      this.utilSvc.showError('No se pudo reservar el turno. Intenta nuevamente.');
    }

    this.selectedEspecialidad = null;
  }
  
  
  
} 
