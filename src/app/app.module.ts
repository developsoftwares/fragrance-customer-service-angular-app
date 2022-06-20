import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerServiceModule } from './customer-service/customer-service.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DispatchServicesModule } from './dispatch-services/dispatch-services.module';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    CustomerServiceModule,
    DispatchServicesModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
  ],
  exports: [
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
