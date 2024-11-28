import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { CaptchaDirective } from '../../../directivas/captcha.directive';
import { ResaltarEstadoTurnoPipe } from '../../../pipes/resaltar-estado-turno.pipe';
import { OrdenarTurnosPipe } from '../../../pipes/ordenar-turnos.pipe';
import { HighlightUpcomingDirective } from '../../../directivas/highlight-upcoming.directive';

interface HistoriaClinica {
  [key: string]: any;  // Permite claves dinámicas de tipo string
}

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [FormsModule, HeaderComponent, CommonModule, CapitalizePipe, CaptchaDirective, ResaltarEstadoTurnoPipe, OrdenarTurnosPipe, HighlightUpcomingDirective],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.scss'
})
export class MisTurnosComponent {

  filterText: string = '';

  horarios: any[] = []; 

  turnosFiltrados: any[] = [];

  uid: string = '';  

  role: string | null = ''; 

  title = 'MyClinic';

  headerLinks: Array<{ label: string; route: string }> = [];

  horariosConPaciente: any[] = [];

  mostrarConfirmacion: boolean = false;

  isLoggedIn:boolean = false;

  firebaseSvc = inject(FirebaseService);

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.role = this.getRoleFromLocalStorage(); // Llamar para obtener el ROL
    this.isLoggedIn = await this.estaLoggeado();
    this.getUidFromLocalStorage();  // Llamar para obtener el UID
    await this.loadHorarios();  // Llamar la función para cargar los horarios
    this.turnosFiltrados = [...this.horarios]; // Copia inicial para mostrar todos los turnos
  }

  async estaLoggeado(): Promise<boolean> {
    return  await this.firebaseSvc.isUserLoggedIn();
  }

  
  aplicarFiltro(): void {
    const filter = this.filterText?.toLowerCase() || ''; // Convertir el texto del filtro a minúsculas
  
    this.turnosFiltrados = this.horarios.filter((turno) => {
      return this.objectContainsText(turno, filter);
    });
  }

  private objectContainsText(obj: any, text: string): boolean {
    // Recorre todas las propiedades del objeto
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
  
        // Si el valor es un objeto, llama recursivamente
        if (typeof value === 'object' && value !== null) {
          if (this.objectContainsText(value, text)) {
            return true;
          }
        } else if (typeof value === 'string' || typeof value === 'number') {
          // Si el valor es una cadena o número, verifica si incluye el texto
          if (value.toString().toLowerCase().includes(text)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getUidFromLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');  // Obtener el usuario desde localStorage
    if (user && user.uid) {
      this.uid = user.uid;  // Asignar el UID si existe
    } else {
      console.error('UID no encontrado en localStorage');
    }
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

  async loadHorarios(): Promise<void> {
    if (this.uid) {
      try {
        // Mostrar el loading con SweetAlert
        Swal.fire({
          title: 'Cargando horarios...',
          text: 'Por favor espere...',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading(); // Muestra el loader
          }
        });
  
        if (this.role == 'especialista') {
          this.horarios = await this.firebaseSvc.getTurnosEspecialista(this.uid);
        } else if (this.role == 'administrador') {
          this.horarios = await this.firebaseSvc.getTurnosAdmin();
        } else if (this.role == 'paciente') {
          console.log('hola');
          console.log(this.uid);
          this.horarios = await this.firebaseSvc.getTurnosPaciente(this.uid);
          console.log(this.horarios);
        }
  
        // Ocultar el loading después de que los horarios estén cargados
        Swal.close();
  
      } catch (error) {
        console.error('Error al cargar los horarios', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al cargar los horarios.',
          icon: 'error'
        });
      }
    } else {
      console.error('No se puede cargar los horarios porque no hay UID');
    }
  
    this.horariosConPaciente = this.horarios.filter(h => h.pacienteId);
  
    // Crear una nueva lista de horarios con los cambios
    const updatedHorarios = await Promise.all(this.horariosConPaciente.map(async (horario) => {
      if (horario.reseña) {
        horario.resenia = horario.reseña;
      }
      if (horario.pacienteId) {
        horario.pacienteNombre = await this.firebaseSvc.getPacienteNombre(horario.pacienteId);
      } else {
        horario.pacienteNombre = 'No reservado';
      }
  
      if (this.role == 'paciente' || this.role == 'administrador') {
        horario.especialistaNombre = await this.firebaseSvc.getEspecialistaNombre(horario.especialistaId);
      }
  
      return horario;
    }));
    this.turnosFiltrados = updatedHorarios;
    this.aplicarFiltro();
  }
  
  async rechazarTurno(horario: any): Promise<void> {
    Swal.fire({
      title: '¿Qué deseas hacer con el turno?',
      text: 'Elige una opción para proceder.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Rechazar Turno',
      cancelButtonText: 'No hacer nada',
      customClass: {
        confirmButton: 'swal-button-rechazar',
        cancelButton: 'swal-button-cancelar',
        denyButton: 'swal-button-no-hacer-nada',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Solicitar razón del rechazo
        Swal.fire({
          title: 'Razón del rechazo',
          input: 'textarea',
          inputPlaceholder: 'Escribe la razón aquí...',
          inputAttributes: {
            'aria-label': 'Escribe la razón aquí',
          },
          showCancelButton: true,
          confirmButtonText: 'Guardar razón',
          cancelButtonText: 'Cancelar',
          inputValidator: (value: string) => {
            if (!value) {
              return 'Por favor, escribe una razón.';
            }
            return null;
          },
        }).then((reasonResult) => {
          if (reasonResult.isConfirmed) {
            const razonRechazo = reasonResult.value;
            this.firebaseSvc.rechazarTurno(horario.id, 'Rechazado por el especialista. Razón: ' + razonRechazo).then(() => {
              this.loadHorarios();
            });
          }
        });
      }
    });
  }

  async cancelarTurno(horario: any): Promise <void> {
    Swal.fire({
      title: '¿Qué deseas hacer con el turno?',
      text: 'Elige una opción para proceder.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cancelar Turno',
      cancelButtonText: 'No hacer nada',
      customClass: {
        confirmButton: 'swal-button-rechazar',
        cancelButton: 'swal-button-cancelar',
        denyButton: 'swal-button-no-hacer-nada',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Solicitar razón del rechazo
        Swal.fire({
          title: 'Razón del rechazo',
          input: 'textarea',
          inputPlaceholder: 'Escribe la razón aquí...',
          inputAttributes: {
            'aria-label': 'Escribe la razón aquí',
          },
          showCancelButton: true,
          confirmButtonText: 'Guardar razón',
          cancelButtonText: 'Cancelar',
          inputValidator: (value: string) => {
            if (!value) {
              return 'Por favor, escribe una razón.';
            }
            return null;
          },
        }).then((reasonResult) => {
          if (reasonResult.isConfirmed) {
            const razonRechazo = reasonResult.value;
            this.firebaseSvc.cancelarTurno(horario.id, 'Cancelado por el especialista. Razón: ' + razonRechazo).then(() => {
              this.loadHorarios();
            });
          }
        });
      }
    });
  }
  
  async cancelarPaciente(horario: any): Promise<void> {
    Swal.fire({
      title: 'Cancelar Turno',
      text: 'Por favor, ingresa una razón antes de cancelar el turno.',
      input: 'textarea',
      inputPlaceholder: 'Escribe tu comentario aquí...',
      showCancelButton: true,  // No mostrar opción de cancelar
      confirmButtonText: 'Cancelar turno',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red', // Rojo
      preConfirm: (value: string) => {
        if (!value.trim()) {
          Swal.showValidationMessage('El comentario es obligatoria');
          return false; // Impide que se cierre el modal sin un comentario
        }
        return value; // Devuelve el comentario ingresado si es válida
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const comentario = result.value;
        // Llamar a la función para finalizar el turno
        this.firebaseSvc.cancelarTurno(horario.id,'Cancelado por el paciente. Razón: ' + comentario)
          .then(() => {
            this.loadHorarios(); // Recargar los horarios
          })
          .catch((error) => {
            console.error('Error al finalizar el turno:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al finalizar el turno.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
      }
    });
  }

  cancelarAdmin(horario: any): void {
    Swal.fire({
      title: 'Cancelar Turno',
      text: 'Por favor, ingresa una razón antes de cancelar el turno.',
      input: 'textarea',
      inputPlaceholder: 'Escribe tu comentario aquí...',
      showCancelButton: true,  // No mostrar opción de cancelar
      confirmButtonText: 'Cancelar Turno',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red', // Rojo
      preConfirm: (value: string) => {
        if (!value.trim()) {
          Swal.showValidationMessage('El comentario es obligatoria');
          return false; // Impide que se cierre el modal sin un comentario
        }
        return value; // Devuelve el comentario ingresado si es válida
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const comentario = result.value;
        // Llamar a la función para finalizar el turno
        this.firebaseSvc.cancelarTurno(horario.id,'Cancelado por el admin. Razón: ' + comentario)
          .then(() => {
            this.loadHorarios(); // Recargar los horarios
          })
          .catch((error) => {
            console.error('Error al finalizar el turno:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al finalizar el turno.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
      }
    });
  }


  async completarEncuestaPaciente(horario: any): Promise<void> {
    Swal.fire({
      title: 'Encuesta',
      text: '¿Recomendaría esta clínica con alguien más?',
      input: 'textarea',
      inputPlaceholder: 'Escribe tu respuesta aquí...',
      showCancelButton: true,  // No mostrar opción de cancelar
      confirmButtonText: 'Finalizar Encuesta',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red', // Rojo
      preConfirm: (value: string) => {
        if (!value.trim()) {
          Swal.showValidationMessage('El comentario es obligatoria');
          return false; // Impide que se cierre el modal sin un comentario
        }
        return value; // Devuelve el comentario ingresado si es válida
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const comentario = result.value;
        // Llamar a la función para finalizar el turno
        this.firebaseSvc.completarEncuestaHorario(horario.id,comentario)
          .then(() => {
            this.loadHorarios(); // Recargar los horarios
          })
          .catch((error) => {
            console.error('Error al finalizar la encuesta:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al finalizar el turno.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
      }
    });
  }

  async completarCalifacionPaciente(horario: any): Promise <void> {
    Swal.fire({
      title: 'Califique al especialista',
      text: 'Deje un comentario de como fue la atención del especialista.',
      input: 'textarea',
      inputPlaceholder: 'Escribe tu respuesta aquí...',
      showCancelButton: true,  // No mostrar opción de cancelar
      confirmButtonText: 'Finalizar Calificación',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red', // Rojo
      preConfirm: (value: string) => {
        if (!value.trim()) {
          Swal.showValidationMessage('El comentario es obligatoria');
          return false; // Impide que se cierre el modal sin un comentario
        }
        return value; // Devuelve el comentario ingresado si es válida
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const comentario = result.value;
        this.firebaseSvc.completarCalificacionTurno(horario.id, comentario)
          .then(() => {
            this.loadHorarios(); // Recargar los horarios
          })
          .catch((error) => {
            console.error('Error al finalizar la encuesta:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al finalizar el turno.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
      }
    });
  }
  
  verComentario(comentario: string): void {
    Swal.fire({
      title: 'Comentario',
      text: comentario,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }

  verResenia(reseña: string): void {
    Swal.fire({
      title: 'Reseña',
      text: reseña,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }

  verEncuesta(encuesta: string): void {
    Swal.fire({
      title: 'Encuesta',
      text: encuesta,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }

  verCalifacion(calificacion: string): void {
    Swal.fire({
      title: 'Calificación',
      text: calificacion,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }

  
  async aceptar(horario: any): Promise<void> {
    Swal.fire({
      title: '¿Estás seguro de aceptar el turno?',
      text: 'Una vez aceptado, no podrás modificarlo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar turno',
      cancelButtonText: 'Cancelar operación',
      customClass: {
        confirmButton: 'swal-button-aceptar',
        cancelButton: 'swal-button-cancelar',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Turno aceptado:', horario);
        this.firebaseSvc.aceptarHorario(horario.id).then(()=>{
          this.loadHorarios();
        }) 
      }
    });
  }
  
  async finalizar(horario: any): Promise<void> {
    const camposFijos = ['Altura (cm)', 'Peso (kg)', 'Temperatura (°C)', 'Presión (mmHg)'];
  
    const crearCampoInput = (type: string, placeholder: string, required = true) => {
      const input = document.createElement('input');
      input.type = type;
      input.placeholder = placeholder;
      input.required = required;
      input.style.width = '100%';
      input.style.padding = '10px';
      input.style.marginBottom = '10px';
      input.style.border = '1px solid #ccc';
      input.style.borderRadius = '5px';
      input.style.fontSize = '14px';
      return input;
    };
  
    const crearCampoClaveValor = (clavePlaceholder: string, valorPlaceholder: string) => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.gap = '10px';
  
      const claveInput = crearCampoInput('text', clavePlaceholder);
      const valorInput = crearCampoInput('text', valorPlaceholder);
  
      container.appendChild(claveInput);
      container.appendChild(valorInput);
      return container;
    };
  
    const crearCampoRango = () => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
  
      const claveRangoInput = crearCampoInput('text', 'Clave para el rango (Ej: nivel)');
      const rangoInput = crearCampoInput('range', 'Rango de 0 a 100');
      rangoInput.min = '0';
      rangoInput.max = '100';
  
      container.appendChild(claveRangoInput);
      container.appendChild(rangoInput);
      return container;
    };
  
    const crearCampoNum = () => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
  
      const claveNumInput = crearCampoInput('text', 'Clave para el número (Ej: cantidad)');
      const numInput = crearCampoInput('number', 'Número');
  
      container.appendChild(claveNumInput);
      container.appendChild(numInput);
      return container;
    };
  
    // Crear el campo dinámico de Sí/No
    const crearCampoSiNo = () => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
  
      const claveSiNoInput = crearCampoInput('text', 'Clave para Sí/No');
      const valorSiNoSelect = document.createElement('select');
      valorSiNoSelect.style.width = '100%';
      valorSiNoSelect.style.padding = '10px';
      valorSiNoSelect.style.marginBottom = '10px';
      valorSiNoSelect.style.border = '1px solid #ccc';
      valorSiNoSelect.style.borderRadius = '5px';
      valorSiNoSelect.style.fontSize = '14px';
  
      const optionYes = document.createElement('option');
      optionYes.value = 'sí';
      optionYes.textContent = 'Sí';
  
      const optionNo = document.createElement('option');
      optionNo.value = 'no';
      optionNo.textContent = 'No';
  
      valorSiNoSelect.appendChild(optionYes);
      valorSiNoSelect.appendChild(optionNo);
  
      container.appendChild(claveSiNoInput);
      container.appendChild(valorSiNoSelect);
      return container;
    };
  
    Swal.fire({
      title: 'Finalizar Turno',
      text: 'Por favor, ingresa una reseña y los datos de la historia clínica antes de finalizar el turno.',
      input: 'textarea',
      inputPlaceholder: 'Escribe tu reseña aquí...',
      showCancelButton: true,
      confirmButtonText: 'Finalizar Turno',
      confirmButtonColor: '#28a745',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      preConfirm: (value: string) => {
        if (!value.trim()) {
          Swal.showValidationMessage('La reseña es obligatoria');
          return false;
        }
        return value;
      },
      didOpen: () => {
        const container = Swal.getPopup();
        if (container) {
          const form = document.createElement('form');
          form.style.display = 'flex';
          form.style.flexDirection = 'column';
          form.style.alignItems = 'center';
          form.style.gap = '10px';
          form.style.maxWidth = '300px';
          form.style.margin = 'auto';
  
          // Campos fijos
          camposFijos.forEach(placeholder => form.appendChild(crearCampoInput('number', placeholder)));
  
          // Campos dinámicos
          form.appendChild(crearCampoRango());
          form.appendChild(crearCampoNum());
          for (let i = 0; i < 3; i++) {
            form.appendChild(crearCampoClaveValor(`Clave ${i + 1} (Ej: caries)`, `Valor ${i + 1} (Ej: 4)`));
          }
  
          // Agregar campo dinámico de Sí/No
          form.appendChild(crearCampoSiNo());
  
          container.appendChild(form);
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const reseña = result.value;
        const historiaClinica: HistoriaClinica = {};  
  
        // Recoger datos fijos
        for (let placeholder of camposFijos) {
          const input = document.querySelector(`input[placeholder="${placeholder}"]`) as HTMLInputElement;
          if (!input.value) {
            Swal.fire({
              title: 'Error',
              text: 'Todos los campos fijos de la historia clínica son obligatorios.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
            return;
          }
          historiaClinica[placeholder] = parseFloat(input.value);
        }
  
        // Recoger campo dinámico (rango) y su clave
        const claveRango = (document.querySelector('input[placeholder="Clave para el rango (Ej: nivel)"]') as HTMLInputElement).value;
        const rangoValue = (document.querySelector('input[type="range"]') as HTMLInputElement).value;
        if (claveRango && rangoValue) {
          historiaClinica[claveRango] = rangoValue;
        }
  
        // Recoger campo numérico y su clave
        const claveNum = (document.querySelector('input[placeholder="Clave para el número (Ej: cantidad)"]') as HTMLInputElement).value;
        const numValue = (document.querySelector('input[type="number"]') as HTMLInputElement).value;
        if (claveNum && numValue) {
          historiaClinica[claveNum] = parseFloat(numValue);
        }
  
        // Recoger datos clave/valor
        for (let i = 0; i < 3; i++) {
          const clave = (document.querySelector(`input[placeholder="Clave ${i + 1} (Ej: caries)"]`) as HTMLInputElement).value;
          const valor = (document.querySelector(`input[placeholder="Valor ${i + 1} (Ej: 4)"]`) as HTMLInputElement).value;
          if (clave && valor) historiaClinica[clave] = valor;
        }
  
        // Recoger datos del campo Sí/No
        const claveSiNo = (document.querySelector('input[placeholder="Clave para Sí/No"]') as HTMLInputElement).value;
        const valorSiNo = (document.querySelector('select') as HTMLSelectElement).value;
        if (claveSiNo && valorSiNo) {
          historiaClinica[claveSiNo] = valorSiNo;
        }
  
        this.firebaseSvc.finalizarHorario(this.uid, horario.id, reseña, historiaClinica)
          .then(() => {
            this.loadHorarios();
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al finalizar el turno.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
      }
    });
  }
  
  
  
  
  


  onCaptchaCancelarPaciente(turno: any): () => Promise<void>{
    return () => this.cancelarPaciente(turno);
  }

  onCaptchaCancelar(turno: any): () => Promise<void>{
    return () => this.cancelarTurno(turno);
  }

  onCaptchaRechazar(turno: any): () =>Promise<void>{
    return () => this.rechazarTurno(turno);
  }

  onCaptchaAceptar(turno: any):() => Promise<void>{
    return () => this.aceptar(turno);
  }

  onCaptchaFinalizar(turno: any):() => Promise<void>{
    return () => this.finalizar(turno);
  }

  onCaptchaEncuesta(turno: any):() => Promise<void>{
    return () => this.completarEncuestaPaciente(turno);
  }

  onCaptchaCalificar(turno: any):() => Promise<void>{
    return () => this.completarCalifacionPaciente(turno);
  }

}
