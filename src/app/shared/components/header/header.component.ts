import { Component, inject, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';

interface Link {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() back!: boolean;
  @Input() whereToBack!: string;
  links: Link[] = [];
  @Input() tipoUsuario: string = '';

  firebaseSvc = inject(FirebaseService);

  isLoggedIn:boolean = false;

  constructor(private router: Router) { 

  }

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
  
  updateHeaderLinks(){
    const user = localStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;

    // Configurar los links según el rol
    if(role === 'administrador') {
      this.links = [
        { label: 'Home', route: '/home' },
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Sección Usuarios', route: '/users' },
        { label: 'Turnos', route: '/mis-turnos' },
        { label: 'Solicitar Turno', route: '/solicitar-turno' },
      ];
    } else if (role === 'especialista') {
      this.links = [
        { label: 'Home', route: '/home' },
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Mis Horarios', route: '/mis-horarios' },
        { label: 'Mis Turnos', route: '/mis-turnos' },
      ];
    } else if (role === 'paciente') {
      this.links = [
        { label: 'Home', route: '/home' },
        { label: 'Mi Perfil', route: '/mi-perfil' },
        { label: 'Solicitar turno', route: '/solicitar-turno' },
        { label: 'Mis Turnos', route: '/mis-turnos' },
      ];
    } else {
      this.links = [
        { label: 'Home', route: '/home' },
        { label: 'Iniciar Sesión', route: '/login' },
        { label: 'Registrarse', route: '/sign-up/select' }
      ];
    }
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
