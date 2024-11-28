import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appResaltarEstadoTurno',
  standalone: true
})
export class ResaltarEstadoTurnoPipe implements PipeTransform {
  transform(value: string): { [key: string]: string } {
    switch (value.toLowerCase()) {
      case 'pendiente':
        return { 'color': '#ff6100', 'font-size': '17px', 'font-weight':'600'}; // Amarillo para pendiente
      case 'aceptado':
        return { 'color': '#4caf50', 'font-size': '17px', 'font-weight':'600'}; // Amarillo para pendiente
      case 'finalizado':
        return { 'color': '#000099', 'font-size': '17px', 'font-weight':'600'}; // Azul para finalizado
      case 'cancelado':
        return { 'color': '#f44336', 'font-size': '17px', 'font-weight':'600'}; // Rojo para cancelado
      case 'rechazado':
      return { 'color': '#000', 'font-size': '17px', 'font-weight':'600'}; // Rojo para cancelado
      default:
        return { 'color': '#e0e0e0', 'font-size': '17px', 'font-weight':'600' }; // Gris para estados desconocidos
    }
  }
}
