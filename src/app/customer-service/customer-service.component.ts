import { Component, OnInit } from '@angular/core';
import { DbCustomerService } from '../services/db-customer-service';
import * as firebase from 'firebase/app';
import { UserService } from '../services/user-service';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { MobileAppServices } from '../services/db-mobile-app-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})

export class CustomerServiceComponent implements OnInit {

  constructor(private router: Router, private db: DbCustomerService, private user: UserService, private af: AngularFireAuth,private mobileAppDB: MobileAppServices) { }



  ngOnInit() {

  this.user.getUserDetail().subscribe(data=> {
    console.log(data); 
  });

  const username =  this.user.getUserName();
  console.log(username);

  let customerData = this.mobileAppDB.getCustomerDetails();
  console.log(customerData);
 
};

 

}
