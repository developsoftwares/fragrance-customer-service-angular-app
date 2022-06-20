import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { EditCustOrderDialogComponent } from 'src/app/customer-service/customer-orders/customer-orders-dialogs/edit-cust-order-dialog/edit-cust-order-dialog.component';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-delete-orders-for-dispatch',
  templateUrl: './delete-orders-for-dispatch.component.html',
  styleUrls: ['./delete-orders-for-dispatch.component.css']
})
export class DeleteOrdersForDispatchComponent implements OnInit {

  editOrderForm: FormGroup;

  fragranceName = new FormControl();
  filteredOptions: Observable<string[]>;

  selectedFrag = this.data['fragranceToDelete'];
  selectedOrder = this.data['order'];
  listOfFragrances = [];
  unchangedSelectedFragQuantity;


constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<EditCustOrderDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any) {}


    closeEditDialog() {
    this.dialogRef.close();
    }

    totalQuantity(selectedOrder) {
    return selectedOrder.fragrances.reduce(function (accum, val) {
      if (val.quantity == null){
        val.quantity = 0;
      }
      return accum + parseInt(val.quantity, 10);
    }, 0);

    }

    calcOrderTotal(selectedOrder) {
    return selectedOrder.fragrances.reduce(function (accum, currentVal) {
    if (currentVal.quantity == null){
      currentVal.quantity = 0;
    }
    return accum + parseInt(currentVal.price, 10) * parseInt(currentVal.quantity, 10)
    }, 0)
    }



    update() {
      if(this.selectedFrag.quantity === null || 0) {

         // RUN IF THE EDITED QUANTITY IS NULL OR ZERO //

        console.log('quantity is null')
        let totalQuantity =  this.totalQuantity(this.selectedOrder);
        let totalAmount =  this.calcOrderTotal(this.selectedOrder);
        let newQuantity = this.unchangedSelectedFragQuantity;
        this.selectedFrag.quantity = this.unchangedSelectedFragQuantity;
        this.mobileAppDB.deleteOrderedFragForDispatch(this.selectedOrder,this.selectedFrag, totalAmount, totalQuantity, newQuantity);
        let action = ''
        let message = this.selectedFrag.fragranceName + ' has been updated successfully';
        this.openSnackBar(message,action);
        this.closeEditDialog();

      }else{

        // DEDUCT THE EXISTING QUANTITY FROM THE EDITED QUANTITY AND SAVE THE RESULT AS DELETED ORDERS//

        let totalQuantity =  this.totalQuantity(this.selectedOrder);
        let totalAmount =  this.calcOrderTotal(this.selectedOrder);
        let newQuantity;

        if( this.unchangedSelectedFragQuantity < this.selectedFrag.quantity) {

          // DONT RUN IF THE QUANTITY EDITED IS GREATER THAN EXISTING QUANTITY IN DATABASE //

          this.selectedFrag.quantity = this.unchangedSelectedFragQuantity
         console.log('do noting')
         let action = ''
         let message = this.selectedFrag.fragranceName + ' could not be deleted';
         this.openSnackBar(message,action);
         this.closeEditDialog();

        }else{

          // RUN IF THE QUANTITY EDITED IS LESSER THAN EXISTING QUANTITY IN DATABASE //

          newQuantity = this.unchangedSelectedFragQuantity - this.selectedFrag.quantity;
          if(newQuantity === 0){
            let action = ''
            let message = this.selectedFrag.fragranceName + ' has been updated successfully';
            this.openSnackBar(message,action);
            this.closeEditDialog();
          }else{
            this.mobileAppDB.editOrderedFragForDispatch(this.selectedOrder,this.selectedFrag, totalAmount, totalQuantity,newQuantity);
            let action = ''
            let message = this.selectedFrag.fragranceName + ' has been updated successfully';
            this.openSnackBar(message,action);
            this.closeEditDialog();

          }
        }
      }

  }


  showDeleteBtn(selectedFrag) {
    if (selectedFrag.quantity == 0) {
     return "Return Fragrance"
    } else if(selectedFrag.quantity == null) {
      return "Return Fragrance"
    }else{
      return "Update Fragrance"
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


ngOnInit() {
  this.unchangedSelectedFragQuantity = this.selectedFrag.quantity;
  console.log(this.unchangedSelectedFragQuantity);

  this.mobileAppDB.getFrags() .subscribe(frag => {
    frag.forEach(val => {
     let fragNames = val['fragranceName']
      this.listOfFragrances.push(fragNames)
    }) 
    console.log(this.listOfFragrances);
  });

 
  console.log(this.selectedOrder);

  this.editOrderForm = new FormGroup({
    fragranceName: new FormControl( {value: this.selectedFrag.fragranceName, disabled: true}, {validators: [Validators.required,]
    }),
    quantity: new FormControl('', {validators: [Validators.required,]
    }),
    bottleSize: new FormControl({value: '', disabled: true}, {validators: [Validators.required,]
    }),
    price: new FormControl({value: '', disabled: true}, Validators.required)
  });

}

}
