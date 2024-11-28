import { Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { trigger, transition, animate, style } from '@angular/animations';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/auth.component').then( m => m.AuthComponent), canActivate:[noAuthGuard]
    },
    {
      path: 'sign-up/select',
      loadComponent: ()=> import('./pages/auth/select-patient-specialist/select.component').then(m=>m.SelectComponent), canActivate:[noAuthGuard]
    },
    {
      path: 'sign-up/specialist',
        loadComponent: () => import('./pages/auth/sign-up-specialists/sign-up-specialist.component').then( m => m.SignUpSpecialistComponent), canActivate:[noAuthGuard]
    },
    {
      path: 'sign-up/patient',
        loadComponent: () => import('./pages/auth/sign-up-patients/sign-up-patient.component').then( m => m.SignUpPatientComponent), canActivate:[noAuthGuard]
    },
    {
      path: 'home',
      loadComponent: () => import('./pages/main/home/home.component').then(m => m.HomeComponent),
     
    },
    {
      path: 'usuarios',
      loadComponent: () => import('./secciones/usuarios/usuarios.component').then(m=>m.UsuariosComponent), canActivate: [authGuard],
      data: { role: 'administrador' },
    },
    {
      path: 'mi-perfil',
      loadComponent: () => import('./secciones/perfil/perfiles.component').then(m=>m.PerfilesComponent), canActivate: [authGuard],
    },
    {
      path: 'mis-horarios',
      loadComponent: () => import('./secciones/mis-horarios/mis-horarios.component').then(m=>m.MisHorariosComponent), canActivate: [authGuard],
      data: { role: 'especialista' },
    },
    {
      path: 'solicitar-turno',
      loadComponent: () =>
        import('./secciones/solicitar-turno/solicitar-turno.component').then((m) => m.SolicitarTurnoComponent),
      canActivate: [authGuard],
      data: { roles: ['administrador', 'paciente'] }, // Roles permitidos
    },
    {
      path: 'mis-turnos',
      loadComponent: () =>
        import('./secciones/especialista/mis-turnos/mis-turnos.component').then((m) => m.MisTurnosComponent),
      canActivate: [authGuard],
      data: { roles: ['especialista','paciente'] }, // Roles permitidos
    },
    {
      path: 'turnos',
      loadComponent: () =>
        import('./secciones/especialista/mis-turnos/mis-turnos.component').then((m) => m.MisTurnosComponent),
      canActivate: [authGuard],
      data: { roles: ['administrador'] }, // Roles permitidos
    },
    {
      path: 'pacientes',
      loadComponent: () =>
        import('./secciones/especialista/pacientes/pacientes.component').then((m) => m.PacientesComponent),
      canActivate: [authGuard],
      data: { roles: ['especialista'] }, // Roles permitidos
    },    {
      path: 'informes',
      loadComponent: () =>
        import('./secciones/informes/informes.component').then((m) => m.InformesComponent),
      canActivate: [authGuard],
      data: { roles: ['administrador'] }, // Roles permitidos
    },
    


];
