import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FirebaseService } from '../../../services/firebase.service';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import jsPDF from 'jspdf';
import { RoleBackgroundColorPipe } from '../../../pipes/role-background-color.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informe-logs-usuarios',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RoleBackgroundColorPipe],
  templateUrl: './informe-logs-usuarios.component.html',
  styleUrl: './informe-logs-usuarios.component.scss'
})
export class InformeLogsUsuariosComponent {
  firebaseSvc = inject(FirebaseService);

  logs: any[] = []; // Almacenará los logs de usuarios

  public chart: any;

  informeTurnosEspecialidad: boolean = false;

  async ngOnInit(): Promise<void> {

    Swal.fire({
      title: 'Cargando gráfico...',
      text: 'Por favor espere mientras generamos el gráfico.',
      icon: 'info',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.logs = await this.firebaseSvc.obtenerLogs();

    const dataPorDia = this.procesarLogs(this.logs);

    this.generarGrafico(dataPorDia);

    // Ocultar el mensaje de carga una vez generado el gráfico
    Swal.close();
  }

  private procesarLogs(logs: any[]): { [key: string]: number } {
    
    const contadorPorDia: { [key: string]: number } = {};
    logs.forEach((log) => {
      const fecha = new Date(log.timestamp).toLocaleDateString();
      contadorPorDia[fecha] = (contadorPorDia[fecha] || 0) + 1;
    });
    return contadorPorDia;
  }

  private generarGrafico(data: { [key: string]: number }): void {

    const ctx = document.getElementById('logChart') as HTMLCanvasElement;
    const fechas = Object.keys(data);
    const ingresos = Object.values(data);
  
    // Registrar los controladores necesarios para gráficos de barras
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Ingresos por día',
            data: ingresos,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ingresos por día',
          },
          legend: {
            position: 'top',
          },
        },
      },
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

