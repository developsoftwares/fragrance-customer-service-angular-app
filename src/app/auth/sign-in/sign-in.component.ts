import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private dbUser: Observable<firebase.User>;

  private userDetails: firebase.User = null;

  userId: string;
  verifying: boolean;
  user = {
    email: '',
    password: '',
  }

  
  signIn(signInForm: NgForm) { 
    this.verifying = true;
    this.authService.login(signInForm)
  }



  constructor(private atAuth: AngularFireDatabase, public authService: AuthService, public afAuth: AngularFireAuth, private router: Router) {
    // this.dbUser = afAuth.authState;
    // console.log(this.dbUser)

    // this.dbUser.subscribe(
    //   (user) => {
    //     if (user) {
    //       this.userDetails = user;
    //       this.userId = user.uid;
    //       console.log(this.userDetails);
    //       console.log(this.userId);
    //     }
    //     else {
    //       this.userDetails = null;
    //     }
    //   }
    // );
   }

  ngOnInit() {
  }

}
