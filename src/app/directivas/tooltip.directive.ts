import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;

  private tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative'); // Asegura que el contenedor sea relativo
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('span');
      this.renderer.appendChild(
        this.tooltipElement,
        this.renderer.createText(this.tooltipText || 'Tooltip')
      );

      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
      this.renderer.setStyle(this.tooltipElement, 'background', '#333');
      this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
      this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
      this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
      this.renderer.setStyle(this.tooltipElement, 'top', '-35px');
      this.renderer.setStyle(this.tooltipElement, 'left', '50%');
      this.renderer.setStyle(this.tooltipElement, 'transform', 'translateX(-50%)');
      this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
      this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
      this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
      this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.3s');

      // Mostrar el tooltip con un pequeño retraso
      setTimeout(() => this.renderer.setStyle(this.tooltipElement, 'opacity', '1'), 100);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
      setTimeout(() => {
        if (this.tooltipElement) {
          this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
          this.tooltipElement = null!;
        }
      }, 300); // Coincidir con la duración de la transición
    }
  }
}
