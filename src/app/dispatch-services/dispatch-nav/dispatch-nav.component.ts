import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dispatch-nav',
  templateUrl: './dispatch-nav.component.html',
  styleUrls: ['./dispatch-nav.component.css']
})
export class DispatchNavComponent implements OnInit {

  title = 'Dispatch Platform';


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
