import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() titulo!: string;
  @Input() color: string = 'blue'; // Valor por defecto
}
