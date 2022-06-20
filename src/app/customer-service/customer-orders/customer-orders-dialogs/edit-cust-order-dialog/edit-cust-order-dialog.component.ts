import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup,  FormControl, Validators, NgForm, FormBuilder, ValidationErrors  } from '@angular/forms';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-edit-cust-order-dialog',
  templateUrl: './edit-cust-order-dialog.component.html',
  styleUrls: ['./edit-cust-order-dialog.component.css']
})
export class EditCustOrderDialogComponent implements OnInit {

    editOrderForm: FormGroup;

    fragranceName = new FormControl();
    filteredOptions: Observable<string[]>;

  selectedFrag = this.data['fragranceToEdit'];
  selectedOrder = this.data['order'];
  listOfFragrances = [];
  

  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<EditCustOrderDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  

  closeEditDialog() {
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
  
    update() {
        let totalQuantity =  this.totalQuantity(this.selectedOrder);
        let totalAmount =  this.calcOrderTotal(this.selectedOrder);
        this.mobileAppDB.editOrderedFrag(this.selectedOrder,this.selectedFrag, totalAmount, totalQuantity);
        let action = ''
        let message = this.selectedFrag.fragranceName + ' has been updated successfully';
        this.openSnackBar(message,action);
        this.closeEditDialog();
      
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }

    private requireMatch(control: FormControl): ValidationErrors | null {
      const selection: any = control.value;
      console.log(selection);
      if (this.listOfFragrances && this.listOfFragrances.indexOf(selection) < 0) {
        return { requireMatch: true };
      }
      return null;
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.listOfFragrances.filter(option => option.toLowerCase().includes(filterValue));
    }

  ngOnInit() {
    this.mobileAppDB.getFrags() .subscribe(frag => {
      frag.forEach(val => {
       let fragNames = val['fragranceName']
        this.listOfFragrances.push(fragNames)
      }) 
      console.log(this.listOfFragrances);
    });

   
    this.filteredOptions = this.fragranceName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  
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



    
