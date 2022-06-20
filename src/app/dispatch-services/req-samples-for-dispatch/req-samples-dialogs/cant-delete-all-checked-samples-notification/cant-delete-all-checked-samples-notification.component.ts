import { Component, OnInit, Inject } from '@angular/core';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteCustOrdersDialogComponent } from 'src/app/customer-service/customer-orders/customer-orders-dialogs/delete-cust-orders-dialog/delete-cust-orders-dialog.component';

@Component({
  selector: 'app-cant-delete-all-checked-samples-notification',
  templateUrl: './cant-delete-all-checked-samples-notification.component.html',
  styleUrls: ['./cant-delete-all-checked-samples-notification.component.css']
})
export class CantDeleteAllCheckedSamplesNotificationComponent implements OnInit {

  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<DeleteCustOrdersDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
     }


     closeDeleteDialog() {
      this.dialogRef.close();
    }

    dontDelete(){
      this.closeDeleteDialog()
    }

  ngOnInit() {
  }

}
