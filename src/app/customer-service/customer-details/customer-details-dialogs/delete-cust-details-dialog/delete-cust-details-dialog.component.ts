import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';

@Component({
  selector: 'app-delete-cust-details-dialog',
  templateUrl: './delete-cust-details-dialog.component.html',
  styleUrls: ['./delete-cust-details-dialog.component.css']
})
export class DeleteCustDetailsDialogComponent implements OnInit {

  selectedCustomer = this.data['customer'];
  customer = this.selectedCustomer.username;

  

  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<DeleteCustDetailsDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  

  closeDeleteDialog() {
    this.dialogRef.close();
  }



openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000,
  });
}


  ngOnInit() {
    console.log(this.selectedCustomer);
  }

}




