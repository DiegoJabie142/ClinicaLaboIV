import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-informe-cantidad-turnos-medico-tiempo-finalizado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informe-cantidad-turnos-medico-tiempo-finalizado.component.html',
  styleUrl: './informe-cantidad-turnos-medico-tiempo-finalizado.component.scss'
})
export class InformeCantidadTurnosMedicoTiempoFinalizadoComponent {
  firebaseSvc = inject(FirebaseService);

  fechaInicio: string = '';  // Definir como string, no como Date
  fechaFin: string = '';     // Definir como string, no como Date

  turnosPorEspecialista: { [key: string]: number } = {}; // Almacena el informe de turnos por especialista

  // Función para obtener los turnos por especialista y fecha
  async obtenerInformeTurnos(fechaInicio: string, fechaFin: string): Promise<void> {
    try {
      // Convertir las fechas a objetos Date
      const fechaInicioDate = new Date(fechaInicio);
      const fechaFinDate = new Date(fechaFin);
  
      // Obtener el informe de turnos por especialista (con UID)
      const turnosPorEspecialista = await this.firebaseSvc.obtenerTurnosPorEspecialistaYFechaFinalizado(fechaInicioDate, fechaFinDate);
  
      // Crear un nuevo objeto para almacenar el informe con el nombre del especialista
      const turnosConNombres: { [key: string]: number } = {};
  
      // Iterar sobre los turnos y obtener el nombre del especialista
      for (const especialistaId in turnosPorEspecialista) {
        // Obtener el nombre del especialista usando la función getEspecialistaNombre
        const nombreEspecialista = await this.firebaseSvc.getEspecialistaNombre(especialistaId);
  
        // Asignar el conteo de turnos con el nombre del especialista
        if(nombreEspecialista){
          turnosConNombres[nombreEspecialista] = turnosPorEspecialista[especialistaId];
        }
      }
  
      // Guardar el informe con nombres de especialistas
      this.turnosPorEspecialista = turnosConNombres;
      
      console.log(this.turnosPorEspecialista); // Ver en la consola (opcional)
    } catch (error) {
      console.error("Error al obtener el informe de turnos:", error);
    }
  }

  descargarPdf(): void {
    const doc = new jsPDF('p', 'mm', 'a4'); // Creando un nuevo documento en orientación vertical (portrait)

    // Seleccionamos el elemento HTML que queremos convertir a PDF
    const contenidoHtml = document.getElementById('contenidoHtml') as HTMLElement;

    // Usamos html2pdf para convertir el contenido a PDF con un ajuste automático de tamaño
    doc.html(contenidoHtml, {
      callback: function (doc) {
        // Descargar el archivo generado
        doc.save('archivo.pdf');
      },
      margin: [10, 10, 10, 10], // Márgenes alrededor del contenido
      filename: 'contenido.pdf',
      html2canvas: {
        scale: 0.3,  // Reducir la escala del contenido, puedes probar con 0.7 o cualquier otro valor que funcione bien
        width: 210,  // Ancho máximo en mm (A4 es de 210mm)
        height: 297, // Alto máximo en mm (A4 es de 297mm)
        x: 10, // Ajuste del contenido en el eje X
        y: 10  // Ajuste del contenido en el eje Y
      },
    });
  }
  
}
