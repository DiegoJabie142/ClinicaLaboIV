import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router);

  // ==== Enruta a cualquier página disponible ==== 
  constructor(private snackBar: MatSnackBar) { }

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  // ==== Guardar un elemento en localstorage
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }
  // Mostrar mensaje de éxito
  showSuccess(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 7000, // 5 segundos
      panelClass: ['success-snackbar'] // Clase CSS personalizada
    });
  }

  // Mostrar mensaje de error
  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  // Mostrar mensaje de advertencia
  showWarning(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['warning-snackbar']
    });
  }
  
}
