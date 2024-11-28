import { Injectable, inject} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { UtilsService } from './utils.service';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { collection, getFirestore, setDoc } from '@angular/fire/firestore';
import { addDoc, arrayUnion, collectionGroup, getDocs, query, updateDoc, where, writeBatch } from '@firebase/firestore';
import { Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';

  type Role = 'paciente' | 'administrador' | 'especialista';

interface Horario {
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private storage: Storage, private router: Router){}

  auth = inject(Auth);
  utilsSvc = inject(UtilsService);
  firestore = getFirestore();

  // AUTENTIFICACION

  getAuth(){
    return getAuth();
  }

  async sigIn(email: string, password: string): Promise<void> {
    const auth = getAuth();
    const firestore = getFirestore();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        await signOut(auth);
        this.utilsSvc.showWarning('Por favor, confirma tu correo electrónico antes de iniciar sesión.');
        throw new Error('Correo no verificado.');
      }
  
      let role: string | null = null;
      let userDoc;
  
      userDoc = await getDoc(doc(firestore, 'especialistas', user.uid));
      if (userDoc.exists()) {
        role = 'especialista';
      } else {
        userDoc = await getDoc(doc(firestore, 'administradores', user.uid));
        if (userDoc.exists()) {
          role = 'administrador';
        } else {
          userDoc = await getDoc(doc(firestore, 'pacientes', user.uid));
          if (userDoc.exists()) {
            role = 'paciente';
          }
        }
      }
  
      if (!role) {
        await signOut(auth);
        this.utilsSvc.showError('Usuario no autorizado.');
        throw new Error('Usuario no autorizado.');
      }
  
      if (role === 'especialista' && !userDoc.data()?.['activated']) {
        await signOut(auth);
        this.utilsSvc.showError('Tu cuenta está desactivada, contacta con el administrador.');
        throw new Error('Tu cuenta está desactivada, contacta con el administrador.');
      }
  
      // Guardar el usuario en localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({ uid: user.uid, role, email: user.email})
      );
  
      // **Registrar log de ingreso**
      await this.registrarLogIngreso(user.uid, role);
  
      this.utilsSvc.showSuccess('Inicio de sesión exitoso');
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.utilsSvc.showError('Error al iniciar sesión: ' + error.message);
      } else {
        this.utilsSvc.showError('Error desconocido al iniciar sesión.');
      }
      throw error;
    }
  }


  private async registrarLogIngreso(uid: string, role: string): Promise<void> {
    const firestore = getFirestore();
    const logRef = collection(firestore, 'logs_ingresos');
  
    const logData = {
      uid,
      role,
      timestamp: new Date().toISOString(),
    };
  
    await addDoc(logRef, logData);
  }
  
  async obtenerLogs(): Promise<any[]> {
    
    const firestore = getFirestore();
    const logsRef = collection(firestore, 'logs_ingresos');
    const logsQuery = query(logsRef);
    const logs: any[] = [];
    
    try {
      const querySnapshot = await getDocs(logsQuery);
      
      // Iteramos sobre cada documento de log
      for (const doc of querySnapshot.docs) {
        const logData = doc.data();
        const userUid = logData['uid'];  // Extraemos el uid del log
        const userRole = logData['role'];  // Extraemos el uid del log
  
        // Llamamos a la función getUserByUid para obtener los datos del usuario
        const userData = await this.getUserByUidAndRole(userUid, userRole);
  
        if (userData) {
          // Añadimos el nombre, apellido y email del usuario al log
          logData['name'] = userData.name;
          logData['lastName'] = userData.lastName;
          logData['email'] = userData.email;
        }
  
        // Agregamos el log con los datos del usuario al array de logs
        logs.push(logData);
      }
      
      return logs;
    } catch (error) {
      console.error("Error al obtener los logs: ", error);
      return [];
    }
  }
  



  async getUserByUidAndRole(uid: string, role: Role): Promise<any> {
    const firestore = getFirestore();
  
    // Mapa de colecciones por rol
    const collectionsByRole: Record<Role, string> = {
      paciente: 'pacientes',
      administrador: 'administradores',
      especialista: 'especialistas',
    };
  
    // Verificar si el rol es válido
    const collectionName = collectionsByRole[role];
    
    const collectionRef = collection(firestore, collectionName);
    try {
      // Intentamos obtener el documento de la colección según el rol
      const userDoc = await getDoc(doc(collectionRef, uid));
      if (userDoc.exists()) {
        return userDoc.data();  // Devuelve los datos del usuario si existe
      }
  
      // Si no se encuentra, devuelve null
      return null;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;  // Devuelve null en caso de error
    }
  }
  
  

  
  

  
  

  async signUp(email: string, password: string) {
    const auth = getAuth();
    const currentUser = auth.currentUser; // Obtener el usuario actual (si está logueado)
  
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        // Enviar correo de verificación al nuevo usuario
        return sendEmailVerification(newUser).then(() => {
          this.utilsSvc.showSuccess('Usuario registrado. Revisa tu correo para confirmar.');
  
          // Si había un usuario autenticado previamente, volver a autenticarlo
          if (currentUser) {
            return auth.updateCurrentUser(currentUser).then(() => {
              // Redirigir a la sección 'users' de la página
              this.router.navigate(['./users']);
              return userCredential;
            });
          }
          // Si no había usuario autenticado previamente, cerrar sesión
          return signOut(auth).then(() => userCredential);
        });
      })
      .catch((error) => {
        // Manejo de errores más conciso
        const errorMessage =
          error.code === 'auth/email-already-in-use'
            ? 'Este correo electrónico ya está en uso. Por favor, utiliza otro correo.'
            : `Error al registrar el usuario: ${error.message}`;
        this.utilsSvc.showError(errorMessage);
        throw error;
      });
  }
  

  // ==== CERRAR SESIÓN
  async signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('home');
    this.utilsSvc.showSuccess('Se cerró sesión con éxito.');
  }

  // Verificar si el usuario está autenticado
  isUserLoggedIn(): boolean {
    const userInLocalStorage = localStorage.getItem('user');
    return this.auth.currentUser !== null || userInLocalStorage !== null;
  }

  // ========== STORAGAE

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(storageRef);  // Obtener URL después de subir la imagen
    });
  }

  // ========== PACIENTES

  // Método para guardar los datos del usuario en Firestore en la carpeta de 'pacientes'
  async saveUserDataAsPatient(user: any) {
    const userDocRef = doc(this.firestore, `pacientes/${user.uid}`);
    return setDoc(userDocRef, user);
  }


  // Método para guardar los datos del usuario en Firestore en la carpeta de 'pacientes'
  async saveUserDataAsAdministrator(user: any) {
    const userDocRef = doc(this.firestore, `administradores/${user.uid}`);
    return setDoc(userDocRef, user);
  }


  // Método para guardar los datos del usuario en Firestore en la carpeta de 'especialistas'
  async saveUserDataAsSpecialist(user: any) {
    const userDocRef = doc(this.firestore, `especialistas/${user.uid}`);
    return setDoc(userDocRef, user);
  }

  // Función para actualizar el campo 'activated' de un especialista
  async updateSpecialistActivation(uid: string, activated: boolean) {
    // Referencia al documento del especialista usando el uid
    const specialistRef = doc(this.firestore, 'especialistas', uid);
    // Actualización del campo 'activated'
    return updateDoc(specialistRef, {
      activated: activated
    }).then(() => {
      console.log('Estado de activación actualizado exitosamente');
    }).catch(error => {
      console.error('Error al actualizar el estado de activación:', error);
    });
  }


