import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServiceComponent } from './customer-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FragranceDetailsComponent } from './fragrance-details/fragrance-details.component';
import { NavComponent } from '../nav/nav.component';
import {MatIconModule} from '@angular/material/icon'
import {MatBadgeModule} from '@angular/material/badge'
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { EditFragDialogComponent } from './fragrance-details/fragrance-dialogs/edit-frag-dialog/edit-frag-dialog.component';
import { DeleteFragDialogComponent } from './fragrance-details/fragrance-dialogs/delete-frag-dialog/delete-frag-dialog.component';
import { MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCardModule, MatDatepickerModule, MatExpansionPanelTitle, MatExpansionModule, MatNativeDateModule, MatAutocomplete, MatAutocompleteModule, MatOptionModule, MatSelectModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AddFragDialogComponent } from './fragrance-details/fragrance-dialogs/add-frag-dialog/add-frag-dialog.component';
import { DataTablesModule } from 'angular-datatables';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { EditCustOrderDialogComponent } from './customer-orders/customer-orders-dialogs/edit-cust-order-dialog/edit-cust-order-dialog.component';
import { DeleteCustOrdersDialogComponent } from './customer-orders/customer-orders-dialogs/delete-cust-orders-dialog/delete-cust-orders-dialog.component';
import { AddCustOrderDialogComponent } from './customer-orders/customer-orders-dialogs/add-cust-order-dialog/add-cust-order-dialog.component';
import { EditCustDetailsDialogComponent } from './customer-details/customer-details-dialogs/edit-cust-details-dialog/edit-cust-details-dialog.component';
import { DeleteCustDetailsDialogComponent } from './customer-details/customer-details-dialogs/delete-cust-details-dialog/delete-cust-details-dialog.component';
import { SamplesRequestedComponent } from './samples-requested/samples-requested.component';


@NgModule({
  declarations: [ 
    CustomerServiceComponent,
    CustomerDetailsComponent,
    FragranceDetailsComponent,
    NavComponent,
    EditFragDialogComponent,
    DeleteFragDialogComponent,
    AddFragDialogComponent,
    CustomerOrdersComponent,
    PreloaderComponent,
    EditCustOrderDialogComponent,
    DeleteCustOrdersDialogComponent,
    AddCustOrderDialogComponent,
    EditCustDetailsDialogComponent,
    DeleteCustDetailsDialogComponent,
    SamplesRequestedComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DataTablesModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MDBBootstrapModule.forRoot()
    
  ],
  entryComponents: [
    EditFragDialogComponent,
    DeleteFragDialogComponent,
    AddFragDialogComponent,
    EditCustOrderDialogComponent,
    DeleteCustOrdersDialogComponent,
    AddCustOrderDialogComponent,
    EditCustDetailsDialogComponent,
    DeleteCustDetailsDialogComponent
  ],
  exports: [
    PreloaderComponent,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DataTablesModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ]
})
export class CustomerServiceModule { 

}
