import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import { TooltipDirective } from '../../directivas/tooltip.directive';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule, CommonModule, TooltipDirective],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  
  patientData: any[] = []; // Almacena los datos de los pacientes
  specialistData: any[] = []; // Almacena los datos de los especialistas
  adminData: any[] = []; // Almacena los datos de los administradores

  isTablePatientVisible = false; // Estado para controlar si la tabla está visible
  isTableAdminVisible = false;
  isTableSpecialistVisible = false;

  
  refreshPatients() {
    this.firebaseSvc.getAllPatients().then(patients => {
      this.patientData = patients;
    }).catch(error => {
      console.error('Error al cargar pacientes:', error);
    });
  }

  refreshAdmins(){
    this.firebaseSvc.getAllAdmins().then(admins => {
      this.adminData = admins;
    }).catch(error => {
      console.error('Error al cargar especialistas:', error);
    });
  }

  refreshSpecialists(){
   this.firebaseSvc.getAllSpecialists().then(specialists => {
    this.specialistData = specialists;
  }).catch(error => {
    console.error('Error al cargar especialistas:', error);
  });
  }

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit(): void {
    this.refreshPatients();
    this.refreshSpecialists();
    this.refreshAdmins();
  }

  editActivationStatus(specialist: any) {
    // Lógica para editar el estado de activación del especialista
    console.log('Editar estado de activación para:', specialist);

    // Cambiar el estado de activación (lo invertimos, si es 'true' pasa a 'false' y viceversa)
    const newStatus = !specialist.activated;

    // Llamamos a la función de actualización de estado con el UID y el nuevo estado de activación
    this.firebaseSvc.updateSpecialistActivation(specialist.uid, newStatus)
    .then(() => {
    // Si la actualización es exitosa, se puede realizar alguna acción adicional, como actualizar la vista
    console.log('Estado de activación actualizado correctamente');
    specialist.activated = newStatus; // Actualizar el estado local del especialista en la interfaz
    })
    .catch(error => {
    // Manejo de errores en caso de fallo
    console.error('Error al actualizar el estado de activación:', error);
    });
  }

  // Función para alternar la visibilidad de la tabla
  togglePatientTable() {
    this.isTablePatientVisible = !this.isTablePatientVisible;
  }

  toggleAdminTable() {
    this.isTableAdminVisible = !this.isTableAdminVisible;
  }

  toggleSpecialistTable(){
    this.isTableSpecialistVisible = !this.isTableSpecialistVisible;
  }

  mostrarDatosAdmin(user: any): void {
    // Verifica si el usuario tiene imágenes
    let imageHtml = '';
    if (user.profilePic || user.profilePic2) {
      if (user.profilePic) {
        imageHtml += `<img src="${user.profilePic}" alt="Profile Picture" style="width: auto; height: 120px; border-radius: 50%; margin-right: 10px; object-fit: cover;">`;
      }
      if (user.profilePic2) {
        imageHtml += `<img src="${user.profilePic2}" alt="Profile Picture 2" style="width: auto; height: 120px; border-radius: 50%; object-fit: cover;">`;
      }
    }
  
    // Verifica si el usuario tiene especialidades
    let specialtiesHtml = '';
    if (user.specialities && user.specialities.length > 0) {
      specialtiesHtml = `<div><strong>Especialidades: </strong> ${user.specialities}</div>`;
    }
  
    // Mostrar los datos del usuario en SweetAlert
    Swal.fire({
      title: `Detalles de ${user.name} ${user.lastName}`,
      html: `
        ${imageHtml}
        <div style="margin-top: 40px;"><strong>Nombre:</strong> ${user.name}</div>
        <div><strong>Apellido:</strong> ${user.lastName}</div>
        <div><strong>Email:</strong> ${user.email}</div>
        <div><strong>Edad:</strong> ${user.age}</div>
        ${specialtiesHtml} <!-- Solo se muestra si hay especialidades -->
      `,
      confirmButtonText: 'Aceptar'
    });
  }
  
  async mostrarDatosEspecialista(user: any): Promise<void> {

    const turnosOriginales = await this.firebaseSvc.getTurnosEspecialista(user.uid);
    const turnosTransformados = await this.transformarTurnosPaciente(turnosOriginales);


    let imageHtml = '';
    if (user.profilePic || user.profilePic2) {
      if (user.profilePic) {
        imageHtml += `<img src="${user.profilePic}" alt="Profile Picture" style="width: auto; height: 120px; border-radius: 50%; margin-right: 10px; object-fit: cover;">`;
      }
      if (user.profilePic2) {
        imageHtml += `<img src="${user.profilePic2}" alt="Profile Picture 2" style="width: auto; height: 120px; border-radius: 50%; object-fit: cover;">`;
      }
    }
  
    // Verifica si el usuario tiene especialidades
    let specialtiesHtml = '';
    if (user.specialities && user.specialities.length > 0) {
      specialtiesHtml = `
        <div>
          <strong>Especialidades:</strong> 
          <span style="display: inline;">${user.specialities.join(', ')}</span>
        </div>`;
    }
  
    // Mostrar los datos del usuario en SweetAlert
    Swal.fire({
      title: `Detalles de ${user.name} ${user.lastName}`,
      html: `
        ${imageHtml}
        <div style="margin-top: 40px;"><strong>Nombre:</strong> ${user.name}</div>
        <div><strong>Apellido:</strong> ${user.lastName}</div>
        <div><strong>Email:</strong> ${user.email}</div>
        <div><strong>Edad:</strong> ${user.age}</div>
        ${specialtiesHtml} <!-- Solo se muestra si hay especialidades -->
      `,
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Descargar Turnos',
    }).then((result) => {
      if (result.isDenied) {
        this.descargarTurnosEspecialistaPDF(turnosTransformados);
      }
    });
  }

  async mostrarDatosPaciente(user: any): Promise<void> {

    const turnosOriginales = await this.firebaseSvc.getTurnosPaciente(user.uid);
    const turnosTransformados = await this.transformarTurnosEspecialista(turnosOriginales);

    // Verifica si el usuario tiene imágenes
    let imageHtml = '';
    if (user.profilePic || user.profilePic2) {
      if (user.profilePic) {
        imageHtml += `<img src="${user.profilePic}" alt="Profile Picture" style="width: auto; height: 120px; border-radius: 50%; margin-right: 10px; object-fit: cover;">`;
      }
      if (user.profilePic2) {
        imageHtml += `<img src="${user.profilePic2}" alt="Profile Picture 2" style="width: auto; height: 120px; border-radius: 50%; object-fit: cover;">`;
      }
    }
  
    // Verifica si el usuario tiene especialidades
    let specialtiesHtml = '';
    if (user.specialities && user.specialities.length > 0) {
      specialtiesHtml = `<div><strong>Especialidades: </strong> ${user.specialities}</div>`;
    }
  
    // Mostrar los datos del usuario en SweetAlert
    Swal.fire({
      title: `Detalles de ${user.name} ${user.lastName}`,
      html: `
        ${imageHtml}
        <div style="margin-top: 40px;"><strong>Nombre:</strong> ${user.name}</div>
        <div><strong>Apellido:</strong> ${user.lastName}</div>
        <div><strong>Email:</strong> ${user.email}</div>
        <div><strong>Obra Social:</strong> ${user.socialWork}</div>
        <div><strong>Edad:</strong> ${user.age}</div>
        ${specialtiesHtml} <!-- Solo se muestra si hay especialidades -->
      `,
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Descargar Turnos',
    }).then((result) => {
      if (result.isDenied) {
        this.descargarTurnosPacientePDF(turnosTransformados);
      }
    });
  }


  async transformarTurnosPaciente(turnos: any[]): Promise<any[]> {
    const turnosTransformados = await Promise.all(
      turnos.map(async turno => {
        const pacienteNombre = await this.firebaseSvc.getPacienteNombre(turno.pacienteId);
        return {
          fecha: turno.fecha,
          startTime: turno.startTime,
          endTime: turno.endTime,
          paciente: pacienteNombre, // Reemplazamos pacienteId con su nombre
          especialidad: turno.especialidad,
          estado: turno.estado,
        };
      })
    );
  
    return turnosTransformados;
  }

  async transformarTurnosEspecialista(turnos: any[]): Promise<any[]> {
    const turnosTransformados = await Promise.all(
      turnos.map(async turno => {
        const pacienteNombre = await this.firebaseSvc.getEspecialistaNombre(turno.especialistaId);
        return {
          fecha: turno.fecha,
          startTime: turno.startTime,
          endTime: turno.endTime,
          especialista: pacienteNombre, // Reemplazamos pacienteId con su nombre
          especialidad: turno.especialidad,
          estado: turno.estado,
        };
      })
    );
  
    return turnosTransformados;
  }


  descargarTurnosEspecialistaPDF(turnos: any[]): void {
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
        doc.text('Informe de Turnos', 55, 20);
  
        // Fecha de emisión
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha de emisión: ${fechaEmision}`, 55, 30);
  
        // Espaciado inicial para contenido
        let yPosition = 40;
  
        // Iterar sobre los turnos
        turnos.forEach((turno: any, index: number) => {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(`Turno ${index + 1}`, 10, yPosition);
          yPosition += 8;
  
          // Agregar datos dinámicos
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Fecha: ${turno.fecha}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Hora de inicio: ${turno.startTime}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Hora de fin: ${turno.endTime}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Estado turno: ${turno.estado}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Paciente: ${turno.paciente}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Especialidad: ${turno.especialidad}`, 10, yPosition);
          yPosition += 8;
  
          // Mover a la siguiente página si se excede el límite
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 10;
          }
        });
  
        // Descargar el PDF
        doc.save('turnos.pdf');
      } else {
        console.error('Error al obtener el contexto del canvas');
      }
    };
  }

  descargarTurnosPacientePDF(turnos: any[]): void {
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
        doc.text('Informe de Turnos', 55, 20);
  
        // Fecha de emisión
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha de emisión: ${fechaEmision}`, 55, 30);
  
        // Espaciado inicial para contenido
        let yPosition = 40;
  
        // Iterar sobre los turnos
        turnos.forEach((turno: any, index: number) => {
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(`Turno ${index + 1}`, 10, yPosition);
          yPosition += 8;
  
          // Agregar datos dinámicos
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Fecha: ${turno.fecha}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Hora de inicio: ${turno.startTime}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Hora de fin: ${turno.endTime}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Estado turno: ${turno.estado}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Especialista: ${turno.especialista}`, 10, yPosition);
          yPosition += 6;
          doc.text(`Especialidad: ${turno.especialidad}`, 10, yPosition);
          yPosition += 8;
  
          // Mover a la siguiente página si se excede el límite
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 10;
          }
        });
  
        // Descargar el PDF
        doc.save('turnos.pdf');
      } else {
        console.error('Error al obtener el contexto del canvas');
      }
    };
  }

  async verHistoriaClinica(uid: string) {


    const loadingSwal = Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere, estamos cargando la historia clínica...',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el ícono de carga
      }
    });

    let historia = [];

    historia = await this.firebaseSvc.getHistoriaClinica(uid);

    // Cerrar el Swal de carga
    Swal.close();
  
    if (!historia || historia.length === 0) {
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
    historia.forEach((entry, index) => {
      historiaHtml += `<li style="margin-bottom: 15px;">
        <strong>Turno ${index + 1}:</strong><br>`;
      
      // Recorrer dinámicamente las claves del objeto
      for (const key in entry) {
        if (entry.hasOwnProperty(key)) {
          historiaHtml += `<strong>${this.capitalize(key)}:</strong> ${entry[key]}<br>`;
        }
      }
  
      historiaHtml += '</li>';
    });
    historiaHtml += '</ul>';
  
    // Mostrar el modal con la historia clínica
    Swal.fire({
      title: 'Historia Clínica',
      html: historiaHtml,
      width: '600px',
      confirmButtonColor: '#0078D4'
    });
  }

  // Función auxiliar para capitalizar el primer carácter de una palabra
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