// Obtener los datos del paciente a partir del UID
async getPatientData(uid: string): Promise<any> {
  try {
    const patientDocRef = doc(this.firestore, `pacientes/${uid}`);
    const patientSnapshot = await getDoc(patientDocRef);

    if (patientSnapshot.exists()) {
      return patientSnapshot.data(); // Retorna los datos del documento
    } else {
      console.warn(`El paciente con UID ${uid} no existe.`);
      return null; // Si no se encuentra el documento
    }
  } catch (error) {
    console.error(`Error al obtener los datos del paciente con UID ${uid}:`, error);
    throw error; // Propaga el error para manejarlo en otros niveles
  }
}

  // Obtener solo la foto de perfil de un paciente a partir del UID
  async getPatientProfilePic(uid: string): Promise<string | null> {
    try {
      const patientDocRef = doc(this.firestore, `pacientes/${uid}`);
      const patientDoc = await getDoc(patientDocRef);

      // Verificar si el documento existe y contiene el campo 'profilePic'
      if (patientDoc.exists()) {
        return patientDoc.data()?.['profilePic'] || null;
      } else {
        console.error('No se encontró al paciente con el UID proporcionado.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
      throw error;
    }
  }
  
  // Obtener solo la foto de perfil de un paciente a partir del UID
  async getAdminProfilePic(uid: string): Promise<string | null> {
    try {
      const patientDocRef = doc(this.firestore, `administradores/${uid}`);
      const patientDoc = await getDoc(patientDocRef);

      // Verificar si el documento existe y contiene el campo 'profilePic'
      if (patientDoc.exists()) {
        return patientDoc.data()?.['profilePic'] || null;
      } else {
        console.error('No se encontró al paciente con el UID proporcionado.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
      throw error;
    }
  }
  // Obtener especialistas de Firebase
  async getEspecialistas(): Promise<any[]> {
    try {
      const especialistasRef = collection(this.firestore, 'especialistas');
      const especialistasSnapshot = await getDocs(especialistasRef);
      const especialistasList = especialistasSnapshot.docs.map((doc) => doc.data());
      return especialistasList;
    } catch (error) {
      console.error('Error al obtener los especialistas', error);
      return [];
    }
  }

    // Obtener Pacientes de Firebase
    async getPacientes(): Promise<any[]> {
      try {
        const especialistasRef = collection(this.firestore, 'pacientes');
        const especialistasSnapshot = await getDocs(especialistasRef);
        const especialistasList = especialistasSnapshot.docs.map((doc) => doc.data());
        return especialistasList;
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
        return [];
      }
    }
  // Obtener solo la foto de perfil de un paciente a partir del UID
  async getSpecialistsProfilePic(uid: string): Promise<string | null> {
    try {
      const patientDocRef = doc(this.firestore, `especialistas/${uid}`);
      const patientDoc = await getDoc(patientDocRef);

      // Verificar si el documento existe y contiene el campo 'profilePic'
      if (patientDoc.exists()) {
        return patientDoc.data()?.['profilePic'] || null;
      } else {
        console.error('No se encontró al paciente con el UID proporcionado.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
      throw error;
    }
  }

  // Función para obtener todos los pacientes desde Firestore
  async getAllPatients() {
    try {
      const db = getFirestore(); // Obtiene la instancia de Firestore
      const patientsCollection = collection(db, 'pacientes'); // La colección 'pacientes'
      const snapshot = await getDocs(patientsCollection); // Obtiene todos los documentos de la colección
      const patientsList = snapshot.docs.map(doc => doc.data()); // Mapea los documentos a un array
      return patientsList; // Devuelve el array de pacientes
    } catch (error) {
      console.error('Error al obtener los pacientes: ', error);
      throw error; // Re-lanza el error para ser manejado en el componente
    }
  }

  async getUserData(): Promise<any> {
    try {
      // Recuperar el objeto completo del localStorage
      const user = localStorage.getItem('user');
      if (!user) {
        throw new Error('Usuario no encontrado en localStorage');
      }

      // Parsear el objeto JSON
      const userData = JSON.parse(user);

      // Obtener rol y uid del objeto
      const { role, uid } = userData;
      
      if (!role || !uid) {
        throw new Error('Rol o UID no encontrados en localStorage');
      }

      // Mapeo de roles a colecciones plurales
      const roleCollectionMap: { [key: string]: string } = {
        'administrador': 'administradores',
        'especialista': 'especialistas',
        'paciente': 'pacientes'
      };

      // Obtener la colección plural correspondiente
      const roleCollection = roleCollectionMap[role];
      
      if (!roleCollection) {
        throw new Error('Rol no válido');
      }

      // Crear la referencia al documento en Firestore
      const userDocRef = doc(this.firestore, `${roleCollection}/${uid}`);
      
      // Obtener los datos del documento
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        throw new Error('El documento no existe');
      }

      // Retornar los datos del usuario
      return userDocSnap.data();
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  }

  // Función para obtener todos los especialistas desde Firestore
  async getAllSpecialists() {
    try {
      const db = getFirestore(); // Obtiene la instancia de Firestore
      const specialistsCollection = collection(db, 'especialistas'); // La colección 'especialistas'
      const snapshot = await getDocs(specialistsCollection); // Obtiene todos los documentos de la colección
      const specialistsList = snapshot.docs.map(doc => doc.data()); // Mapea los documentos a un array
      return specialistsList; // Devuelve el array de especialistas
    } catch (error) {
      console.error('Error al obtener los especialistas: ', error);
      throw error; // Re-lanza el error para ser manejado en el componente
    }
  }

  // Función para obtener todos los especialistas desde Firestore
  async getAllAdmins() {
    try {
      const db = getFirestore(); // Obtiene la instancia de Firestore
      const specialistsCollection = collection(db, 'administradores'); // La colección 'especialistas'
      const snapshot = await getDocs(specialistsCollection); // Obtiene todos los documentos de la colección
      const specialistsList = snapshot.docs.map(doc => doc.data()); // Mapea los documentos a un array
      return specialistsList; // Devuelve el array de especialistas
    } catch (error) {
      console.error('Error al obtener los especialistas: ', error);
      throw error; // Re-lanza el error para ser manejado en el componente
    }
  }

  // Obtener la URL de una imagen con base en name y dni
  async getProfilePicUrl(name: string, dni: string, imageNumber: number): Promise<string> {
    const imagePath = `profilePics/${name}_${dni}_${imageNumber}`;
    const storageRef = ref(this.storage, imagePath);  // Referencia a la imagen
    return getDownloadURL(storageRef);  // Obtén la URL de la imagen
  }

  async getSpecialties(): Promise<any[]> {
    const specialtiesRef = collection(this.firestore, 'especialidades');
    const querySnapshot = await getDocs(specialtiesRef);
    return querySnapshot.docs.map(doc => doc.data());
  }
  

  async addSpecialty(specialtyData: any): Promise<void> {
    const specialtiesRef = collection(this.firestore, 'especialidades');
    const existingSpecialties = await this.getSpecialties();
  
    // Verificar si la especialidad ya existe
    const specialtyExists = existingSpecialties.some(
      (specialty) => specialty.nombre.toLowerCase() === specialtyData.nombre.toLowerCase()
    );
  
    if (specialtyExists) {
      console.log('La especialidad ya existe en la base de datos.');
      return; // No se agrega la especialidad
    }
  
    // Agregar la especialidad si no existe
    await addDoc(specialtiesRef, specialtyData);
    console.log('Especialidad agregada exitosamente.');
  }

  async getUserType(userId: string): Promise<string | null> {
    return new Promise((resolve) => {
      // Obtener el usuario desde localStorage
      const user = localStorage.getItem('user');
      
      // Verificar si el usuario existe en localStorage y si su UID coincide
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.uid === userId) {
          resolve(parsedUser.role); // Resuelve la promesa con el rol almacenado
          return;
        }
      }
      
      // Si no se encuentra el usuario o el UID no coincide, resolver con null
      resolve(null);
    });
  } 

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0'); // Asegura formato 2 dígitos
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  


  private generateHourlyBlocks(start: string, end: string): any[] {
    const blocks = [];
    const startTime = this.parseTime(start); // Devuelve un objeto Date
    const endTime = this.parseTime(end);
  
    let current = new Date(startTime);
  
    while (current.getTime() < endTime.getTime()) {
      const next = new Date(current);
      next.setHours(current.getHours() + 1); // Incrementa en 1 hora
  
      if (next.getTime() > endTime.getTime()) break;
  
      blocks.push({
        start: this.formatTime(current), // Usa la función formatTime
        end: this.formatTime(next),
      });
  
      current = next;
    }
  
    return blocks;
  }
  
  

  
  
  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number); // Divide "HH:mm" y convierte a números
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Establece horas y minutos
    return date;
  }

  async getTurnosAdmin(): Promise<any[]> {
    try {
      const db = getFirestore();
      // Acceder a la colección 'turnos' que contiene todos los turnos
      const turnosCollectionRef = collection(db, 'turnos');
      
      // Obtener todos los documentos de la colección 'turnos'
      const turnosSnapshot = await getDocs(turnosCollectionRef);
  
      // Crear un array para almacenar los turnos
      const turnos: any[] = [];
  
      // Recorrer todos los documentos de la colección 'turnos'
      turnosSnapshot.forEach((docSnapshot) => {
        // Agregar cada turno con su id y datos a la lista de turnos
        const turnoData = docSnapshot.data();
        turnoData['id'] = docSnapshot.id; // Agregar el ID del documento
        turnos.push(turnoData);  // Añadir el turno al array
      });
  
      // Verificar si se encontraron turnos
      if (turnos.length > 0) {
        return turnos;  // Devolver todos los turnos
      } else {
        console.log('No se encontraron turnos');
        return [];  // Si no hay turnos, devolver un array vacío
      }
    } catch (error) {
      console.error('Error al obtener los turnos', error);
      throw new Error('Error al obtener los turnos');
    }
  }



  async getTurnosPaciente(pacienteId: string): Promise<any[]> {
    try {
      const db = getFirestore();
  
      // Crear referencia a la colección "turnos"
      const turnosRef = collection(db, "turnos");
  
      // Consultar los turnos filtrando por el ID del paciente
      const q = query(turnosRef, where("pacienteId", "==", pacienteId));
  
      // Ejecutar la consulta
      const querySnapshot = await getDocs(q);
  
      // Mapear los documentos obtenidos en un array
      const turnos = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Incluir el ID del documento si es necesario
        ...doc.data(),
      }));
      return turnos;
    } catch (error) {
      console.error("Error al obtener los turnos del paciente:", error);
      return []; // Retornar un array vacío en caso de error
    }
  }

  async getTurnosEspecialista(especialistaId: string): Promise<any[]> {
    try {
      const db = getFirestore();
  
      // Crear referencia a la colección "turnos"
      const turnosRef = collection(db, "turnos");
  
      // Consultar los turnos filtrando por el ID del paciente
      const q = query(turnosRef, where("especialistaId", "==", especialistaId));
  
      // Ejecutar la consulta
      const querySnapshot = await getDocs(q);
  
      // Mapear los documentos obtenidos en un array
      const turnos = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Incluir el ID del documento si es necesario
        ...doc.data(),
      }));
      return turnos;
    } catch (error) {
      console.error("Error al obtener los turnos del paciente:", error);
      return []; // Retornar un array vacío en caso de error
    }
  }
  

  

 
  async verificarTurnoDisponible(
    especialistaId: string,
    dia: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    try {
      // Formatear la fecha de '21/11/2024' a '21-11-2024'
      const [day, month, year] = dia.split('/');
      const formattedFecha = `${day}-${month}-${year}`;
  
      // Crear la referencia a la colección general de turnos
      const db = getFirestore();
      const turnosRef = collection(db, "turnos");
  
      // Consultar los turnos del especialista filtrando por ID del especialista y fecha
      const q = query(
        turnosRef,
        where("especialistaId", "==", especialistaId),
        where("fecha", "==", formattedFecha)
      );
  
      const querySnapshot = await getDocs(q);
  
      // Convertir startTime y endTime a objetos Date
      const startDate = this.convertToDate(startTime);
      const endDate = this.convertToDate(endTime);
  
      // Iterar sobre los turnos existentes y verificar si hay solapamiento
      for (const turnoDoc of querySnapshot.docs) {
        const turno = turnoDoc.data();
        const turnoStart = this.convertToDate(turno?.['startTime']);
        const turnoEnd = this.convertToDate(turno?.['endTime']);
  
        // Verificar si el nuevo turno se solapa con el turno existente
        if (startDate < turnoEnd && endDate > turnoStart) {
          return false; // El turno ya está ocupado, no está disponible
        }
      }
  
      return true; // No hay solapamiento, el turno está disponible
    } catch (error) {
      console.error("Error al verificar disponibilidad del turno:", error);
      return false; // Si ocurre un error, asumimos que el turno no está disponible
    }
  }
  
  
  async obtenerTurnosPorEspecialidad(): Promise<any> {
    const firestore = getFirestore();
    const turnosRef = collection(firestore, "turnos");
    
    try {
      const querySnapshot = await getDocs(turnosRef);
      const turnos = querySnapshot.docs.map(doc => doc.data());
      
      // Contar la cantidad de turnos por especialidad
      const especialidadesCount: { [key: string]: number } = {};
  
      turnos.forEach(turno => {
        const especialidad = turno['especialidad'];
        especialidadesCount[especialidad] = (especialidadesCount[especialidad] || 0) + 1;
      });
  
      return especialidadesCount;
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      return {};
    }
  }

  async reservarHorarioTurno(
    especialistaId: string,
    dia: string,
    horario: any,
    userId: string,
    especialidad: string
  ): Promise<void> {
    try {
      // Formatear la fecha de '21/11/2024' a '21-11-2024'
      const [day, month, year] = dia.split('/');
      const formattedFecha = `${day}-${month}-${year}`;
  
      const db = getFirestore();
  
      // Crear una referencia a la colección raíz "turnos"
      const turnosRef = collection(db, "turnos");
  
      // Generar un nuevo documento dentro de la colección "turnos"
      const turnoRef = doc(turnosRef);
  
      const turnoData = {
        especialistaId: especialistaId,
        pacienteId: userId,
        fecha: formattedFecha,
        startTime: horario.startTime,
        endTime: horario.endTime,
        especialidad: especialidad,
        estado: "pendiente", // Estado inicial // pendiente - rechazado - cancelado - realizado
        comentario: "", // Campo opcional
        encuestaPaciente: "", // Campo opcional
        calificacionPaciente: "", // Campo opcional
        resenia: "" // Campo opcional
      };
  
      await setDoc(turnoRef, turnoData);
  
      console.log("Turno reservado exitosamente");
    } catch (error) {
      console.error("Error al reservar el turno:", error);
    }
  }


  async rechazarTurno(turnoId: string, comentario: string): Promise<void> {
    try {
      const firestore = getFirestore();
      const turnoDoc = doc(firestore, `turnos/${turnoId}`);
      const turnoSnap = await getDoc(turnoDoc);
  
      if (turnoSnap.exists()) {
        const turnoData = turnoSnap.data();
  
        // Actualizar el estado del turno a "rechazado" y añadir el comentario
        await updateDoc(turnoDoc, {
          estado: 'rechazado',
          comentario: comentario
        });
  
        console.log('Turno rechazado exitosamente');
      } else {
        console.log('No se encontró el turno con el ID proporcionado');
      }
    } catch (error) {
      console.error('Error al rechazar el turno:', error);
    }
  }

  async cancelarTurno(turnoId: string, comentario: string): Promise<void> {
    try {
      const db = getFirestore();
      
      // Crear la referencia al documento del turno
      const turnoRef = doc(db, `turnos/${turnoId}`);
      
      // Obtener el documento del turno
      const turnoSnap = await getDoc(turnoRef);
      
      if (turnoSnap.exists()) {
        // Actualizar el estado del turno y agregar el comentario
        await updateDoc(turnoRef, {
          estado: 'cancelado',
          comentario: comentario
        });
        
        console.log('Turno cancelado exitosamente');
      } else {
        console.log('El turno no existe');
      }
    } catch (error) {
      console.error('Error al cancelar el turno:', error);
    }
  }
  

  async completarEncuestaHorario(turnoId: string, encuesta: string): Promise<void> {
    try {
      const firestore = getFirestore();
      
      // Referencia al documento del turno específico
      const turnoDoc = doc(firestore, `turnos/${turnoId}`);
      const turnoSnap = await getDoc(turnoDoc);
    
      if (turnoSnap.exists()) {
        const turnoData = turnoSnap.data();
    
        if (turnoData) {
          // Actualizar la encuesta del turno
          await updateDoc(turnoDoc, { encuestaPaciente: encuesta });
          console.log("Encuesta completada exitosamente");
        }
      } else {
        console.log("El turno no existe");
      }
    } catch (error) {
      console.error("Error al completar la encuesta:", error);
    }
  }
  

  async completarCalificacionTurno(turnoId: string, calificacion: string): Promise<void> {
    try {
      const firestore = getFirestore();
      
      // Referencia al documento del turno con el turnoId
      const turnoDoc = doc(firestore, `turnos/${turnoId}`);
      
      // Obtener el documento del turno
      const turnoSnap = await getDoc(turnoDoc);
    
      if (turnoSnap.exists()) {
        // Obtener los datos del turno
        const turnoData = turnoSnap.data();
        
        // Actualizar la calificación del turno
        const updatedTurnoData = {
          ...turnoData,
          calificacionPaciente: calificacion, // Actualizar la calificación
        };
  
        // Actualizar el documento del turno en Firestore
        await updateDoc(turnoDoc, updatedTurnoData);
  
        console.log('Calificación del turno completada exitosamente');
      } else {
        console.error('Turno no encontrado');
      }
    } catch (error) {
      console.error('Error al completar la calificación del turno:', error);
    }
  }

  async aceptarHorario(turnoId: string): Promise<void> {
    try {
      const firestore = getFirestore();
      const turnoDoc = doc(firestore, `turnos/${turnoId}`);
      const turnoSnap = await getDoc(turnoDoc);
  
      if (turnoSnap.exists()) {
        // Actualizar el estado del turno a 'aceptado'
        await updateDoc(turnoDoc, { estado: 'aceptado' });
        console.log(`Turno ${turnoId} aceptado exitosamente.`);
      } else {
        console.error(`El turno con ID ${turnoId} no existe.`);
      }
    } catch (error) {
      console.error("Error al aceptar el turno:", error);
    }
  }

  async finalizarHorario(
    especialistaId: string,
    turnoId: string,
    resenia: string,
    historiaClinica: any
  ): Promise<void> {
    try {
      const firestore = getFirestore();
  
      // Referencia al documento del turno específico
      const turnoDoc = doc(firestore, `turnos/${turnoId}`);
      const turnoSnap = await getDoc(turnoDoc);
  
      if (turnoSnap.exists()) {
        // Obtener los datos actuales del turno
        const turnoData = turnoSnap.data();
  
        // Actualizar los campos necesarios en el turno
        const updatedTurnoData = {
          ...turnoData,
          estado: "finalizado",
          resenia: resenia,
          historiaClinica: historiaClinica // Agregar la historia clínica dentro del turno
        };
  
        // Guardar los cambios en Firestore
        await setDoc(turnoDoc, updatedTurnoData);
  
        console.log("Turno finalizado y actualizado con la historia clínica.");
      } else {
        console.error("El turno no existe.");
      }
    } catch (error) {
      console.error("Error al finalizar el turno:", error);
    }
  }
  
  
  
  
  

  async getPacienteNombre(uid: string): Promise<string | null> {
    try {
      const pacienteDocRef = doc(this.firestore, `pacientes/${uid}`);
      const pacienteSnap = await getDoc(pacienteDocRef);

      if (pacienteSnap.exists()) {
        const pacienteData = pacienteSnap.data();
        // Devuelve el nombre, apellido y dni separados por espacio
        const nombreCompleto = `${pacienteData?.['name'] || ''} ${pacienteData?.['lastName'] || ''} ${pacienteData?.['dni'] || ''}`;
        return nombreCompleto.trim(); // Elimina posibles espacios extras si alguno de los campos está vacío
      } else {
        console.log('No se encontró el paciente con UID:', uid);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el nombre del paciente:', error);
      return null;
    }
  }

  async getEspecialistaNombre(uid: string): Promise<string | null> {
    try {
      const pacienteDocRef = doc(this.firestore, `especialistas/${uid}`);
      const pacienteSnap = await getDoc(pacienteDocRef);

      if (pacienteSnap.exists()) {
        const pacienteData = pacienteSnap.data();
        // Devuelve el nombre, apellido y dni separados por espacio
        const nombreCompleto = `${pacienteData?.['name'] || ''} ${pacienteData?.['lastName'] || ''}`;
        return nombreCompleto.trim(); // Elimina posibles espacios extras si alguno de los campos está vacío
      } else {
        console.log('No se encontró el especialista con UID:', uid);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el nombre del especialista:', error);
      return null;
    }
  }

  async getHistoriaClinica(uid: string): Promise<any[]> {
    const firestore = getFirestore();  // Usamos getFirestore() como en tu ejemplo
    const turnosRef = collection(firestore, 'turnos');  // Accedemos a la colección de 'turnos'
    
    try {
      // Consultamos todos los turnos para el paciente específico usando su ID
      const turnosSnapshot = await getDocs(query(turnosRef, where('pacienteId', '==', uid)));
      
      if (turnosSnapshot.empty) {
        return [];
      }
  
      // Array para almacenar todas las historias clínicas encontradas
      const historiasClinicas: any[] = [];
      
      // Iteramos sobre los turnos para obtener las historias clínicas y los horarios
      for (const doc of turnosSnapshot.docs) {
        const turnoData = doc.data();
        
        // Verificamos si el turno tiene datos de historia clínica
        if (turnoData['historiaClinica']) {
          // Obtenemos el nombre del especialista usando el especialistaId
          const especialistaNombre = await this.getEspecialistaNombre(turnoData['especialistaId']);
  
          // Creamos un objeto combinado con la historia clínica, los horarios, la especialidad y el nombre del especialista
          const historiaClinicaData = {
            ...turnoData['historiaClinica'], // Copiamos los datos de la historia clínica
            fecha: turnoData['fecha'] || 'Fecha no disponible',
            horaInicio: turnoData['startTime'] || 'Hora de inicio no disponible',
            horaFin: turnoData['endTime'] || 'Hora de fin no disponible',
            especialidad: turnoData['especialidad'] || 'Especialidad no disponible',
            especialista: especialistaNombre || 'Especialista no disponible',
            reseña: turnoData['resenia'] || 'Reseña no disponible'
          };
  
          // Agregamos la historia clínica al array
          historiasClinicas.push(historiaClinicaData);
        }
      }
      
      // Retornamos todas las historias clínicas encontradas
      return historiasClinicas;
  
    } catch (error: unknown) {
      // Manejo de errores más detallado
      if (error instanceof Error) {
        throw new Error(`Error al obtener la historia clínica: ${error.message}`);
      } else {
        throw new Error('Error desconocido al obtener la historia clínica.');
      }
    }
  }

  async getHistoriaClinicaConEspecialista(uid: string, uidEspecialista: string): Promise<any[]> {
    const firestore = getFirestore();  // Usamos getFirestore() como en tu ejemplo
    const turnosRef = collection(firestore, 'turnos');  // Accedemos a la colección de 'turnos'
    
    try {
      // Consultamos todos los turnos para el paciente específico usando su ID
      const turnosSnapshot = await getDocs(query(
        turnosRef, 
        where('pacienteId', '==', uid),
        where('especialistaId', '==', uidEspecialista)
      ));
      
      if (turnosSnapshot.empty) {
        return [];
      }
  
      // Array para almacenar todas las historias clínicas encontradas
      const historiasClinicas: any[] = [];
      
      // Iteramos sobre los turnos para obtener las historias clínicas y los horarios
      for (const doc of turnosSnapshot.docs) {
        const turnoData = doc.data();
        
        // Verificamos si el turno tiene datos de historia clínica
        if (turnoData['historiaClinica']) {
          // Obtenemos el nombre del especialista usando el especialistaId
          const especialistaNombre = await this.getEspecialistaNombre(turnoData['especialistaId']);
  
          // Creamos un objeto combinado con la historia clínica, los horarios, la especialidad y el nombre del especialista
          const historiaClinicaData = {
            ...turnoData['historiaClinica'], // Copiamos los datos de la historia clínica
            fecha: turnoData['fecha'] || 'Fecha no disponible',
            horaInicio: turnoData['startTime'] || 'Hora de inicio no disponible',
            horaFin: turnoData['endTime'] || 'Hora de fin no disponible',
            especialidad: turnoData['especialidad'] || 'Especialidad no disponible',
            especialista: especialistaNombre || 'Especialista no disponible',
            reseña: turnoData['resenia'] || 'Reseña no disponible'
          };
  
          // Agregamos la historia clínica al array
          historiasClinicas.push(historiaClinicaData);
        }
      }
      
      // Retornamos todas las historias clínicas encontradas
      return historiasClinicas;
  
    } catch (error: unknown) {
      // Manejo de errores más detallado
      if (error instanceof Error) {
        throw new Error(`Error al obtener la historia clínica: ${error.message}`);
      } else {
        throw new Error('Error desconocido al obtener la historia clínica.');
      }
    }
  }

  async obtenerPacientesUnicos(especialistaId: string): Promise<string[]> {
    try {
      const db = getFirestore();
      
      // Referencia a la colección "turnos"
      const turnosRef = collection(db, "turnos");
      
      // Consulta para obtener turnos del especialista con estado "finalizado"
      const q = query(
        turnosRef,
        where("especialistaId", "==", especialistaId),
        where("estado", "==", "finalizado")
      );
      
      // Ejecutar la consulta
      const querySnapshot = await getDocs(q);
      
      // Extraer los IDs de pacientes de los turnos obtenidos
      const pacienteIds = querySnapshot.docs.map(doc => doc.data()['pacienteId']);
      
      // Retornar solo IDs únicos usando un Set
      return [...new Set(pacienteIds)];
    } catch (error) {
      console.error("Error al obtener pacientes únicos:", error);
      return [];
    }
  }


  
  
  async saveEspecialistaHorario(uid: string, horarios: { [key: string]: Horario[] }): Promise<void> {
    try {
      const especialistaRef = doc(this.firestore, `especialistas/${uid}`);  // Referencia al documento del especialista
      await updateDoc(especialistaRef, { horarios });
    } catch (error) {
      console.error('Error al guardar los horarios:', error);
    }
  }
  

  // Obtener los horarios del especialista
// Obtener los horarios del especialista
async getEspecialistaHorarios(uid: string): Promise<{ [day: string]: { startTime: string; endTime: string }[] }> {
  try {
    const docRef = doc(this.firestore, 'especialistas', uid); // Referencia al documento
    const docSnap = await getDoc(docRef); // Obtener el documento

    if (docSnap.exists()) {
      const data = docSnap.data();
      const horarios = data?.['horarios']; // Suponiendo que los horarios están bajo el campo "horarios"
      
      if (horarios) {
        // Si los horarios existen, devolvemos los horarios tal como están
        return horarios;
      } else {
        console.error('No se encontraron horarios');
        return {}; // Retorna un objeto vacío si no existen horarios
      }
    } else {
      console.error('No se encontró el especialista');
      return {}; // Retorna un objeto vacío si no se encontró al especialista
    }
  } catch (error) {
    console.error('Error al obtener los horarios del especialista:', error);
    return {}; // Retorna un objeto vacío en caso de error
  }
}

async getDiasDisponiblesEspecialista(especialistaId: string): Promise<string[]> {
  const diasDisponibles: string[] = [];
  
  try {
    // Obtener los horarios del especialista
    const horarios = await this.getEspecialistaHorarios(especialistaId);
    
    // Obtener la fecha actual y la fecha dentro de 15 días
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 15);

    // Días de la semana en orden
    const diasDeLaSemana = [
      'domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'
    ];

    // Iterar por los próximos 15 días
    for (let i = 0; i <= 15; i++) {
      const diaIterado = new Date();
      diaIterado.setDate(fechaActual.getDate() + i);

      // Obtener el nombre del día correspondiente (ej. lunes, martes)
      const diaSemana = diasDeLaSemana[diaIterado.getDay()];

      // Verificar si el especialista trabaja ese día
      if (horarios[diaSemana]?.length > 0) {
        // Formatear la fecha en formato 'dd/mm/yyyy'
        const fechaString = `${diaIterado.getDate()}/${diaIterado.getMonth() + 1}/${diaIterado.getFullYear()}`;
        diasDisponibles.push(fechaString);
      }
    }

    // Ordenar los días disponibles cronológicamente
    diasDisponibles.sort((a, b) => {
      // Convertir las fechas en objetos Date
      const [dayA, monthA, yearA] = a.split('/').map(Number);
      const [dayB, monthB, yearB] = b.split('/').map(Number);

      const fechaA = new Date(yearA, monthA - 1, dayA);
      const fechaB = new Date(yearB, monthB - 1, dayB);

      return fechaA.getTime() - fechaB.getTime();
    });

  } catch (error) {
    console.error('Error al obtener los días disponibles del especialista:', error);
  }

  return diasDisponibles;
}



async getHorariosDisponiblesEspecialista(especialistaId: string, fecha: string): Promise<{ startTime: string; endTime: string }[]> {
  try {
    // Convertir la fecha '25/11/2024' a un objeto Date
    const dateParts = fecha.split('/'); // Se espera que la fecha esté en formato 'dd/mm/yyyy'
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Los meses en JS son base 0 (enero es 0)
    const year = parseInt(dateParts[2], 10);

    const dateObj = new Date(year, month, day);

    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const dayOfWeek = dateObj.getDay();

    // Mapear el número del día a su nombre
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dia = daysOfWeek[dayOfWeek];

    // Obtener los horarios del especialista para el día de la semana determinado
    const horarios = await this.getEspecialistaHorarios(especialistaId);

    // Obtener los horarios para el día específico
    const horariosDelDia = horarios[dia]; // Se espera que los días estén en minúsculas

    const bloquesHorarios: { startTime: string; endTime: string }[] = [];

    if (Array.isArray(horariosDelDia) && horariosDelDia.length > 0) {
      // Iterar sobre los horarios para dividirlos en bloques de una hora
      horariosDelDia.forEach((horario: { startTime: string, endTime: string }) => {
        const startTime = this.convertToDate(horario.startTime);
        const endTime = this.convertToDate(horario.endTime);

        // Generar bloques de una hora
        while (startTime < endTime) {
          const nextHour = new Date(startTime);
          nextHour.setHours(startTime.getHours() + 1);
          bloquesHorarios.push({
            startTime: this.formatTime(startTime),
            endTime: this.formatTime(nextHour)
          });
          startTime.setHours(startTime.getHours() + 1); // Avanzar una hora
        }
      });

      return bloquesHorarios; // Devolver los bloques de horarios
    } else {
      console.log(`No hay horarios disponibles para ${dia}.`);
      return []; // Si no hay horarios para ese día, devolvemos un array vacío
    }

  } catch (error) {
    console.error('Error al obtener los horarios disponibles del especialista:', error);
    return []; // En caso de error, devolvemos un array vacío
  }
}

// Función para convertir el tiempo en formato 'HH:mm' a un objeto Date
private convertToDate(time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}



async getHorariosFiltradosEspecialista(especialistaId: string, fecha: string, duracionTurno: number): Promise<{ startTime: string; endTime: string }[]> {
  try {
    // Convertir la fecha '25/11/2024' a un objeto Date
    const dateParts = fecha.split('/'); // Se espera que la fecha esté en formato 'dd/mm/yyyy'
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Los meses en JS son base 0 (enero es 0)
    const year = parseInt(dateParts[2], 10);

    const dateObj = new Date(year, month, day);

    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const dayOfWeek = dateObj.getDay();

    // Mapear el número del día a su nombre
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const dia = daysOfWeek[dayOfWeek];

    // Obtener los horarios del especialista para el día de la semana determinado
    const horarios = await this.getEspecialistaHorarios(especialistaId);

    // Obtener los horarios para el día específico
    const horariosDelDia = horarios[dia]; // Se espera que los días estén en minúsculas

    const bloquesHorarios: { startTime: string; endTime: string }[] = [];

    if (Array.isArray(horariosDelDia) && horariosDelDia.length > 0) {
      // Iterar sobre los horarios para dividirlos en bloques según la duración del turno
      for (const horario of horariosDelDia) {
        const startTime = this.convertToDate(horario.startTime);
        const endTime = this.convertToDate(horario.endTime);

        // Generar bloques de duración personalizada
        while (startTime < endTime) {
          const nextBlock = new Date(startTime);
          nextBlock.setMinutes(startTime.getMinutes() + duracionTurno); // Avanzar según la duración del turno

          const bloque = {
            startTime: this.formatTime(startTime),
            endTime: this.formatTime(nextBlock),
          };

          // Verificar si el bloque está disponible antes de agregarlo
          const estaDisponible = await this.verificarTurnoDisponible(
            especialistaId,
            fecha,
            bloque.startTime,
            bloque.endTime // Verificar el bloque completo: start y end
          );

          if (estaDisponible) {
            bloquesHorarios.push(bloque);
          }

          startTime.setMinutes(startTime.getMinutes() + duracionTurno); // Avanzar según la duración del turno
        }
      }

      return bloquesHorarios; // Devolver los bloques de horarios disponibles
    } else {
      console.log(`No hay horarios disponibles para ${dia}.`);
      return []; // Si no hay horarios para ese día, devolvemos un array vacío
    }
  } catch (error) {
    console.error('Error al obtener los horarios filtrados del especialista:', error);
    return []; // En caso de error, devolvemos un array vacío
  }
}

async getHorariosDisponibles(
  especialistaId: string,
  fecha: string,
  duracionTurno: number // Duración en minutos (15, 30, 45, 60)
): Promise<{ startTime: string; endTime: string }[]> {
  try {
    // Convertir la fecha '25/11/2024' a un formato legible
    const [day, month, year] = fecha.split('/');
    const formattedFecha = `${day}-${month}-${year}`;

    // 1. Obtener todos los horarios del especialista
    const horarios = await this.getEspecialistaHorarios(especialistaId);

    // 2. Determinar el día de la semana
    const dateObj = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = dateObj.getDay(); // 0=domingo, 1=lunes, etc.
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dia = daysOfWeek[dayOfWeek];

    const horariosDelDia = horarios[dia]; // Obtener horarios específicos del día

    if (!Array.isArray(horariosDelDia) || horariosDelDia.length === 0) {
      console.log(`No hay horarios configurados para el día ${dia}.`);
      return [];
    }

    // 3. Obtener turnos ya reservados para ese día
    const turnosReservados = await this.getTurnosReservados(especialistaId, formattedFecha);

    // 4. Generar bloques horarios según la duración especificada y filtrar los ocupados
    const bloquesHorarios: { startTime: string; endTime: string }[] = [];
    horariosDelDia.forEach((horario: { startTime: string; endTime: string }) => {
      const startTime = this.convertToDate(horario.startTime);
      const endTime = this.convertToDate(horario.endTime);

      while (startTime < endTime) {
        const nextSlot = new Date(startTime);
        nextSlot.setMinutes(startTime.getMinutes() + duracionTurno);

        if (nextSlot > endTime) break; // Evitar crear un bloque que exceda el horario final

        const bloque = {
          startTime: this.formatTime(startTime),
          endTime: this.formatTime(nextSlot),
        };

        // Comprobar si el bloque está ocupado
        const estaOcupado = turnosReservados.some(turno =>
          this.haySolapamiento(
            this.convertToDate(turno.startTime),
            this.convertToDate(turno.endTime),
            startTime,
            nextSlot
          )
        );

        if (!estaOcupado) {
          bloquesHorarios.push(bloque);
        }

        startTime.setMinutes(startTime.getMinutes() + duracionTurno); // Avanzar según la duración del turno
      }
    });

    return bloquesHorarios;
  } catch (error) {
    console.error('Error al obtener los horarios disponibles:', error);
    return [];
  }
}


private async getTurnosReservados(especialistaId: string, fecha: string): Promise<{ startTime: string; endTime: string }[]> {
  try {
    const turnosRef = collection(this.firestore, 'turnos');
    const q = query(
      turnosRef,
      where('especialistaId', '==', especialistaId),
      where('fecha', '==', fecha)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as { startTime: string; endTime: string });
  } catch (error) {
    console.error('Error al obtener los turnos reservados:', error);
    return [];
  }
}

private haySolapamiento(startA: Date, endA: Date, startB: Date, endB: Date): boolean {
  return startA < endB && endA > startB;
}


async getDuracionEspecialidad(especialistaId: string, especialidad: string): Promise<number> {
  try {

    // Referencia al documento del especialista
    const especialistaRef = doc(this.firestore, 'especialistas', especialistaId);

    // Obtener el documento del especialista
    const especialistaDoc = await getDoc(especialistaRef);

    if (especialistaDoc.exists()) {
      const especialistaData = especialistaDoc.data();

      if (especialistaData && especialistaData['specialtyDurations']) {
        const especialidadObj = especialistaData['specialtyDurations'].find((sp: any) => sp.especialidad === especialidad);


        return especialidadObj ? parseInt(especialidadObj.duracion) : 30;
      }
    } else {
      console.error('Documento de especialista no encontrado');
    }

    return 30; // Retorna 30 minutos por defecto si no hay datos
  } catch (error) {
    console.error('Error al obtener la duración de la especialidad:', error);
    return 30; // Retorna 30 minutos por defecto en caso de error
  }
}

async getEspecialidades(especialistaId: string): Promise<string[]> {
  try {
    // Referencia al documento del especialista
    const especialistaRef = doc(this.firestore, 'especialistas', especialistaId);

    // Obtener el documento
    const especialistaDoc = await getDoc(especialistaRef);

    if (especialistaDoc.exists()) {
      const especialistaData = especialistaDoc.data();

      if (especialistaData && especialistaData['specialities']) {
        // Devuelve el array de especialidades
        return especialistaData['specialities'];
      }
    }
    return []; // Retorna un array vacío si no hay especialidades
  } catch (error) {
    console.error('Error al obtener las especialidades del especialista:', error);
    return []; // En caso de error, devuelve un array vacío
  }
}

async getEspecialidadesConDuracion(especialistaId: string): Promise<{ especialidad: string; duracion: number }[]> {
  try {
    // Referencia al documento del especialista
    const especialistaRef = doc(this.firestore, 'especialistas', especialistaId);

    // Obtener el documento
    const especialistaDoc = await getDoc(especialistaRef);

    if (especialistaDoc.exists()) {
      const especialistaData = especialistaDoc.data();

      if (especialistaData && especialistaData['specialities']) {
        const especialidades = especialistaData['specialities'];
        
        // Crear un array con las especialidades y sus duraciones
        const especialidadConDuracion = await Promise.all(
          especialidades.map(async (especialidad: string) => {
            // Obtener la duración de la especialidad
            const duracion = await this.getDuracionEspecialidad(especialistaId, especialidad);
            return { especialidad, duracion };
          })
        );
        
        return especialidadConDuracion;
      }
    }

    return []; // Retorna un array vacío si no hay especialidades
  } catch (error) {
    console.error('Error al obtener las especialidades con duración del especialista:', error);
    return []; // En caso de error, devuelve un array vacío
  }
}

async actualizarDuracionEspecialidad(especialistaId: string, especialidad: { especialidad: string, duracion: string }): Promise<void> {
  try {
    // Referencia al documento del especialista
    const especialistaRef = doc(this.firestore, 'especialistas', especialistaId);

    // Obtener el documento del especialista
    const especialistaDoc = await getDoc(especialistaRef);

    if (especialistaDoc.exists()) {
      const especialistaData = especialistaDoc.data();

      if (especialistaData && especialistaData['specialtyDurations']) {
        // Buscar la especialidad en el array specialtyDurations
        const especialidadObj = especialistaData['specialtyDurations'].find((sp: any) => sp.especialidad === especialidad.especialidad);

        if (especialidadObj) {
          // Actualizar la duración de la especialidad, guardando la duración como string
          especialidadObj.duracion = especialidad.duracion;

          // Actualizar el documento con la nueva duración
          await updateDoc(especialistaRef, {
            'specialtyDurations': especialistaData['specialtyDurations']
          });
        }else {
          await updateDoc(especialistaRef, {
            'specialtyDurations': arrayUnion({
              especialidad: especialidad.especialidad,
              duracion: especialidad.duracion // Guardar la duración como string
            })
          });
        } 
      }else {
        await updateDoc(especialistaRef, {
          'specialtyDurations': arrayUnion({
            especialidad: especialidad.especialidad,
            duracion: especialidad.duracion // Guardar la duración como string
          })
        });
      }
    }
  } catch (error) {
    console.error('Error al actualizar la duración de la especialidad:', error);
  }
}

async  isCaptchaActivated(): Promise<boolean> {
  try {
    const db = getFirestore();
    const docRef = doc(db, 'isCaptchaActivated', 'status'); // 'status' es el ID del documento
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data['active'] ?? false; // Retornar el valor del campo 'active', o false si no existe
    } else {
      console.warn('El documento "status" no existe en la colección "isCaptchaActivated".');
      return false;
    }
  } catch (error) {
    console.error('Error al obtener el estado del captcha:', error);
    return false; // Retornar false en caso de error para mantener el flujo
  }
}

