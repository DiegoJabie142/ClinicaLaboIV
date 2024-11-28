import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import Swal from 'sweetalert2';
import { MisHorariosComponent } from '../mis-horarios/mis-horarios.component';
import jsPDF from 'jspdf';
import { ToggleThemeDirective } from '../../directivas/toggle-theme.directive';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor, MisHorariosComponent, ToggleThemeDirective],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss'
})

export class PerfilesComponent {
  title = 'MyClinic';
  headerLinks: Array<{ label: string; route: string }> = [];
  uid: string = '';

  modoOscuro: boolean = false;

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  isLoggedIn:boolean = false;

  historiaClinica: any[] = [];

  historiasSegunEspecialidad: any[] = [];

  buttons: string[] = [];

  userData: any;

  role: string | null = '';  // Variable para almacenar el UID

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.estaLoggeado();
    this.loadUserData();
    this.role =  this.getRoleFromLocalStorage();
    this.getUidFromLocalStorage();
    if (this.role == 'paciente') {
      this.cargarHistoriaClinica();
    }
  }


  async cargarHistoriaClinica(): Promise<void> {
    const loadingSwal = Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere, estamos cargando la historia clínica...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el ícono de carga
      }
    });
    try {
      // Llamamos a la función que obtiene la historia clínica
      const historia = await this.firebaseSvc.getHistoriaClinica(this.uid);
      
      // Verificamos si la historia clínica tiene datos
      if (historia && historia.length > 0) {
        // Creamos un array para almacenar las historias clínicas agrupadas por especialidad
        const historiasSegunEspecialidad: any[] = [];
        
        // Asignamos las historias directamente a historiaClinica
        this.historiaClinica = historia;
        // Agrupamos las historias por especialidad
        historia.forEach((historiaClinica) => {
          const especialidad = historiaClinica.especialidad || 'Especialidad no disponible';
          
          // Buscamos si ya existe una entrada para esta especialidad en el array
          let especialidadEncontrada = historiasSegunEspecialidad.find(item => item.especialidad === especialidad);
          
          // Si no existe, la agregamos al array
          if (!especialidadEncontrada) {
            especialidadEncontrada = { especialidad, historias: [] };
            historiasSegunEspecialidad.push(especialidadEncontrada);
          }
          
          // Agregamos la historia clínica a la especialidad correspondiente
          especialidadEncontrada.historias.push(historiaClinica);
        });
  
        // Asignamos las historias agrupadas por especialidad
        this.historiasSegunEspecialidad = historiasSegunEspecialidad;
      } else {
        console.error('No se encontró historia clínica.');
        this.historiaClinica = [];  // Si no se encuentra historia clínica, asignamos un array vacío
        this.historiasSegunEspecialidad = [];  // También aseguramos que historiasSegunEspecialidad esté vacío
      }
    } catch (error: any) {
      // Manejo de errores con un mensaje informativo
      console.error('Error al obtener la historia clínica:', error.message);
      this.historiaClinica = [];  // En caso de error, asignamos un array vacío
      this.historiasSegunEspecialidad = [];  // En caso de error, también vaciamos historiasSegunEspecialidad
    }
    Swal.close();
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
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }

  
  getEspecialistaNombre(uid: string): Promise<string | null> {
    return this.firebaseSvc.getEspecialistaNombre(uid);
  }


  mostrarHistoriaClinica(historia: any): void {
    // Construimos dinámicamente el contenido basado en las claves y valores de la historia
    let contenido = '<ul style="text-align: left;">';
  
    for (const [clave, valor] of Object.entries(historia)) {
      // Evitar mostrar campos no relevantes (si aplica)
      if (typeof valor !== 'object') {
        contenido += `<li><strong>${this.formatearClave(clave)}:</strong> ${valor || 'No disponible'}</li>`;
      }
    }
  
    contenido += '</ul>';
  
    // Mostramos el Swal con el contenido generado
    Swal.fire({
      title: 'Detalles de la Historia Clínica',
      html: contenido,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      width: '400px'
    });
  }

    // Función para formatear claves (opcional)
  private formatearClave(clave: string): string {
    // Convierte claves tipo camelCase o snake_case en texto más legible
    return clave
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Separar camelCase
      .replace(/_/g, ' ') // Reemplazar snake_case por espacios
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalizar cada palabra
  }


  descargarHistoriasClinicasPDFSegunEspecialidad(especialidad: string): void {
    // Buscar la especialidad en las historiasSegunEspecialidad
    const especialidadEncontrada = this.historiasSegunEspecialidad.find(item => item.especialidad === especialidad);
  
    if (!especialidadEncontrada) {
      console.error('No se encontraron historias clínicas para esta especialidad.');
      return;
    }
  
    const doc = new jsPDF();
    const currentDate = new Date();
    const fechaEmision = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getFullYear()}`;
  
    // Ruta del logo de la clínica (asegúrate de que esté en assets)
    const logoPath = 'assets/logo.png';
  
    // Cargar el logo y aplicar opacidad utilizando un canvas
    const img = new Image();
    img.src = logoPath;
  
    img.onload = () => {
      // Crear un canvas para aplicar opacidad
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const logoSize = 200; // Tamaño del logo (cuadrado 200x200 px)
      canvas.width = logoSize;
      canvas.height = logoSize;
  
      // Verificar que el contexto del canvas no sea null
      if (ctx) {
        // Dibujar la imagen en el canvas con opacidad
        ctx.globalAlpha = 0.5;  // Establecer la opacidad (0.5 significa 50% de transparencia)
        ctx.drawImage(img, 0, 0, logoSize, logoSize);
  
        // Convertir el canvas a una imagen base64
        const dataUrl = canvas.toDataURL('image/png');
  
        // Agregar logo con base64 al PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const logoX = (pageWidth - logoSize) / 2; // Centrar horizontalmente
        const logoY = (pageHeight - logoSize) / 2; // Centrar verticalmente
  
        doc.addImage(dataUrl, 'PNG', logoX, logoY, logoSize, logoSize); // Agregar el logo al PDF
  
        // Título del informe
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text(`Historias Clínicas - Especialidad: ${especialidad}`, 10, 20);
  
        // Fecha de emisión
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha de emisión: ${fechaEmision}`, 55, 30);
  
        // Espaciado inicial para contenido
        let yPosition = 40;
  
        // Iterar sobre las historias clínicas de la especialidad
        especialidadEncontrada.historias.forEach((historia: any, index: number) => {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(`Historia ${index + 1}`, 10, yPosition);
          yPosition += 8;
  
          // Agregar los datos dinámicos de cada historia clínica
          for (const [clave, valor] of Object.entries(historia)) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`${this.formatearClave(clave)}: ${valor || 'No disponible'}`, 10, yPosition);
            yPosition += 6;
  
            // Mover a la siguiente página si se excede el límite
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 10;
            }
          }
  
          yPosition += 8; // Espaciado entre historias
        });
  
        // Descargar el PDF
        doc.save(`Historias_Clinicas_${especialidad}.pdf`);
      } else {
        console.error('Error al obtener el contexto del canvas');
      }
    };
  }

  descargarHistoriasClinicasPDF(): void {
    const doc = new jsPDF();
    const currentDate = new Date();
    const fechaEmision = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getFullYear()}`;
  
    // Ruta del logo de la clínica (asegúrate de que esté en assets)
    const logoPath = 'assets/logo.png';
  
    // Cargar el logo y aplicar opacidad utilizando un canvas
    const img = new Image();
    img.src = logoPath;
  
    img.onload = () => {
      // Crear un canvas para aplicar opacidad
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const logoSize = 200; // Tamaño del logo (cuadrado 200x200 px)
      canvas.width = logoSize;
      canvas.height = logoSize;
  
      // Verificar que el contexto del canvas no sea null
      if (ctx) {
        // Dibujar la imagen en el canvas con opacidad
        ctx.globalAlpha = 0.5;  // Establecer la opacidad (0.5 significa 50% de transparencia)
        ctx.drawImage(img, 0, 0, logoSize, logoSize);
  
        // Convertir el canvas a una imagen base64
        const dataUrl = canvas.toDataURL('image/png');
  
        // Agregar logo con base64 al PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const logoX = (pageWidth - logoSize) / 2; // Centrar horizontalmente
        const logoY = (pageHeight - logoSize) / 2; // Centrar verticalmente
  
        doc.addImage(dataUrl, 'PNG', logoX, logoY, logoSize, logoSize); // Agregar el logo al PDF
  
        // Título del informe
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Informe de Historias Clínicas', 55, 20);
  
        // Fecha de emisión
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha de emisión: ${fechaEmision}`, 55, 30);
  
        // Espaciado inicial para contenido
        let yPosition = 40;
  
        // Iterar sobre las historias clínicas
        this.historiaClinica.forEach((historia: any, index: number) => {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(`Historia ${index + 1}`, 10, yPosition);
          yPosition += 8;
  
          // Agregar datos dinámicos
          for (const [clave, valor] of Object.entries(historia)) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`${this.formatearClave(clave)}: ${valor || 'No disponible'}`, 10, yPosition);
            yPosition += 6;
  
            // Mover a la siguiente página si se excede el límite
            if (yPosition > 280) {
              doc.addPage();
              yPosition = 10;
            }
          }
  
          yPosition += 8; // Espaciado entre historias
        });
  
        // Descargar el PDF
        doc.save('historias-clinicas.pdf');
      } else {
        console.error('Error al obtener el contexto del canvas');
      }
    };
  }
  
  
    cambiarTema() {
      this.modoOscuro = !this.modoOscuro;
  }

}
