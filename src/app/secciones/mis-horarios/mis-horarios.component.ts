import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CaptchaDirective } from '../../directivas/captcha.directive';

interface Horario {
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-mis-horarios',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule, CommonModule, CaptchaDirective],
  templateUrl: './mis-horarios.component.html',
  styleUrl: './mis-horarios.component.scss'
})

export class MisHorariosComponent {

  horarios: any[] = [];  // Para almacenar los horarios recuperados

  uid: string = '';  // Variable para almacenar el UID

  title = 'MyClinic';
  
  headerLinks: Array<{ label: string; route: string }> = [];

  newHorario: any = {};  // Inicialización de newHorario

  addedHorarios: any = {};  // Almacena los horarios añadidos

  availableDays: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  especialidadesConDuracion: any[] = [];

  captchaRequired: boolean = false;

  availableTimeSlots: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];
  
  getAvailableTimeSlots(day: string): string[] {
    if (day === 'sabado') {
      return ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
    }
    return this.availableTimeSlots;
  }

  isLoggedIn:boolean = false;
  firebaseSvc = inject(FirebaseService);

  constructor() {
    this.availableDays.forEach(day => {
      this.newHorario[day] = { startTime: '', endTime: '' }; // Inicializar startTime y endTime
    });
  }

  async ngOnInit(): Promise<void> {
    this.getUidFromLocalStorage();  // Llamar para obtener el UID
    this.loadHorarios();  // Llamar la función para cargar los horarios
    this.obtenerEspecialidades();
    this.availableDays.forEach(day => {
      this.newHorario[day] = { startTime: '', endTime: '' };
      this.addedHorarios[day] = [];
    });
    
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



  getMonthName(date: Date): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[date.getMonth()];  // Obtenemos el mes correspondiente para la fecha dada
  }

  getUidFromLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');  // Obtener el usuario desde localStorage
    if (user && user.uid) {
      this.uid = user.uid;  // Asignar el UID si existe
    } else {
      console.error('UID no encontrado en localStorage');
    }
  }

  
  async loadHorarios(): Promise<void> {
    if (this.uid) {
      // Mostrar el Swal de carga
      const swalLoading = Swal.fire({
        title: 'Cargando horarios...',
        text: 'Por favor espera mientras se cargan los horarios.',
        icon: 'info',
        showConfirmButton: false, // No se muestra el botón de confirmación
        didOpen: () => {
          Swal.showLoading();  // Mostrar el spinner de carga
        }
      });
  
      try {
        const horariosGuardados = await this.firebaseSvc.getEspecialistaHorarios(this.uid);
  
        // Verificar si la estructura es un objeto de días con un array de horarios
        if (typeof horariosGuardados === 'object') {
          this.availableDays.forEach(day => {
            const horariosDelDia = horariosGuardados[day]; // Obtener los horarios para cada día
  
            // Solo continuar si existen horarios para el día
            if (Array.isArray(horariosDelDia) && horariosDelDia.length > 0) {
              // Si hay horarios para el día, los cargamos todos en un array
              this.newHorario[day] = horariosDelDia.map(horario => ({
                startTime: horario.startTime || '',
                endTime: horario.endTime || ''
              }));

  
              // Llamamos a la función addHorarioForDay para agregar los horarios al array correspondiente
              this.addHorarioForDay(day);
            }
          });
        } else {
          console.error('Estructura de horarios inesperada');
        }
  
      } catch (error) {
        console.error('Error al cargar los horarios', error);
        // Si hay un error, mostrar un mensaje de error con Swal
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al cargar los horarios.',
          icon: 'error'
        });
      } finally {
        // Cerrar el loading al terminar la carga o si hay un error
        Swal.close();
      }
  
    } else {
      console.error('No se puede cargar los horarios porque no hay UID');
    }
  }
  

  removeHorario(day: string, index: number): void {
    this.addedHorarios[day].splice(index, 1);
  }

  async submitHorarios(): Promise<void> { 
    try {
  
      // Guardar los horarios en Firebase
      await this.firebaseSvc.saveEspecialistaHorario(this.uid, this.addedHorarios);
  
      // Limpiar las listas de horarios
      this.addedHorarios = {}; // Limpia la lista de horarios añadidos
      this.horarios = [];       // Limpia la lista de horarios recuperados
    } catch (error) {
      console.error('Error al guardar los horarios:', error);
    }
  
    // Recargar los horarios después de haberlos guardado
    await this.loadHorarios();
  }
  


  addHorarioForDay(day: string): void {
    // Comprobamos si hay horarios válidos para el día
    if (Array.isArray(this.newHorario[day]) && this.newHorario[day].length > 0) {
      // Si el día ya tiene horarios, los añadimos a addedHorarios
      if (!this.addedHorarios[day]) {
        this.addedHorarios[day] = []; // Inicializa el array si no existe
      }
      // Iterar sobre el array de horarios y añadir cada uno
      this.newHorario[day].forEach((horario: Horario) => { // Definir explícitamente el tipo de 'horario'
        if (horario.startTime && horario.endTime) {
          this.addedHorarios[day].push({
            startTime: horario.startTime,
            endTime: horario.endTime
          });
        }
      });
    }
  }
  

  addHorarioForDay2(day: string): void {
    if (this.newHorario[day] && this.newHorario[day].startTime && this.newHorario[day].endTime) {

      // Validación: El startTime debe ser menor que el endTime
      if (this.isStartTimeGreaterThanEndTime(this.newHorario[day].startTime, this.newHorario[day].endTime)) {
        // Mostrar el error si startTime es mayor que endTime
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'La hora de inicio debe ser menor que la hora de fin.',
        });
        return; // Detenemos la ejecución si el horario es inválido
      }

      if (!this.addedHorarios[day]) {
        this.addedHorarios[day] = [];
      }

      // Verificamos si el horario que estamos agregando se puede combinar con el último horario
      const isOverlapping = this.addedHorarios[day].some((horario: Horario) =>
        (this.newHorario[day].startTime < horario.endTime && this.newHorario[day].endTime > horario.startTime)
      );

      if (isOverlapping) {
        // Mostrar un SweetAlert si hay solapamiento
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'El horario se solapa con otro horario existente.',
        });
        return; // No agregamos el horario si se solapa
      }

      const lastHorario = this.addedHorarios[day].slice(-1)[0]; // Último horario agregado

      if (lastHorario && lastHorario.endTime === this.newHorario[day].startTime) {
        lastHorario.endTime = this.newHorario[day].endTime;
      } else {
        this.addedHorarios[day].push({
          startTime: this.newHorario[day].startTime,
          endTime: this.newHorario[day].endTime
        });
      }

      this.newHorario[day] = { startTime: '', endTime: '' };
    }
  }

  // Función auxiliar para comparar las horas
  isStartTimeGreaterThanEndTime(startTime: string, endTime: string): boolean {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);
    return start >= end;
  }

  // Función para convertir el tiempo (HH:MM) a minutos
  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  

  async obtenerEspecialidades(){
    this.especialidadesConDuracion = await this.firebaseSvc.getEspecialidadesConDuracion(this.uid);
  }


  async onDuracionChange(especialidad: any): Promise<void> {
    // Muestra el loading de Swal.fire
    const swal = Swal.fire({
      title: 'Cargando...',
      text: 'Actualizando la duración...',
      icon: 'info',
      showConfirmButton: false, // Sin botón de confirmación
      willOpen: () => {
        Swal.showLoading(); // Muestra el icono de carga
      }
    });
  
    try {
      // Esperar a que se actualice la duración de la especialidad
      await this.firebaseSvc.actualizarDuracionEspecialidad(this.uid, especialidad);
  
      // Esperar a que se obtengan las especialidades
      await this.obtenerEspecialidades();
  
      // Una vez que las operaciones se completan, cerrar el Swal
      Swal.close();
  
    } catch (error) {
      console.error('Error al cambiar la duración de la especialidad:', error);
      // En caso de error, cerrar el loading y mostrar un mensaje de error
      Swal.update({
        title: 'Error',
        text: 'Hubo un problema al cambiar la duración de la especialidad.',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  }

  //onCaptcha(horario: any): () => Promise<void> {
    //return () => this.seleccionarHorario(horario);
  //}

  onCaptchaSubmitHorario(): () => Promise<void>{
    return () => this.submitHorarios();
  }
  
  onCaptchaonDuracionChange(especialidad: any): () => Promise<void>{
    return () => this.onDuracionChange(especialidad);
  }
}
