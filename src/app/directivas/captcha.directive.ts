import { Directive, Input, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { CaptchaModalComponent } from '../shared/captcha/captcha-modal.component';
import { FirebaseService } from '../services/firebase.service';

@Directive({
  selector: '[appCaptcha]',
  standalone: true
})
export class CaptchaDirective {

  role: any;
  captchaStatus: boolean = false;

  firebaseSvc = inject(FirebaseService);

  @Input('appCaptcha') captchaCallback!: () => void | Promise<void>; // Soporta funciones sincrónicas y asíncronas
  @Input() captchaTitle: string = 'Confirma que eres humano:';

  constructor(private dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.role = this.getRoleFromLocalStorage(); // Llamar para obtener el ROL
    this.captchaStatus = await this.firebaseSvc.isCaptchaActivated();
  }

  @HostListener('click') async onClick() {

    if(this.role != 'administrador' && this.captchaStatus){
      const captchaPassed = await this.validateCaptcha();

      if (captchaPassed && this.captchaCallback) {
        try {
          await this.captchaCallback();
        } catch (error) {
          console.error('Error ejecutando la función:', error);
        }
      } else {
        console.warn('Captcha fallido o función no definida');
      }
    }else{
      await this.captchaCallback();
    }

  }

  getRoleFromLocalStorage(): string | null {
    try {
      // Recuperar el objeto del usuario desde localStorage
      const user = localStorage.getItem('user');
      
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.role || null;
      }
  
      return null; // Si no existe el usuario en localStorage
    } catch (error) {
      console.error('Error al obtener el rol del usuario desde localStorage:', error);
      return null;
    }
  }
  
  private async validateCaptcha(): Promise<boolean> {

    const dialogRef = this.dialog.open(CaptchaModalComponent, {
      data: { title: this.captchaTitle } 
    });
  
    // Esperar la respuesta del modal (resuelto o expirado)
    const result = await dialogRef.afterClosed().toPromise();
  
    return result === true; 
  }
}
