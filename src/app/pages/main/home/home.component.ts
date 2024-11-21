import { Component, inject, SimpleChanges } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { DetallesComponent } from '../../../usuarios/detalles/detalles.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  title = 'MyClinic';
  headerLinks: Array<{ label: string; route: string }> = [];

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  isLoggedIn:boolean = false;

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.estaLoggeado();
    this.updateHeaderLinks();
  }

  async signOut(): Promise<void> {
    console.log('Intentando cerrar sesión...');
    try {
      await this.firebaseSvc.signOut();
      console.log('Sesión cerrada exitosamente');
      this.isLoggedIn = false;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    this.updateHeaderLinks();
  }

  async estaLoggeado(): Promise<boolean> {
    return  await this.firebaseSvc.isUserLoggedIn(); // Usando Firebase como ejemplo.
  }

  updateHeaderLinks() {
    // Leer el rol desde localStorage
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;

    // Configurar los links según el rol

    if(role === 'administrador') {
      this.headerLinks = [
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Sección Usuarios', route: '/users' },
        { label: 'Configuración', route: '/admin-settings' },
      ];
    } else if (role === 'especialista') {
      this.headerLinks = [
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Mis Horarios', route: '/mis-horarios' },
      ];
    } else if (role === 'paciente') {
      this.headerLinks = [
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Mi Historial', route: '/history' },
        { label: 'Solicitar Turno', route: '/solicitar-turno' },
        { label: 'Mis turnos', route: '/mis-turnos' },
      ];
    } else {
      this.headerLinks = [
        { label: 'Iniciar Sesión', route: '/login' },
        { label: 'Registrarse', route: '/sign-up/select' }
      ];
    }
  }

  

} 
