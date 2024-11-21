import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"clinica-c51d7","appId":"1:1086495664476:web:4a23ab1bfc2939b6c2b999","storageBucket":"clinica-c51d7.appspot.com","apiKey":"AIzaSyBMGCeYcbOlXMxq6rKYBtcevVqGESigdPM","authDomain":"clinica-c51d7.firebaseapp.com","messagingSenderId":"1086495664476","measurementId":"G-RDSXGWGHQZ"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage())), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()]
};
