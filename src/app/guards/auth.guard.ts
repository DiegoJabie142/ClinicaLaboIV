import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  const user = localStorage.getItem('user');

 return new Promise((resolve) => {
    firebaseSvc.getAuth().onAuthStateChanged((auth) => {
      if (auth && user) {
        const userId = auth.uid;

        // Obtener tipo de usuario desde Firebase
        firebaseSvc.getUserType(userId).then((userType) => {
          if (!userType) {
            resolve(false);
            return;
          }

          // Validar el acceso según la lista de roles permitidos
          const allowedRoles = route.data?.['roles'] as string[]; // Lista de roles permitidos en las rutas
          if (allowedRoles && !allowedRoles.includes(userType)) {
            resolve(false);
          } else {
            resolve(true); // Usuario autorizado
          }
        });
      } else {
        firebaseSvc.signOut();
        resolve(false);
      }
    });
  });
};
