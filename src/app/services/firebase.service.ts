import { Injectable, inject} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { UtilsService } from './utils.service';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { collection, doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { addDoc, getDocs, updateDoc } from '@firebase/firestore';
import { Router } from '@angular/router';

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
      // Iniciar sesión con correo y contraseña
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Verificar si el correo está confirmado
      if (!user.emailVerified) {
        await signOut(auth);
        this.utilsSvc.showWarning('Por favor, confirma tu correo electrónico antes de iniciar sesión.');
        throw new Error('Correo no verificado.');
      }
  
      // Verificar el rol del usuario en las colecciones de Firestore
      let role: string | null = null;
      let userDoc;
  
      // Buscar en la colección de especialistas
      userDoc = await getDoc(doc(firestore, 'especialistas', user.uid));
      if (userDoc.exists()) {
        role = 'especialista';
        console.log('especialista');
      } else {
        // Buscar en la colección de administradores
        userDoc = await getDoc(doc(firestore, 'administradores', user.uid));
        if (userDoc.exists()) {
          role = 'administrador';
          console.log('administrador');
        } else {
          // Buscar en la colección de pacientes
          userDoc = await getDoc(doc(firestore, 'pacientes', user.uid));
          if (userDoc.exists()) {
            role = 'paciente';
            console.log('paciente');
          }
        }
      }
  
      // Si no se encuentra en ninguna colección, lanzar un error
      if (!role) {
        await signOut(auth);
        this.utilsSvc.showError('Usuario no autorizado.');
        throw new Error('Usuario no autorizado.');
      }
  
      // Si es especialista, verificar si está activado
      if (role === 'especialista' && !userDoc.data()?.['activated']) {
        await signOut(auth);
        this.utilsSvc.showError('Tu cuenta está desactivada, contacta con el administrador.');
        throw new Error('Tu cuenta está desactivada, contacta con el administrador.');
      }
  
      // Guardar el usuario en localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({ uid: user.uid, role, email: user.email })
      );
  
      this.utilsSvc.showSuccess('Inicio de sesión exitoso');
    } catch (error: unknown) {
      // Manejo del error
      if (error instanceof Error) {
        this.utilsSvc.showError('Error al iniciar sesión: ' + error.message);
      } else {
        this.utilsSvc.showError('Error desconocido al iniciar sesión.');
      }
      throw error;
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
  async getPatientData(uid: string) {
    const patientDocRef = doc(this.firestore, `pacientes/${uid}`);
    return getDoc(patientDocRef);
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
  
  

  async saveEspecialistaHorarios(uid: string, horarios: any[]) {
    try {
      // Obtener los horarios actuales del especialista
      const existingHorarios = await this.getEspecialistaHorarios(uid);
  
      // Actualizar horarios con nuevos bloques
      const updatedHorarios = [...existingHorarios];
  
      // Obtener los bloques de los horarios existentes para validación de solapamiento
      const existingBlocks = existingHorarios.map((h) => ({
        date: h.date,
        start: h.start,
        end: h.end,
      }));
  
      // Procesar los nuevos horarios
      horarios.forEach((newHorario) => {
        // Generar bloques para los nuevos horarios
        const newBlocks = this.generateHourlyBlocks(newHorario.timeRange.start, newHorario.timeRange.end);
  
        newBlocks.forEach((newBlock) => {
          // Verificar si el nuevo bloque se solapa con alguno existente
          const isOverlapping = existingBlocks.some(
            (existingBlock) =>
              existingBlock.date === newHorario.date &&
              existingBlock.start === newBlock.start &&
              existingBlock.end === newBlock.end
          );
  
          // Si se solapan, mostrar un mensaje de advertencia y no agregar el bloque
          if (isOverlapping) {
            this.utilsSvc.showWarning(
              `El horario para el día ${newHorario.date} de ${newBlock.start} a ${newBlock.end} ya está ocupado.`
            );
            throw new Error(
              `El horario para el día ${newHorario.date} de ${newBlock.start} a ${newBlock.end} ya está ocupado.`
            );
          }
  
          // Si no hay solapamiento, agregar el nuevo bloque
          updatedHorarios.push({
            date: newHorario.date,
            start: newBlock.start,
            end: newBlock.end,
            status: 'disponible',
            pacienteId: null, // Paciente asociado (null inicialmente)
            reseña: '',
            comentarios:'',
            encuesta:'',
            calificacion:'',
            fechaCreacion: new Date(),
          });
        });
      });
  
      // Guardar los horarios actualizados en Firebase
      await setDoc(doc(this.firestore, `turnos/${uid}`), { horarios: updatedHorarios }, { merge: true });
  
      this.utilsSvc.showSuccess('Horarios guardados con éxito');
    } catch (error) {
      this.utilsSvc.showError('Error al guardar horarios, una o más horas se solapan.');
      console.error(error);
    }
  }
  
  
  
  
  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number); // Divide "HH:mm" y convierte a números
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Establece horas y minutos
    return date;
  }

  // Función para obtener los horarios de un especialista
  async getEspecialistaHorarios(uid: string): Promise<any[]> {
    try {
      // Obtener referencia al documento del especialista
      const especialistaDocRef = doc(this.firestore, `turnos/${uid}`);
      
      // Obtener el documento
      const especialistaDocSnap = await getDoc(especialistaDocRef);
  
      // Verificar si el documento existe
      if (especialistaDocSnap.exists()) {
        const data = especialistaDocSnap.data();
        return data?.['horarios'] || [];  // Devolver los horarios o un array vacío si no hay datos
      } else {
        console.log('No se encontraron horarios para este especialista');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener horarios', error);
      throw new Error('Error al obtener los horarios');
    }
  }

  async getAdminHorarios(): Promise<any[]> {
    try {
      const db = getFirestore();
      // Acceder a la colección de 'turnos', que contiene los documentos de cada especialista
      const turnosCollectionRef = collection(db, 'turnos');
      
      // Obtener todos los documentos de la colección de especialistas
      const turnosSnapshot = await getDocs(turnosCollectionRef);
  
      // Filtrar los horarios correspondientes al paciente
      const horariosPaciente: any[] = [];
  
      // Recorrer cada documento de especialista
      for (const docSnapshot of turnosSnapshot.docs) {
        const especialistaData = docSnapshot.data();
        
        // Obtener el array de horarios del especialista
        const horarios: any[] = especialistaData?.['horarios'] || [];
        
        // Recorrer los horarios y verificar si el pacienteId coincide
        horarios.forEach((horario) => {
          if (horario.status != 'disponible') {
            horario.especialistaId = docSnapshot.id;  // docSnapshot.id es el UID del especialista
            horariosPaciente.push(horario);  // Agregar el horario con el especialistaId
          }
        });
      }
  
      // Verificar si se encontraron horarios
      if (horariosPaciente.length > 0) {
        return horariosPaciente;  // Devolver los horarios encontrados para el paciente
      } else {
        console.log('No se encontraron horarios para este paciente');
        return [];  // Devolver array vacío si no hay horarios
      }
    } catch (error) {
      console.error('Error al obtener los horarios', error);
      throw new Error('Error al obtener los horarios');
    }
  }
  
  async getPacienteHorarios(uid: string): Promise<any[]> {
    try {
      const db = getFirestore();
      // Acceder a la colección de 'turnos', que contiene los documentos de cada especialista
      const turnosCollectionRef = collection(db, 'turnos');
      
      // Obtener todos los documentos de la colección de especialistas
      const turnosSnapshot = await getDocs(turnosCollectionRef);
  
      // Filtrar los horarios correspondientes al paciente
      const horariosPaciente: any[] = [];
  
      // Recorrer cada documento de especialista
      for (const docSnapshot of turnosSnapshot.docs) {
        const especialistaData = docSnapshot.data();
        
        // Obtener el array de horarios del especialista
        const horarios: any[] = especialistaData?.['horarios'] || [];
        
        // Recorrer los horarios y verificar si el pacienteId coincide
        horarios.forEach((horario) => {
          if (horario.pacienteId === uid) {
            // Añadir el especialistaId al horario
            horario.especialistaId = docSnapshot.id;  // docSnapshot.id es el UID del especialista
            horariosPaciente.push(horario);  // Agregar el horario con el especialistaId
          }
        });
      }
  
      // Verificar si se encontraron horarios
      if (horariosPaciente.length > 0) {
        return horariosPaciente;  // Devolver los horarios encontrados para el paciente
      } else {
        console.log('No se encontraron horarios para este paciente');
        return [];  // Devolver array vacío si no hay horarios
      }
    } catch (error) {
      console.error('Error al obtener los horarios', error);
      throw new Error('Error al obtener los horarios');
    }
  }


  // Obtener especialidades de un especialista
  async getHorariosDisponibles(especialistaId: string): Promise<any[]> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      return horarios.filter(
        
        (horario: any) =>
          horario.status === 'disponible'
      );
    }

    return [];
  }

  async reservarHorario(especialistaId: string,horario: any,  userId: string, especialidad: string ): Promise<void> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        horarios[horarioIndex].status = 'pendiente';
        horarios[horarioIndex].especialidad = especialidad;
        horarios[horarioIndex].pacienteId = userId; // Asignar el UID del usuario actual
  
        await updateDoc(especialistaDoc, { horarios });
      }
    }
  }

  async rechazarHorario(especialistaId: string,horario: any, comentario: string): Promise<void> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        horarios[horarioIndex].status = 'rechazado';
        horarios[horarioIndex].comentario = comentario;
        await updateDoc(especialistaDoc, { horarios });
      }
    }
  }

  async cancelarHorario(especialistaId: string,horario: any, comentario: string): Promise<void> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        horarios[horarioIndex].status = 'cancelado';
        horarios[horarioIndex].comentario = comentario;
        await updateDoc(especialistaDoc, { horarios });
      }
    }
  }

  async completarEncuestaHorario(especialistaId: string,horario: any, encuesta: string): Promise<void> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        horarios[horarioIndex].encuesta = encuesta;
        await updateDoc(especialistaDoc, { horarios });
      }
    }
  }

  async completarCalificacionHorario(especialistaId: string,horario: any, calificacion: string): Promise<void> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        horarios[horarioIndex].calificacion = calificacion;
        await updateDoc(especialistaDoc, { horarios });
      }
    }
  }

  async aceptarHorario(especialistaId: string,horario: any): Promise<void> {
    const firestore = getFirestore();
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        horarios[horarioIndex].status = 'aceptado';
        await updateDoc(especialistaDoc, { horarios });
      }
    }
  }

  async finalizarHorario(especialistaId: string, horario: any, reseña: string, historiaClinica: any): Promise<void> {
    const firestore = getFirestore();
    horario.reseña = reseña;
    horario.especialistaId = especialistaId;
  
    // 1. Obtener el documento del especialista
    const especialistaDoc = doc(firestore, `turnos/${especialistaId}`);
    const especialistaSnap = await getDoc(especialistaDoc);
  
    if (especialistaSnap.exists()) {
      // 2. Buscar el horario en la lista
      const horarios = especialistaSnap.data()?.['horarios'] || [];
      const horarioIndex = horarios.findIndex(
        (h: any) => h.date === horario.date && h.start === horario.start
      );
  
      if (horarioIndex !== -1) {
        // 3. Actualizar el estado del horario y agregar la reseña
        horarios[horarioIndex].status = 'finalizado';
        horarios[horarioIndex].reseña = reseña;
  
        // 4. Actualizar el horario en Firebase
        await updateDoc(especialistaDoc, { horarios });
  
        // 5. Formatear la fecha en formato dd_mm_aaaa
        const formattedDate = horario.date.replace(/\//g, '_'); // Reemplaza las barras por guiones bajos
  
        // 6. Crear el ID para la atención usando el formato dd_mm_aaaa_horario.start_horario.end
        const atencionId = `${formattedDate}_${horario.start}_${horario.end}`;
  
        // 7. Referencia al documento de la historia clínica para el paciente
        const historiaClinicaRef = doc(firestore, `historiasclinicas/${horario.pacienteId}`);
  
        // 8. Guardar los datos de la atención directamente con el atencionId como clave
        await setDoc(historiaClinicaRef, {
          [atencionId]: {
            horarioData: horario,
            historiaClinicaData: historiaClinica
          }
        }, { merge: true });
      }
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

  async getHistoriaClinica(uid: string): Promise<any> {
    const firestore = getFirestore();  // Usamos getFirestore() como en tu ejemplo
    const historiaClinicaRef = doc(firestore, `historiasclinicas/${uid}`);  // Ruta de la historia clínica
  
    try {
      const historiaClinicaSnap = await getDoc(historiaClinicaRef);  // Obtenemos el documento de la historia clínica
      
      if (historiaClinicaSnap.exists()) {
        const historiaClinicaData = historiaClinicaSnap.data();
  
        // Si el documento existe, los datos de atenciones se encuentran directamente en el documento
        return historiaClinicaData;  // Retorna todo el contenido del documento, que incluirá los atencionId como claves
      } else {
        // Si no existe, lanzamos un error
        throw new Error('No se encontró la historia clínica para este paciente.');
      }
    } catch (error: unknown) {
      // Verificamos si el error tiene la propiedad 'message' antes de acceder
      if (error instanceof Error) {
        // Si el error es una instancia de Error, podemos acceder a 'message'
        throw new Error(`Error al obtener la historia clínica: ${error.message}`);
      } else {
        // Si el error no es una instancia de Error, lanzamos un error genérico
        throw new Error('Error desconocido al obtener la historia clínica.');
      }
    }
  }
}
