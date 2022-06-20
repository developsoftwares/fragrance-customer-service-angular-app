import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatLabel, MatDialogRef, MatSnackBar} from '@angular/material';
import { Inject } from '@angular/core';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-frag-dialog',
  templateUrl: './edit-frag-dialog.component.html',
  styleUrls: ['./edit-frag-dialog.component.css']
})
export class EditFragDialogComponent implements OnInit {
  form: FormGroup;

  selectedFrag = this.data['product'];
  fragName = this.selectedFrag['fragranceName'].toUpperCase();

  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<EditFragDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  

  closeEditDialog() {
    this.dialogRef.close();
  }

    update() {
      if(this.selectedFrag['description']){
        console.log(this.selectedFrag['description']);
        this.mobileAppDB.editFrag(this.selectedFrag);
        let action = ''
        let message = this.selectedFrag.fragranceName + ' has been updated successfully';
        this.openSnackBar(message,action);
        this.closeEditDialog();
      }else {
        this.selectedFrag['description'] = '';
        console.log(this.selectedFrag);
      this.mobileAppDB.editFrag(this.selectedFrag);
      let action = '';
        let message = this.selectedFrag.fragranceName + ' has been updated successfully';
        this.openSnackBar(message,action);
        this.closeEditDialog();
      }
    }


    


    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }


  ngOnInit() {
    this.form = new FormGroup({
   });
   
  }

  

}



// <form class="form" name="regform" method="post" #registerForm="ngForm" novalidate>

// <p><strong>Sign Up</strong></p>
// <div class="form-group">
//   <label>Firstname</label>
//   <input name="firstname" type="text" class="form-control input-md" id="firstname" aria-describedby="firstname"
//     required [(ngModel)]="user.firstname" #firstname="ngModel" placeholder="Firstname">
// </div>
// <div [hidden]="firstname.valid || firstname.untouched" class="alert alert-danger">
//   Firstname is required
// </div>



// <button type="button" class="btn btn-primary btn-lg btn-block" (click)="register(registerForm)"
// [disabled]="!registerForm.form.valid">Submit</button>
// </form>
// </div>
// </div>

