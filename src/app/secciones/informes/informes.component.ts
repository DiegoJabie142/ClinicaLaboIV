import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FirebaseService } from '../../services/firebase.service';
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
import { InformeTurnosEspecialidadComponent } from './informe-turnos-especialidad/informe-turnos-especialidad.component';
import { InformeLogsUsuariosComponent } from "./informe-logs-usuarios/informe-logs-usuarios.component";
import { InformeTurnosPorDiaComponent } from "./informe-turnos-por-dia/informe-turnos-por-dia.component";
import { InformeCantidadTurnosMedicoTiempoComponent } from "./informe-cantidad-turnos-medico-tiempo/informe-cantidad-turnos-medico-tiempo.component";
import { InformeCantidadTurnosMedicoTiempoFinalizadoComponent } from "./informe-cantidad-turnos-medico-tiempo-finalizado/informe-cantidad-turnos-medico-tiempo-finalizado.component";

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [HeaderComponent, NgIf, CommonModule, InformeTurnosEspecialidadComponent, InformeLogsUsuariosComponent, InformeTurnosPorDiaComponent, InformeCantidadTurnosMedicoTiempoComponent, InformeCantidadTurnosMedicoTiempoFinalizadoComponent],
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})

export class InformesComponent {
  firebaseSvc = inject(FirebaseService);

  logs: any[] = []; // Almacenará los logs de usuarios

  public chart: any;

  informeTurnosLogsUsuarios: boolean = true;
  informeTurnosEspecialidad: boolean = false;
  informeTurnosPorDia: boolean = false;
  informeCantidadTurnosMedicoTiempo: boolean = false;
  informeCantidadTurnosMedicoTiempoFinalizado: boolean = false;

  async ngOnInit(): Promise<void> {

  }

  
  mostrarGraficoTurnosEspecialidad(){
    this.informeTurnosEspecialidad = true;
    this.informeTurnosLogsUsuarios = false;
    this.informeTurnosPorDia = false;
  }

  mostrarGraficoLogsUsuarios(){
    this.informeTurnosEspecialidad = false;
    this.informeCantidadTurnosMedicoTiempo = false;
    this.informeTurnosPorDia = false;
    this.informeCantidadTurnosMedicoTiempoFinalizado = false;
    this.informeTurnosLogsUsuarios = true;
  }

  mostrarGraficoTurnosPorDia(){
    this.informeTurnosEspecialidad = false;
    this.informeTurnosLogsUsuarios = false;
    this.informeCantidadTurnosMedicoTiempo = false;
    this.informeCantidadTurnosMedicoTiempoFinalizado = false;
    this.informeTurnosPorDia = true
  }

  mostrarInformeCantidadTurnosMedicoTiempo(){
    this.informeTurnosEspecialidad = false;
    this.informeTurnosLogsUsuarios = false;
    this.informeTurnosPorDia = false;
    this.informeCantidadTurnosMedicoTiempoFinalizado = false;
    this.informeCantidadTurnosMedicoTiempo = true;
  }

  mostrarInformeCantidadTurnosMedicoFinalizado(){
    this.informeTurnosEspecialidad = false;
    this.informeTurnosLogsUsuarios = false;
    this.informeTurnosPorDia = false;
    this.informeCantidadTurnosMedicoTiempo = false;
    this.informeCantidadTurnosMedicoTiempoFinalizado = true;
  }
}
