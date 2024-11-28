import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarTurnos',
  standalone: true
})
export class OrdenarTurnosPipe implements PipeTransform {
  transform(turnos: any[], fechaProp: string): any[] {
    if (!turnos || turnos.length === 0) return [];

    return turnos.sort((a, b) => {
      const [dayA, monthA, yearA] = a[fechaProp].split('-').map(Number);
      const [dayB, monthB, yearB] = b[fechaProp].split('-').map(Number);

      const fechaA = new Date(yearA, monthA - 1, dayA); // Convertir a Date
      const fechaB = new Date(yearB, monthB - 1, dayB);

      return fechaB.getTime() - fechaA.getTime(); // Orden descendente
    });
  }
}
