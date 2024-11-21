import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-mis-horarios',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule, HeaderComponent, CommonModule],
  templateUrl: './mis-horarios.component.html',
  styleUrl: './mis-horarios.component.scss'
})
export class MisHorariosComponent {

  horarios: any[] = [];  // Para almacenar los horarios recuperados
  uid: string = '';  // Variable para almacenar el UID

  title = 'MyClinic';
  headerLinks: Array<{ label: string; route: string }> = [];

  currentDate: Date = new Date();
  availableDays: { [key: string]: number[] } = {};  // Guardaremos los días agrupados por mes
  availableDates: Date[] = [];  // Guardamos las fechas completas
  selectedDays: { [key: number]: boolean } = {};  // Para manejar los días seleccionados
  // Ajustar el modelo para almacenar horarios de inicio y fin por día
  availableTimes: { [day: string]: { start: string; end: string } } = {
    1: { start: '00:00', end: '23:59' },
    2: { start: '00:00', end: '23:59' },
    3: { start: '00:00', end: '23:59' },
    4: { start: '00:00', end: '23:59' },
    5: { start: '00:00', end: '23:59' },
    6: { start: '00:00', end: '23:59' },
    7: { start: '00:00', end: '23:59' },
    8: { start: '00:00', end: '23:59' },
    9: { start: '00:00', end: '23:59' },
    10: { start: '00:00', end: '23:59' },
    11: { start: '00:00', end: '23:59' },
    12: { start: '00:00', end: '23:59' },
    13: { start: '00:00', end: '23:59' },
    14: { start: '00:00', end: '23:59' },
    15: { start: '00:00', end: '23:59' },
    16: { start: '00:00', end: '23:59' },
    17: { start: '00:00', end: '23:59' },
    18: { start: '00:00', end: '23:59' },
    19: { start: '00:00', end: '23:59' },
    20: { start: '00:00', end: '23:59' },
    21: { start: '00:00', end: '23:59' },
    22: { start: '00:00', end: '23:59' },
    23: { start: '00:00', end: '23:59' },
    24: { start: '00:00', end: '23:59' },
    25: { start: '00:00', end: '23:59' },
    26: { start: '00:00', end: '23:59' },
    27: { start: '00:00', end: '23:59' },
    28: { start: '00:00', end: '23:59' },
    29: { start: '00:00', end: '23:59' },
    30: { start: '00:00', end: '23:59' },
    31: { start: '00:00', end: '23:59' },
  };
  availableTimeSlots: string[] = [
    '00:00','01:00', '02:00', '03:00', '04:00', '05:00', '06:00', 
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 
    '21:00', '22:00', '23:00','24:00',
  ];

  isLoggedIn:boolean = false;
  firebaseSvc = inject(FirebaseService);

  constructor() {}

  async ngOnInit(): Promise<void> {
    // Generar las fechas de los próximos 15 días
    this.generateAvailableDays();
    this.updateHeaderLinks();
    this.isLoggedIn= await this.estaLoggeado();
    this.getUidFromLocalStorage();  // Llamar para obtener el UID
    this.loadHorarios();  // Llamar la función para cargar los horarios
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
    this.updateHeaderLinks();
  }

  async estaLoggeado(): Promise<boolean> {
    return  await this.firebaseSvc.isUserLoggedIn();
  }


  updateHeaderLinks() {
    // Leer el rol desde localStorage
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;

    // Configurar los links según el rol
    if(role === 'administrador') {
      this.headerLinks = [
        { label: 'Home', route: '/home' },
        { label: 'Sección Usuarios', route: '/users' },
        { label: 'Turnos', route: '/mis-turnos' },
      ];
    } else if (role === 'especialista') {
      this.headerLinks = [
        { label: 'Home', route: '/home' },
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Mis Horarios', route: '/mis-horarios' },
        { label: 'Mis Turnos', route: '/mis-turnos' },
      ];
    } else if (role === 'paciente') {
      this.headerLinks = [
        { label: 'Home', route: '/home' },
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Solicitar turno', route: '/solicitar-turno' },
        { label: 'Mis Turnos', route: '/mis-turnos' },
      ];
    } else {
      this.headerLinks = [
        { label: 'Home', route: '/home' },
        { label: 'Iniciar Sesión', route: '/login' },
        { label: 'Registrarse', route: '/sign-up/select' }
      ];
    }
  }