async  toggleCaptchaStatus(): Promise<void> {
  try {
    const db = getFirestore();
    const docRef = doc(db, 'isCaptchaActivated', 'status'); // 'status' es el ID del documento

    // Intentar obtener el estado actual del captcha
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentStatus = docSnap.data()['active'];

      // Cambiar el estado de 'active' al contrario
      await updateDoc(docRef, { active: !currentStatus });
      console.log(`Captcha cambiado a: ${!currentStatus ? 'activado' : 'desactivado'}`);
    } else {
      console.warn('El documento "status" no existe. Creando con valor inicial "true".');
      
      // Si el documento no existe, crearlo con valor inicial "true"
      await setDoc(docRef, { active: true });
      console.log('Captcha activado por defecto.');
    }
  } catch (error) {
    console.error('Error al alternar el estado del captcha:', error);
  }
}

async obtenerTurnosPorDia(): Promise<{ [key: string]: number }> {
  try {
    // Referencia a la colección 'turnos' en Firestore
    const turnosRef = collection(this.firestore, 'turnos');
    
    // Obtener todos los documentos de la colección
    const turnosSnapshot = await getDocs(turnosRef);
    
    // Objeto para almacenar la cantidad de turnos por día
    const turnosPorDia: { [key: string]: number } = {};

    turnosSnapshot.forEach((doc) => {
      const turnoData = doc.data();
      const fecha = turnoData['fecha']; // Asumimos que la fecha está en formato 'dd-MM-yyyy'

      // Contamos los turnos por fecha
      if (turnosPorDia[fecha]) {
        turnosPorDia[fecha]++;
      } else {
        turnosPorDia[fecha] = 1;
      }
    });

    return turnosPorDia;
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    throw error;
  }
}

