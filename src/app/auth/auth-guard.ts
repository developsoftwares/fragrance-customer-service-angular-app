import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';

@Injectable()

export class AuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];  
    route: ActivatedRouteSnapshot;

    constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router) {}



    isLoggedIn() {
          return this.afAuth.authState.pipe(first()).toPromise();
        }
      
        async getUser() {
          const user = await this.isLoggedIn();
          if (user) {
            return user;
          } else {
            return user;
          }
        }
      
        canActivate(): Promise<boolean> | boolean {
          return this.getUser()
            .then(user => {
              return !!user;
            })
            .then(result => {
              if (!result) {
                this.router.navigate(['sign-in']);
                return result;
              } else {
                return result;
              }
            });
        } 

}
