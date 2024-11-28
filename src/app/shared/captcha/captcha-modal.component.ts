import { Component, EventEmitter, Output } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef

@Component({
  selector: 'app-captcha-modal',
  standalone: true,
  imports: [CommonModule, RecaptchaModule], // Importa RecaptchaModule aquí
  templateUrl: './captcha-modal.component.html',
  styleUrls: ['./captcha-modal.component.scss']
})
export class CaptchaModalComponent {
  @Output() captchaResolved = new EventEmitter<boolean>(); // Emite el resultado del CAPTCHA (resuelto o no)

  captchaTitle: string = 'Por favor, resuelve este captcha'; // Título del CAPTCHA

  constructor(
    public dialogRef: MatDialogRef<CaptchaModalComponent> // Marca dialogRef como público
  ) {}

  // Método para cerrar el modal utilizando MatDialogRef
  closeModal() {
    this.dialogRef.close(); // Cierra el modal
  }

  // Lógica para resolver el CAPTCHA
  onCaptchaResolved() {
    console.log('Captcha resuelto correctamente');
    this.captchaResolved.emit(true); // Emite 'true' cuando el CAPTCHA es resuelto correctamente
    this.dialogRef.close(true); // Cierra el modal y pasa 'true' como resultado
  }
  
  onCaptchaExpired() {
    console.log('Captcha expirado');
    this.captchaResolved.emit(false); // Emite 'false' si el CAPTCHA expira
    this.dialogRef.close(false); // Cierra el modal y pasa 'false' como resultado
  }

  onConfirmCaptcha() {
    console.log('Confirmar CAPTCHA');
    this.captchaResolved.emit(true);
    this.closeModal();
  }
}
