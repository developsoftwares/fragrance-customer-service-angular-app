declare var jQuery: any;
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { EditFragDialogComponent } from './fragrance-dialogs/edit-frag-dialog/edit-frag-dialog.component';
import { DeleteFragDialogComponent } from './fragrance-dialogs/delete-frag-dialog/delete-frag-dialog.component';
import { AddFragDialogComponent } from './fragrance-dialogs/add-frag-dialog/add-frag-dialog.component';
import { Subject, Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-fragrance-details',
  templateUrl: './fragrance-details.component.html',
  styleUrls: ['./fragrance-details.component.css']
})
export class FragranceDetailsComponent implements OnInit {

  myFrags: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  


  constructor(public db: AngularFireDatabase, public dialog: MatDialog,private cdRef: ChangeDetectorRef,private http: HttpClient, private mobileAppDB: MobileAppServices) { }

  trackByMethod(index:number, frag:any): number {
    return frag.uniqueID;
  }
  
  
openAddDialog(): void {
  const dialogRef = this.dialog.open(AddFragDialogComponent, {
    width: 'auto',
    height: 'auto',
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

  openEditDialog(item): void {
    const dialogRef = this.dialog.open(EditFragDialogComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        "product": item
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  openDeleteDialog(item): void {
    const dialogRef = this.dialog.open(DeleteFragDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        "product": item
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getAllFrags(){
    this.mobileAppDB.getFrags()
      .subscribe(frag => {
        this.myFrags = frag
        console.log(this.myFrags);
        $('#example').DataTable().destroy();
        this.dtTrigger.next();
      })
  }



ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [ [5,10, 25, 50, -1], [5,10, 25, 50, "All"] ],
      initComplete: function( settings, json ) {
        $('div.body').show();
        $('app-preloader').remove();
      }
    };
    this.getAllFrags();
    // this.mobileAppDB.getFrag().then((frags) => { 
      // this.dtTrigger.next();
      // this.myFrags =  Object.values(frags.val());
      //   console.log(this.myFrags);  
      // }); 
        $('div.body').hide();

    

 }

 


 ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}


}


  