import { Component, OnInit } from '@angular/core';
import { DbCustomerService } from 'src/app/services/db-customer-service';
import { UserService } from 'src/app/services/user-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { Subject } from 'rxjs';
import { EditCustDetailsDialogComponent } from './customer-details-dialogs/edit-cust-details-dialog/edit-cust-details-dialog.component';
import { DeleteCustDetailsDialogComponent } from './customer-details-dialogs/delete-cust-details-dialog/delete-cust-details-dialog.component';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {


  constructor(public dialog: MatDialog, private db: AngularFireDatabase,public authService: AuthService, private user: UserService, private af: AngularFireAuth,private mobileAppDB: MobileAppServices) { }


  showSpinner = false;
  showUsers = false;
  customerDatas = [];
  custDetails = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  trackByMethod(index:number, user:any): number {
    return user.userId;
  }

  
getAllCustomers(){
  this.mobileAppDB.getCustomerDetails().subscribe(data=> {
    this.custDetails = [];
    let userArr = [];
  userArr.push(data);
  userArr.forEach(val => {
  this.customerDatas =  Object.values(val);
   this.customerDatas.forEach(details => {
     this.custDetails.push(details.userDetails);
   })
  });
  console.log(this.custDetails)
  $('#example').DataTable().destroy();
  this.dtTrigger.next();
  this.showUsers = true;
  this.showSpinner = false;
});
}

openEditCustomerDialog(customer): void {
  const dialogRef = this.dialog.open(EditCustDetailsDialogComponent, {
    width: 'auto',
    height: 'auto',
    data: {
      "customer": customer
    }
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

openDeleteCustomerDialog(customer): void {
  const dialogRef = this.dialog.open(DeleteCustDetailsDialogComponent, {
    width: 'auto',
    height: 'auto',
    data: {
      "customer": customer
    }
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}



  ngOnInit() {
    this.showSpinner = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [ [5,10, 25, 50, -1], [5,10, 25, 50, "All"] ],
      initComplete: function( settings, json ) {
        $('div.table-responsive').show();
        $('app-preloader').remove();
      }
    };

   this.getAllCustomers()
   $('div.table-responsive').hide();

  // this.mobileAppDB.getCustomerDetails().then(data => {
  //   let userArr = [];
  //   userArr.push(data.val());
  //   userArr.forEach(val => {
  //     console.log(val)
  //   this.customerDatas =  Object.values(val);
  //    console.log(this.customerDatas)
  //    this.customerDatas.forEach(details => {

  //      this.custDetails.push(details.userDetails);
       
  //      console.log(details.userDetails.address)
  //      console.log(details.orders)
  //      console.log(details.shoppingCart)
  //    })
  //   });
  //   this.showUsers = true;
  //   this.showSpinner = false;

  // });
}


ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

}


