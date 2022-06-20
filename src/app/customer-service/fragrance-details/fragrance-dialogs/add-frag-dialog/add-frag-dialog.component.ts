import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { Fragrance } from './add-frag-model';

@Component({
  selector: 'app-add-frag-dialog',
  templateUrl: './add-frag-dialog.component.html',
  styleUrls: ['./add-frag-dialog.component.css']
})
export class AddFragDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private mobileAppDB : MobileAppServices,public dialogRef: MatDialogRef<AddFragDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  fragModel = new Fragrance();

  

  closeAddDialog() {
    this.dialogRef.close();
  }


  addNewFrag(addForm :NgForm) {
    let fragToAdd = addForm.value;
    console.log(fragToAdd)
    this.mobileAppDB.addFrag(fragToAdd);
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


  ngOnInit() {
    this.form = new FormGroup({
   });
   
  }

}




  


  

 

   

    


    

