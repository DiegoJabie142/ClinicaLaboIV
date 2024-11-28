import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FirebaseService } from '../../../services/firebase.service';
import {
  Chart,
  BarController,
  BarElement,
  ArcElement,  // Importa ArcElement para gráficos de torta
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController

} from 'chart.js';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-informe-turnos-especialidad',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './informe-turnos-especialidad.component.html',
  styleUrl: './informe-turnos-especialidad.component.scss'
})
export class InformeTurnosEspecialidadComponent {
  
  firebaseSvc = inject(FirebaseService);

  turnosPorEspecialidad: any [] = []


  public chart: any;


  async ngOnInit(): Promise<void> {
    await this.cargarGraficoTurnos();
  }


  async cargarGraficoTurnos(): Promise<void> {
    this.turnosPorEspecialidad = await this.firebaseSvc.obtenerTurnosPorEspecialidad();

    const especialidades = Object.keys(this.turnosPorEspecialidad);
    const cantidades = Object.values(this.turnosPorEspecialidad);

    
    // Registrar todos los elementos necesarios para gráficos tipo 'pie'
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title);

    this.chart = new Chart('turnosChart', {
      type: 'pie',  // Especificamos que es un gráfico de torta
      data: {
        labels: especialidades,
        datasets: [{
          label: 'Cantidad de Turnos por Especialidad',
          data: cantidades,
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C00'],
          borderColor: '#ffffff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' turnos';
              }
            }
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
        scale: 0.35,  // Reducir la escala del contenido, puedes probar con 0.7 o cualquier otro valor que funcione bien
        width: 210,  // Ancho máximo en mm (A4 es de 210mm)
        height: 297, // Alto máximo en mm (A4 es de 297mm)
        x: 10, // Ajuste del contenido en el eje X
        y: 10  // Ajuste del contenido en el eje Y
      },
    });
  }
}
