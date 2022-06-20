import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList }
  from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {



  constructor(private atAuth: AngularFireDatabase, public authService: AuthService, public afAuth: AngularFireAuth, private router: Router) {

  }


  
  roles = ['Customer Service','Dispatcher'];

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  }


  register(registerForm: NgForm) {
    console.log(this.user.firstname),
    console.log(this.user.lastname),
    console.log(this.user.email),
    console.log(this.user.password),
    console.log(this.user.role)
    this.authService.signUp(registerForm)
  }




  ngOnInit() {
  }

}
