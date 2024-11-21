import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSuffix',
  standalone: true
})
export class AddSuffixPipe implements PipeTransform {

  transform(value: any, key: string): string {
    // Si la clave es "altura", agregar el sufijo "cm"
    if (key === 'altura') {
      return `${value} cm`;
    }
    return value; // Si no, simplemente retorna el valor sin cambios
  }

}