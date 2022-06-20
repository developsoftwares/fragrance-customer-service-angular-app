import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { DeleteCustOrdersDialogComponent } from 'src/app/customer-service/customer-orders/customer-orders-dialogs/delete-cust-orders-dialog/delete-cust-orders-dialog.component';

@Component({
  selector: 'app-delete-checked-samples-notification',
  templateUrl: './delete-checked-samples-notification.component.html',
  styleUrls: ['./delete-checked-samples-notification.component.css']
})
export class DeleteCheckedSamplesNotificationComponent implements OnInit {

  checkedFrags = this.data['checkedFrags'];
  selectedSample = this.data['selectedSample'];
  canceled = 'canceled'
  ok = 'ok'


  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<DeleteCustOrdersDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    
  closeDeleteDialog() {
  this.dialogRef.close('canceled');
  }

    deleteMarkedSamples(){
    for (let i = 0; i < this.checkedFrags.length; i++) {
      const sampleToDelete = this.checkedFrags[i];
      let totalQuantity =  this.selectedSample.fragrances.length - this.checkedFrags.length;
      this.mobileAppDB.deleteSampleFrag(this.selectedSample,sampleToDelete, totalQuantity)
    }
    this.dialogRef.close('deleted');
}



  ngOnInit() {
  }

}
