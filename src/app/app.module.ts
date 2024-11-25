import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,BrowserAnimationsModule, IonicModule.forRoot(), ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule,MatNativeDateModule, AppRoutingModule, HttpClientModule,IonicStorageModule.forRoot(),  AngularFireStorageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(),SQLite,SQLitePorter, provideFirebaseApp(() => initializeApp({"projectId":"mi-plaza-norte","appId":"1:992238393239:web:244e8b918bb606148016d2","storageBucket":"mi-plaza-norte.firebasestorage.app","apiKey":"AIzaSyAkg5VrEHfZ8aUFMqYNV2kM4iSq5pYVeBE","authDomain":"mi-plaza-norte.firebaseapp.com","messagingSenderId":"992238393239","measurementId":"G-37C6327PEQ"})), provideStorage(() => getStorage())],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
