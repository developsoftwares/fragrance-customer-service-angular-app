import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';

@Component({
  selector: 'app-delete-cust-orders-dialog',
  templateUrl: './delete-cust-orders-dialog.component.html',
  styleUrls: ['./delete-cust-orders-dialog.component.css']
})
export class DeleteCustOrdersDialogComponent implements OnInit {


  selectedFrag = this.data['fragranceToDelete'];
  selectedOrder = this.data['order'];
  fragName = this.selectedFrag.fragranceName;


  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<DeleteCustOrdersDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    
  closeDeleteDialog() {
    this.dialogRef.close();
  }


  totalQuantity(selectedOrder) {
    return selectedOrder.fragrances.reduce(function (accum, val) {
     return accum + parseInt(val.quantity, 10);
   }, 0);
  
 }

 calcOrderTotal(selectedOrder) {
  return selectedOrder.fragrances.reduce(function (accum, currentVal) {
    return accum + parseInt(currentVal.price, 10) * parseInt(currentVal.quantity, 10)
  }, 0)
}


  
    deleteFrag() {
      let totalQuantity =  this.totalQuantity(this.selectedOrder) - this.selectedFrag.quantity;
      let totalAmount =  this.calcOrderTotal(this.selectedOrder) - (this.selectedFrag.price * this.selectedFrag.quantity);
        this.mobileAppDB.deleteOrderedFrag(this.selectedOrder,this.selectedFrag, totalAmount, totalQuantity);
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
