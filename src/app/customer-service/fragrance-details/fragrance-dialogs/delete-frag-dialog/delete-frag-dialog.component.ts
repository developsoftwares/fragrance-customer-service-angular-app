import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';

@Component({
  selector: 'app-delete-frag-dialog',
  templateUrl: './delete-frag-dialog.component.html',
  styleUrls: ['./delete-frag-dialog.component.css']
})
export class DeleteFragDialogComponent implements OnInit {

  selectedFrag = this.data['product'];
  fragName = this.selectedFrag['fragranceName'].toUpperCase();

  constructor(private mobileAppDB: MobileAppServices,public dialogRef: MatDialogRef<DeleteFragDialogComponent>,public dialog: MatDialog,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  closeDeleteDialog() {
    this.dialogRef.close();
  }

  remove() {
      console.log(this.selectedFrag);
      this.mobileAppDB.deleteFrag(this.selectedFrag);
      let action = ''
      let message = this.selectedFrag['fragranceName']  + ' has been permanently deleted.'
      this.openSnackBar(message,action)
      console.log(this.selectedFrag + " deleted");
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
