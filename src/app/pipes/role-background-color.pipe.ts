import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleBackgroundColor',
  standalone: true,
})
export class RoleBackgroundColorPipe implements PipeTransform {

  transform(role: string): string {

    switch (role) {
      case 'administrador':
        return 'lightcoral';  // Rojo claro para admin
      case 'especialista':
        return 'lightgreen';  // Verde claro para user
      case 'paciente':
        return 'lightblue';   // Azul claro para guest
      default:
        return 'white';  // Blanco si el rol no coincide
    }
  }
}
