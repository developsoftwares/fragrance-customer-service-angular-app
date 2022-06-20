import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})



export class NavComponent implements OnInit {
  title = 'Customer Service Platform';
  cart = [];
  numOfCart: number; 


  toggleMenu = false;
  onToggleMenu () {
    this.toggleMenu = !this.toggleMenu;
  }


  
  constructor(private user: UserService,private router: Router, public authService: AuthService, public afAuth: AngularFireAuth) { }


  logout() {
    this.authService.signOut();
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    });
    console.log('logged Out');
    this.router.navigate(['/sign-in']);
  }


  ngOnInit() {
   
  }

}
