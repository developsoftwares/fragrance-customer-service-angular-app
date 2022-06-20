import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { DeleteCustOrdersDialogComponent } from 'src/app/customer-service/customer-orders/customer-orders-dialogs/delete-cust-orders-dialog/delete-cust-orders-dialog.component';

@Component({
  selector: 'app-delete-sample-dialog',
  templateUrl: './delete-sample-dialog.component.html',
  styleUrls: ['./delete-sample-dialog.component.css']
})
export class DeleteSampleDialogComponent implements OnInit {

  selectedFrag = this.data['sampleToDelete'];
  selectedSample = this.data['sample'];
  fragName = this.selectedFrag.fragranceName;
  disabled = false;
 



  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<DeleteCustOrdersDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    
  closeDeleteDialog() {
    this.dialogRef.close();
  }


    deleteSampleFrag() {
        let totalQuantity =  this.selectedSample.fragrances.length - 1;
        this.mobileAppDB.deleteSampleFrag(this.selectedSample,this.selectedFrag, totalQuantity);
        let action = ''
        let message = this.selectedFrag.fragranceName + ' has been updated successfully';
        this.openSnackBar(message,action);
        this.closeDeleteDialog();
      
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }


  ngOnInit() {
  
  }

}
