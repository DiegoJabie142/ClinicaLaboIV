import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [NgFor, NgIf,FormsModule, HeaderComponent, CommonModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.scss'
})
export class MisTurnosComponent {

  horarios: any[] = [];  // Para almacenar los horarios recuperados
  uid: string = '';  // Variable para almacenar el UID
  role: string | null = '';  // Variable para almacenar el UID

  title = 'MyClinic';
  headerLinks: Array<{ label: string; route: string }> = [];

  currentDate: Date = new Date();

  horariosConPaciente: any[] = [];

  mostrarConfirmacion: boolean = false;

  isLoggedIn:boolean = false;
  firebaseSvc = inject(FirebaseService);

  private _horariosFiltrados: any[] = [];

  set horariosFiltrados(data: any[]) {
    this._horariosFiltrados = data;
    if(this.role=='especialista'){
      this.aplicarFiltroEspecialista();
    }else{
      this.aplicarFiltro(); // Llamamos a aplicarFiltro cada vez que se actualiza horariosFiltrados
    }
  }

  get horariosFiltrados(): any[] {
    return this._horariosFiltrados;
  }
  
  terminoBusqueda: string = '';   // Texto del campo de búsqueda

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.role = this.getRoleFromLocalStorage(); // Llamar para obtener el ROL
    this.updateHeaderLinks();
    this.isLoggedIn = await this.estaLoggeado();
    this.getUidFromLocalStorage();  // Llamar para obtener el UID
    await this.loadHorarios();  // Llamar la función para cargar los horarios
    this.horariosFiltrados = [...this.horariosConPaciente]; 
  }


  aplicarFiltro(): void {
    const texto = this.terminoBusqueda.toLowerCase().trim();
    this.horariosFiltrados = this.horariosConPaciente.filter(horario => {
      const especialidad = horario.especialidad?.toLowerCase() || '';
      const especialistaNombre = horario.especialistaNombre?.toLowerCase() || '';
      return (
        especialidad.includes(texto) || 
        especialistaNombre.includes(texto)
      );
    });
  }

  aplicarFiltroEspecialista(): void {
    const texto = this.terminoBusqueda.toLowerCase().trim();
    this.horariosFiltrados = this.horariosConPaciente.filter(horario => {
      const especialidad = horario.especialidad?.toLowerCase() || '';
      const especialistaNombre = horario.pacienteNombre?.toLowerCase() || '';
      return (
        especialidad.includes(texto) || 
        especialistaNombre.includes(texto)
      );
    });
  }
  

  async estaLoggeado(): Promise<boolean> {
    return  await this.firebaseSvc.isUserLoggedIn();
  }


  updateHeaderLinks() {
    if(this.role === 'administrador') {
      this.headerLinks = [
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Sección Usuarios', route: '/users' },
        { label: 'Configuración', route: '/admin-settings' },
      ];
    } else if (this.role === 'especialista') {
      this.headerLinks = [
        { label: 'Home', route: '/home' },
        { label: 'Mi Perfil', route: '/mi-perfil' },   
      ];
    } else if (this.role === 'paciente') {
      this.headerLinks = [
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Mi Historial', route: '/history' },
        { label: 'Reservar Cita', route: '/book-appointment' },
      ];
    } else {
      this.headerLinks = [
        { label: 'Iniciar Sesión', route: '/login' },
        { label: 'Registrarse', route: '/sign-up/select' }
      ];
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
        if(this.role=='especialista'){
          this.horarios = await this.firebaseSvc.getEspecialistaHorarios(this.uid);
        }else if(this.role=='administrador'){
          this.horarios = await this.firebaseSvc.getAdminHorarios();
        }else if(this.role=='paciente'){
          this.horarios = await this.firebaseSvc.getPacienteHorarios(this.uid);
        }
      } catch (error) {
        console.error('Error al cargar los horarios', error);
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

      if(this.role=='paciente' || this.role=='administrador'){
        horario.especialistaNombre = await this.firebaseSvc.getEspecialistaNombre(horario.especialistaId);
      }

      return horario;
    }));
  
    // Reemplazamos el array con la nueva referencia
    this.horariosConPaciente = updatedHorarios;
    this.horariosFiltrados = [...this.horariosConPaciente]; 
  }
  

  rechazar(horario: any): void {
    Swal.fire({
      title: '¿Qué deseas hacer con el turno?',
      text: 'Elige una opción para proceder.',
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Rechazar Turno',
      cancelButtonText: 'No hacer nada',
      denyButtonText: 'Cancelar Turno',
      customClass: {
        confirmButton: 'swal-button-rechazar',
        cancelButton: 'swal-button-cancelar',
        denyButton: 'swal-button-no-hacer-nada',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Abrir un segundo Swal para pedir la razón del rechazo
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
              return 'Por favor, escribe una razón.'; // Devuelve el mensaje de error si no hay texto
            }
            return null; // No hay errores de validación
          },
        }).then((reasonResult) => {
          if (reasonResult.isConfirmed) {
            const razonRechazo = reasonResult.value; // Variable para almacenar la razón
            console.log('Razón del rechazo:', razonRechazo);
            this.firebaseSvc.rechazarHorario(this.uid,horario,'Rechazado por el especialista. Razón: ' + razonRechazo).then(()=>{
              this.loadHorarios();
            }) 
          }
        });
      } else if (result.isDenied) {
        // Abrir un segundo Swal para pedir la razón del cancelamiento
        Swal.fire({
          title: 'Razón del cancelamiento',
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
              return 'Por favor, escribe una razón.'; // Devuelve el mensaje de error si no hay texto
            }
            return null; // No hay errores de validación
          },
        }).then((reasonResult) => {
          if (reasonResult.isConfirmed) {
            const razonCancelamiento = reasonResult.value; // Variable para almacenar la razón
            this.firebaseSvc.cancelarHorario(this.uid,horario,'Cancelado por el especialista. Razón: ' + razonCancelamiento).then(()=>{
              this.loadHorarios();
            }) 
          }
        });
      }
    });
  }
  
  cancelarPaciente(horario: any): void {
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
        this.firebaseSvc.cancelarHorario(horario.especialistaId, horario,'Cancelado por el paciente. Razón: ' + comentario)
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
        this.firebaseSvc.cancelarHorario(horario.especialistaId, horario,'Cancelado por el admin. Razón: ' + comentario)
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


  completarEncuestaPaciente(horario: any): void {
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
        this.firebaseSvc.completarEncuestaHorario(horario.especialistaId, horario,comentario)
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

  completarCalifacionPaciente(horario: any): void {
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
        this.firebaseSvc.completarCalificacionHorario(horario.especialistaId, horario, comentario)
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

  
  aceptar(horario: any): void {
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
        this.firebaseSvc.aceptarHorario(this.uid,horario).then(()=>{
          this.loadHorarios();
        }) 
      }
    });
  }
  
  finalizar(horario: any): void {
    Swal.fire({
      title: 'Finalizar Turno',
      text: 'Por favor, ingresa una reseña y los datos de la historia clínica antes de finalizar el turno.',
      input: 'textarea',
      inputPlaceholder: 'Escribe tu reseña aquí...',
      showCancelButton: true,  // Permite cancelar
      confirmButtonText: 'Finalizar Turno',
      confirmButtonColor: '#28a745', // Verde bonito
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33', // Rojo para cancelar
      preConfirm: (value: string) => {
        if (!value.trim()) {
          Swal.showValidationMessage('La reseña es obligatoria');
          return false; // Impide que se cierre el modal sin una reseña
        }
        return value; // Devuelve la reseña ingresada si es válida
      },
      inputAttributes: {
        'aria-label': 'Escribe la reseña del turno aquí',
      },
      didOpen: () => {
        const container = Swal.getPopup(); // Usamos getPopup() en lugar de getContent()
  
        // Verificamos si container no es null
        if (container) {
          const form = document.createElement('form');
  
          // Crear campos para los datos fijos de la historia clínica
          const alturaInput = document.createElement('input');
          alturaInput.type = 'number';
          alturaInput.placeholder = 'Altura (cm)';
          alturaInput.required = true;
  
          const pesoInput = document.createElement('input');
          pesoInput.type = 'number';
          pesoInput.placeholder = 'Peso (kg)';
          pesoInput.required = true;
  
          const temperaturaInput = document.createElement('input');
          temperaturaInput.type = 'number';
          temperaturaInput.placeholder = 'Temperatura (°C)';
          temperaturaInput.required = true;
  
          const presionInput = document.createElement('input');
          presionInput.type = 'text';
          presionInput.placeholder = 'Presión (mmHg)';
          presionInput.required = true;
  
          form.appendChild(alturaInput);
          form.appendChild(pesoInput);
          form.appendChild(temperaturaInput);
          form.appendChild(presionInput);
  
          // Campos para los datos dinámicos (clave y valor)
          for (let i = 0; i < 3; i++) {
            const claveInput = document.createElement('input');
            claveInput.type = 'text';
            claveInput.placeholder = `Clave ${i + 1} (Ej: caries)`;
  
            const valorInput = document.createElement('input');
            valorInput.type = 'text';
            valorInput.placeholder = `Valor ${i + 1} (Ej: 4)`;
  
            const containerClaveValor = document.createElement('div');
            containerClaveValor.style.display = 'flex';
            containerClaveValor.style.gap = '10px'; // Espacio entre clave y valor
  
            containerClaveValor.appendChild(claveInput);
            containerClaveValor.appendChild(valorInput);
  
            form.appendChild(containerClaveValor);
          }
  
          // Estilos CSS en línea para los inputs
          form.style.display = 'flex';
          form.style.flexDirection = 'column';
          form.style.alignItems = 'center';
          form.style.gap = '10px';
          form.style.maxWidth = '300px'; // Máximo ancho
          form.style.margin = 'auto';
  
          // Estilos para los inputs individuales
          const inputs = form.querySelectorAll('input');
          inputs.forEach((input: HTMLElement) => {
            input.style.width = '100%';
            input.style.padding = '10px';
            input.style.marginBottom = '10px';
            input.style.border = '1px solid #ccc';
            input.style.borderRadius = '5px';
            input.style.fontSize = '14px';
          });
  
          // Añadir el formulario al contenedor
          container.appendChild(form);
  
          // Crear un contenedor adicional para envolver los botones
          const buttonContainer = document.createElement('div');
          buttonContainer.style.display = 'flex';
          buttonContainer.style.justifyContent = 'center';
          buttonContainer.style.gap = '10px';
          buttonContainer.style.marginTop = '20px'; // Espacio para separar los botones
  
          // Añadir los botones
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();
  
          if (confirmButton && cancelButton) {
            buttonContainer.appendChild(confirmButton);
            buttonContainer.appendChild(cancelButton);
            container.appendChild(buttonContainer);
          }
        } else {
          console.error('No se pudo acceder al popup de SweetAlert');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const reseña = result.value;
        console.log('Reseña del turno:', reseña);
  
        // Obtener los valores de la historia clínica
        const altura = (document.querySelector('input[placeholder="Altura (cm)"]') as HTMLInputElement).value;
        const peso = (document.querySelector('input[placeholder="Peso (kg)"]') as HTMLInputElement).value;
        const temperatura = (document.querySelector('input[placeholder="Temperatura (°C)"]') as HTMLInputElement).value;
        const presion = (document.querySelector('input[placeholder="Presión (mmHg)"]') as HTMLInputElement).value;
  
        // Obtener los datos dinámicos
        const datosDinamicos: any = {};
        for (let i = 0; i < 3; i++) {
          const clave = (document.querySelector(`input[placeholder="Clave ${i + 1} (Ej: caries)"]`) as HTMLInputElement).value;
          const valor = (document.querySelector(`input[placeholder="Valor ${i + 1} (Ej: 4)"]`) as HTMLInputElement).value;
          if (clave && valor) {
            datosDinamicos[clave] = valor;
          }
        }
  
        // Validar que los campos fijos estén completos
        if (!altura || !peso || !temperatura || !presion) {
          Swal.fire({
            title: 'Error',
            text: 'Todos los campos fijos de la historia clínica son obligatorios.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
          return;
        }
  
        // Crear el objeto de la historia clínica
        const historiaClinica = {
          altura: parseFloat(altura),
          peso: parseFloat(peso),
          temperatura: parseFloat(temperatura),
          presion: presion,
          ...datosDinamicos // Agregar los datos dinámicos si existen
        };
  
        // Llamar a la función para finalizar el turno y guardar la historia clínica
        this.firebaseSvc.finalizarHorario(this.uid, horario, reseña, historiaClinica)
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
  
  
  
  
  
  
  
  
}
