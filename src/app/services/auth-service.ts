import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
// import { roLocale } from 'ngx-bootstrap';
import { UserService } from './user-service';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;

  private userDetails: firebase.User = null;
  details = {}
  userId: string;
  currentUser = firebase.auth().currentUser;
  



  signUp(registerForm: NgForm) {
    const firstname = registerForm.value.firstname.trim()
    const lastname = registerForm.value.lastname.trim()
    const email = registerForm.value.email.trim();
    const password = registerForm.value.password.trim();
    const role = registerForm.value.role.trim();

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
        console.log(userCredential);

          this.userId = userCredential.user.uid;
          console.log(this.userId);

        this.details = {
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "role": role,
        }

          firebase.database().ref('staffs/' + this.userId).set({'userDetails': this.details});

          firebase.database().ref('staffs/' + this.userId).once('value')
          .then( snapshot => {
            let details = snapshot.child("userDetails").val();
            let role = details.role;
            let userObj = snapshot.val();
            console.log(details.role);
            console.log(userObj);
    
            return role;
          })
          .then(role => {
            this.assignRouteToUser(role);
          });

          this.afAuth.auth.currentUser.updateProfile({
            displayName: firstname,
            photoURL: ''
          }).then(() => {
            console.log('DisplayName updated ' + userCredential.user.displayName)
           
          }).catch(err => console.log(err))
      })
  }
 
  

  assignRouteToUser(userRole) {
    switch (userRole) {
      case "Customer Service":
        console.log("User is a customer");
        // console.log(snapshot.val());
        this.router.navigate(['/customer-orders']);
        break;
      case "Dispatcher":
        console.log("User is a dispatcher");
        this.router.navigate(['/orders-for-dispatch']);
        break;
      default:
        console.log("I don't know what user this is");
        break;
    }
  }
  


  getIsAuth() {
    console.log(this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser;
  }

  login(registerForm: NgForm, ) {
    const email = registerForm.value.email.trim();
    const password = registerForm.value.password.trim();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value.user.uid);
        this.userId = value.user.uid;
        this.getIsAuth();
        
        firebase.database().ref('staffs/' + this.userId).once('value')
      .then( snapshot => {
        let details = snapshot.child("userDetails").val();
        let role = details.role;
        let userObj = snapshot.val();
        console.log(role);
        console.log(userObj);
        return role;
      })
      .then(role => {
        this.assignRouteToUser(role);
      });
        console.log('Nice, it worked!');
      })
  }


   resetPassword(email: string) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  
 

  signOut() {
    return this.afAuth.auth.signOut();
  }

  constructor(private atAuth: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    // this.user = afAuth.authState;

    // this.user.subscribe(
    //   (user) => {
    //     if (user) {
    //       this.userDetails = user;
    //       this.userId = user.uid;
    //       console.log(this.userDetails);
    //     }
    //     else {
    //       this.userDetails = null;
    //     }
    //   }
    // );
  }

}