  getFirstHalfMonths(): string[] {
    const months = Object.keys(this.availableDays);
    return months.slice(0, Math.ceil(months.length / 2));
  }
  
  getSecondHalfMonths(): string[] {
    const months = Object.keys(this.availableDays);
    return months.slice(Math.ceil(months.length / 2));
  }

  // Método para generar los días y fechas
  generateAvailableDays() {

    this.availableDays = {};  // Limpiar el objeto de días agrupados por mes
    this.availableDates = [];  // Limpiar las fechas guardadas

    // Generar días desde hoy hasta 15 días después
    for (let i = 0; i < 15; i++) {
      const newDate = new Date(this.currentDate);  // Crear una nueva instancia de la fecha base
      newDate.setDate(this.currentDate.getDate() + i);  // Sumar el día correspondiente
      const monthName = this.getMonthName(newDate);  // Obtener el nombre del mes

      // Si no existe una entrada para este mes, inicializar un array vacío
      if (!this.availableDays[monthName]) {
        this.availableDays[monthName] = [];
      }

      // Agregar el día al mes correspondiente
      this.availableDays[monthName].push(newDate.getDate());
      this.availableDates.push(newDate); // Guardamos la fecha completa
    }
  }
  

  // Método para obtener el nombre del mes para una fecha específica
  getMonthName(date: Date): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[date.getMonth()];  // Obtenemos el mes correspondiente para la fecha dada
  }

  async submitHorarios(horariosForm: any) {
    const horarios: { date: string; timeRange: { start: string; end: string } }[] = [];

    this.availableDates.forEach((date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (this.selectedDays[day]) {
        const timeRange = this.availableTimes[day];

        // Validación para asegurar que hay un inicio y fin seleccionados
        if (timeRange.start && timeRange.end && timeRange.start !== timeRange.end) {
          horarios.push({
            date: `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            timeRange: { start: timeRange.start, end: timeRange.end },
          });
        } else {
          console.log(`Horarios no válidos para el día ${day}`);
        }
      }
    });

    if (horarios.length === 0) {
      console.log('No se han seleccionado horarios');
      return;
    }

    try {
      await this.firebaseSvc.saveEspecialistaHorarios(this.uid, horarios);
      console.log('Horarios guardados con éxito');
    } catch (error) {
      console.error('Error al guardar los horarios', error);
    }finally{
      horariosForm.reset();
      this.loadHorarios();
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

  // Método para filtrar los horarios de fin disponibles, tomando el horario de inicio seleccionado
  getFilteredEndTimes(day: number): string[] {
    const startTime = this.availableTimes[day]?.start;
    if (startTime) {
      const startIndex = this.availableTimeSlots.indexOf(startTime);
      return this.availableTimeSlots.slice(startIndex + 1);  // Retorna las horas después del inicio
    }
    return this.availableTimeSlots;  // Si no hay hora de inicio, todas las opciones son válidas
  }

  // Función para validar si la hora de fin es mayor a la de inicio
  isEndTimeInvalid(day: number): boolean {
    const startTime = this.availableTimes[day]?.start;
    const endTime = this.availableTimes[day]?.end;

    if (startTime && endTime) {
      const startIndex = this.availableTimeSlots.indexOf(startTime);
      const endIndex = this.availableTimeSlots.indexOf(endTime);
      return endIndex <= startIndex;  // Si el índice de la hora de fin es menor o igual al de inicio
    }
    return false;  // No hay validación si no se han seleccionado ambos horarios
  }


  // Cargar los horarios del especialista utilizando el servicio
  async loadHorarios(): Promise<void> {
    if (this.uid) {
      try {
        this.horarios = await this.firebaseSvc.getEspecialistaHorarios(this.uid);
      } catch (error) {
        console.error('Error al cargar los horarios', error);
      }
    } else {
      console.error('No se puede cargar los horarios porque no hay UID');
    }
  }
  
}
