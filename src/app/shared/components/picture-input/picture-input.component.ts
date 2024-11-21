import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-picture-input',
  standalone: true,
  imports: [ MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './picture-input.component.html',
  styleUrl: './picture-input.component.scss'
})
export class PictureInputComponent {
  @Input() label!: string;
  @Output() fileSelected = new EventEmitter<File>(); // Emitimos solo el archivo
  @Output() fileRemoved = new EventEmitter<void>(); // Nuevo EventEmitter para la eliminación de la imagen

  fileName: string = 'Ningún archivo seleccionado';
  preview: string | null = null; // Para la vista previa de la imagen

  constructor(private sanitizer: DomSanitizer) {}

  captureFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const capturedFile = input.files ? input.files[0] : null;

    if (capturedFile) {
      this.fileName = capturedFile.name;
      this.createPreview(capturedFile);
      this.fileSelected.emit(capturedFile); // Emitimos solo el archivo, no el evento
      input.value = ''; // Limpiamos el valor del input después de capturar el archivo
    }
  }

  removeFile(): void {
    this.fileName = 'Ningún archivo seleccionado';
    this.preview = null;
    this.fileRemoved.emit(); // Emitimos el evento para notificar que se eliminó la imagen
  }

  createPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
