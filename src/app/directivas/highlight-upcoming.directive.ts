import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightUpcoming]',
  standalone: true
})
export class HighlightUpcomingDirective implements OnInit {
  @Input('appHighlightUpcoming') fecha!: string; // Fecha en formato dd-mm-aaaa
  @Input() diasLimite: number = 3; // Número de días para considerar una fecha como "próxima"

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.isFechaProxima(this.fecha, this.diasLimite)) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffecb3'); // Color amarillo claro
      this.renderer.setStyle(this.el.nativeElement, 'color', '#333');
    }
  }

  private isFechaProxima(fechaStr: string, diasLimite: number): boolean {
    const [day, month, year] = fechaStr.split('-').map(Number);
    const fechaTurno = new Date(year, month - 1, day);
    const fechaActual = new Date();

    // Fecha actual sin horas para comparación
    fechaActual.setHours(0, 0, 0, 0);

    const diffTime = fechaTurno.getTime() - fechaActual.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays <= diasLimite;
  }
}

