import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appToggleTheme]',
  standalone: true
})
export class ToggleThemeDirective {
  @Input('appToggleTheme') modoOscuro: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.actualizarTema();
  }

  private actualizarTema() {
    if (this.modoOscuro) {
      // Cambiar fondo a oscuro
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#212121');
    } else {
      // Cambiar fondo a claro
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#4c7bb8');
    }
  }
}