async obtenerTurnosPorEspecialistaYFecha(fechaInicio: Date, fechaFin: Date): Promise<any> {
  try {
    const db = getFirestore();

    // Crear referencias a la colección "turnos"
    const turnosRef = collection(db, "turnos");

    // Crear un rango de fechas para la consulta (sin la comparación directa de fechas como strings)
    const q = query(turnosRef);
    const querySnapshot = await getDocs(q);

    // Crear un objeto para almacenar la cantidad de turnos por especialista
    const turnosPorEspecialista: { [key: string]: number } = {};

    querySnapshot.forEach((doc) => {
      const turno = doc.data();
      const fechaTurno = turno['fecha'];  // Fecha en formato 'dd-mm-aaaa'

      // Convertir la fecha almacenada en Firestore (dd-mm-aaaa) a un objeto Date
      const fechaTurnoParts = fechaTurno.split('-');
      const turnoDate = new Date(`${fechaTurnoParts[2]}-${fechaTurnoParts[1]}-${fechaTurnoParts[0]}`);  // 'aaaa-mm-dd'

      // Verificar si la fecha del turno está dentro del rango
      if (turnoDate >= fechaInicio && turnoDate <= fechaFin) {
        const especialistaId = turno['especialistaId'];

        // Contar los turnos por especialista
        if (turnosPorEspecialista[especialistaId]) {
          turnosPorEspecialista[especialistaId]++;
        } else {
          turnosPorEspecialista[especialistaId] = 1;
        }
      }
    });

    return turnosPorEspecialista;
  } catch (error) {
    console.error("Error al obtener los turnos por especialista y fecha:", error);
    throw error;
  }
}

