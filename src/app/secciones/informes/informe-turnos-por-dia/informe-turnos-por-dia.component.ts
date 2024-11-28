import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { FirebaseService } from '../../../services/firebase.service';
import { LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-informe-turnos-por-dia',
  standalone: true,
  imports: [],
  templateUrl: './informe-turnos-por-dia.component.html',
  styleUrl: './informe-turnos-por-dia.component.scss'
})
export class InformeTurnosPorDiaComponent {

   
  firebaseSvc = inject(FirebaseService);

  turnosPorDia: { [key: string]: number } = {}; // Almacenará los turnos por día

  async ngOnInit(): Promise<void> {
    // Obtenemos los turnos por día
    this.turnosPorDia = await this.firebaseSvc.obtenerTurnosPorDia();

    // Generamos el gráfico con los datos obtenidos
    this.generarGraficoTurnosPorDia();
  }

  generarGraficoTurnosPorDia(): void {
    const fechas = Object.keys(this.turnosPorDia);
    const cantidades = Object.values(this.turnosPorDia);

    // Registrar las escalas necesarias y los controladores
    Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend);

    const ctx = document.getElementById('turnosPorDiaChart') as HTMLCanvasElement;

    // Crear el gráfico
    new Chart(ctx, {
      type: 'bar',  // Gráfico de barras
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Cantidad de turnos por día',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true  // Asegura que el eje Y comience en 0
          }
        }
      }
    });
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
        scale: 0.25,  // Reducir la escala del contenido, puedes probar con 0.7 o cualquier otro valor que funcione bien
        width: 210,  // Ancho máximo en mm (A4 es de 210mm)
        height: 297, // Alto máximo en mm (A4 es de 297mm)
        x: 10, // Ajuste del contenido en el eje X
        y: 10  // Ajuste del contenido en el eje Y
      },
    });
  }
}
