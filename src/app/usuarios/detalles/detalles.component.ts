import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule, CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  
  patientData: any[] = []; // Almacena los datos de los pacientes
  specialistData: any[] = []; // Almacena los datos de los especialistas
  adminData: any[] = []; // Almacena los datos de los administradores

  isTablePatientVisible = false; // Estado para controlar si la tabla está visible
  isTableAdminVisible = false;
  isTableSpecialistVisible = false;

  
  refreshPatients() {
    this.firebaseSvc.getAllPatients().then(patients => {
      this.patientData = patients;
    }).catch(error => {
      console.error('Error al cargar pacientes:', error);
    });
  }

  refreshAdmins(){
    this.firebaseSvc.getAllAdmins().then(admins => {
      this.adminData = admins;
    }).catch(error => {
      console.error('Error al cargar especialistas:', error);
    });
  }

  refreshSpecialists(){
   this.firebaseSvc.getAllSpecialists().then(specialists => {
    this.specialistData = specialists;
  }).catch(error => {
    console.error('Error al cargar especialistas:', error);
  });
  }

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit(): void {
    this.refreshPatients();
    this.refreshSpecialists();
    this.refreshAdmins();
  }

  editActivationStatus(specialist: any) {
    // Lógica para editar el estado de activación del especialista
    console.log('Editar estado de activación para:', specialist);

    // Cambiar el estado de activación (lo invertimos, si es 'true' pasa a 'false' y viceversa)
    const newStatus = !specialist.activated;

    // Llamamos a la función de actualización de estado con el UID y el nuevo estado de activación
    this.firebaseSvc.updateSpecialistActivation(specialist.uid, newStatus)
    .then(() => {
    // Si la actualización es exitosa, se puede realizar alguna acción adicional, como actualizar la vista
    console.log('Estado de activación actualizado correctamente');
    specialist.activated = newStatus; // Actualizar el estado local del especialista en la interfaz
    })
    .catch(error => {
    // Manejo de errores en caso de fallo
    console.error('Error al actualizar el estado de activación:', error);
    });
  }

  // Función para alternar la visibilidad de la tabla
  togglePatientTable() {
    this.isTablePatientVisible = !this.isTablePatientVisible;
  }

  toggleAdminTable() {
    this.isTableAdminVisible = !this.isTableAdminVisible;
  }

  toggleSpecialistTable(){
    this.isTableSpecialistVisible = !this.isTableSpecialistVisible;
  }
}
