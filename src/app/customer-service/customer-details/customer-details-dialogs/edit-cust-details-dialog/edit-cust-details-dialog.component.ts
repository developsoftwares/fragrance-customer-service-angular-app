import { Component, OnInit, Inject } from '@angular/core';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-cust-details-dialog',
  templateUrl: './edit-cust-details-dialog.component.html',
  styleUrls: ['./edit-cust-details-dialog.component.css']
})
export class EditCustDetailsDialogComponent implements OnInit {

    selectedCustomer = this.data['customer'];
    editCustDetailsForm: FormGroup;
    user = ''; 

  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<EditCustDetailsDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  

  
    update() {
      console.log(this.selectedCustomer);
      this.mobileAppDB.editCustomer(this.selectedCustomer);
        let action = ''
        let message = this.selectedCustomer.username + ' has been updated successfully';
        this.openSnackBar(message,action);
        this.closeEditDialog();
      
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }


  ngOnInit() {
    this.user = this.selectedCustomer.username;
    console.log(this.selectedCustomer);

    this.editCustDetailsForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required,]
      }),
      email: new FormControl({value: '', disabled: true}, {validators: [Validators.required,]
      }),
      phoneNumber: new FormControl('', {validators: []
      }),
      userId: new FormControl({value: '', disabled: true}, {validators: [Validators.required,]
      }),
      state: new FormControl('', {validators: []
      }),
      city: new FormControl('', {validators: []
      }),
      street: new FormControl('', {validators: []
      }),
    });

  }

  

  closeEditDialog() {
    this.dialogRef.close();
  }


}
