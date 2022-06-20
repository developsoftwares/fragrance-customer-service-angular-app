import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, Validators, NgForm, FormControlName } from '@angular/forms';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Fragrance } from './add-cust-order-model';

@Component({
  selector: 'app-add-cust-order-dialog',
  templateUrl: './add-cust-order-dialog.component.html',
  styleUrls: ['./add-cust-order-dialog.component.css']
})
export class AddCustOrderDialogComponent implements OnInit {

  addOrderForm: FormGroup;

  fragModel = new Fragrance();

  fragranceName = new FormControl();
  filteredOptions: Observable<string[]>;

  selectedOrder = this.data['order'];
  fragObj = {};
  price;
  listOfFragranceNames = [];
  listOfFragranceDetails = [];


constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<AddCustOrderDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any) {}


closeAddDialog() {
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


add(addOrderForm) {
  let fragToAdd = addOrderForm.getRawValue();
  let totalQuantity =  this.totalQuantity(this.selectedOrder) + fragToAdd.quantity;
  let totalAmount =  this.calcOrderTotal(this.selectedOrder) + (fragToAdd.price * fragToAdd.quantity);
  console.log(totalQuantity)
  console.log(totalAmount)
  this.mobileAppDB.addNewOrderedFrag(this.selectedOrder, fragToAdd, totalAmount, totalQuantity);
  let action = '';
    let message = fragToAdd.fragranceName + ' has been added successfully';
    this.openSnackBar(message,action);
    this.closeAddDialog();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private requireMatch(control: FormControl): ValidationErrors | null {

    const selection: any = control.value;
    console.log(selection);
    console.log(selection);
    if (this.listOfFragranceNames && this.listOfFragranceNames.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return null;
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfFragranceNames.filter(option => option.toLowerCase().includes(filterValue));
  }



  valueChange(fragSize, fragName) {
    this.setPrice(fragSize, fragName)
  }

  
  setPrice(fragSize, fragranceName) {
    let fragDetail;

    for (let index = 0; index < this.listOfFragranceDetails.length; index++) {
      fragDetail = this.listOfFragranceDetails[index];

      if(fragranceName === fragDetail.fragranceName) {
        console.log(fragDetail);
    switch (fragSize) {
      case 'Sample Size':
        this.price = fragDetail.samplePrice;
        break;
      case 'Medium Size':
        this.price = fragDetail.mediumSizePrice;
        break;
      case 'Big Size':
        this.price = fragDetail.bigSizePrice;
        break;
      case 'Combo Size':
        this.price = fragDetail.comboSizePrice;
        break;
      case 'I LOVE IT Size':
        this.price = fragDetail.iLoveItSizePrice;
        break;  
    }
      }
 }
  }


ngOnInit() {

  this.mobileAppDB.getFrags() .subscribe(frag => {
    frag.forEach(fragDetails => {
      this.listOfFragranceDetails.push(fragDetails);
      let fragNames = fragDetails['fragranceName']
      this.listOfFragranceNames.push(fragNames);
    }) 
    console.log(this.listOfFragranceNames);
    console.log(this.listOfFragranceDetails);
  });

 
  this.filteredOptions = this.fragranceName.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  console.log(this.selectedOrder);

  

  this.addOrderForm = new FormGroup({    
    fragranceName: new FormControl('', {validators: [Validators.required, this.requireMatch.bind(this),]
    }),
    quantity: new FormControl('', {validators: [Validators.required,]
    }),
    bottleSize: new FormControl('', {validators: [Validators.required,]
    }),
    price: new FormControl({value: '', disabled: true}, {validators: [Validators.required,]
    }),
  });


} 


}