async obtenerTurnosPorEspecialistaYFechaFinalizado(fechaInicio: Date, fechaFin: Date): Promise<any> {
  try {
    const db = getFirestore();

    // Crear referencias a la colección "turnos"
    const turnosRef = collection(db, "turnos");

    // Crear una consulta que no filtre directamente por fecha, pero puedes hacer la comparación después
    const q = query(turnosRef);
    const querySnapshot = await getDocs(q);

    // Crear un objeto para almacenar la cantidad de turnos por especialista
    const turnosPorEspecialista: { [key: string]: number } = {};

    querySnapshot.forEach((doc) => {
      const turno = doc.data();
      const fechaTurno = turno['fecha'];  // Fecha en formato 'dd-mm-aaaa'

      // Convertir la fecha almacenada en Firestore (dd-mm-aaaa) a un objeto Date
      const fechaTurnoParts = fechaTurno.split('-');
      const turnoDate = new Date(`${fechaTurnoParts[2]}-${fechaTurnoParts[1]}-${fechaTurnoParts[0]}`);  // 'aaaa-mm-dd'

      // Verificar si la fecha del turno está dentro del rango
      if (turnoDate >= fechaInicio && turnoDate <= fechaFin) {
        const especialistaId = turno['especialistaId'];
        const estadoTurno = turno['estado']; // El estado del turno

        // Verificar si el estado del turno es "realizado" (finalizado)
        if (estadoTurno === "finalizado") {
          // Contar los turnos por especialista solo si el turno está finalizado
          if (turnosPorEspecialista[especialistaId]) {
            turnosPorEspecialista[especialistaId]++;
          } else {
            turnosPorEspecialista[especialistaId] = 1;
          }
        }
      }
    });

    return turnosPorEspecialista;
  } catch (error) {
    console.error("Error al obtener los turnos por especialista y fecha:", error);
    throw error;
  }
}


}
