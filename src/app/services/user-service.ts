import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUid = 0;
  userName;

  constructor(private _auth: AngularFireAuth,private _db: AngularFireDatabase) {

  }

  // Get userName
  getUserName() {
    let userName =  this._auth.auth.currentUser.displayName;
    console.log(userName)
    return userName;   
  }
  

  // Get currently logged in user id
  getUserUid() {
    if (this.userUid === 0) {
      var user = this._auth.auth.currentUser;
      console.log(user.uid)
      return this._auth.auth.currentUser.uid;
    } else {
      console.log(this.userUid);
      console.log('i was set by service');
      return this.userUid;
      
    }
  }
 

  // setUid(uid) {
  //   this.userUid = uid;
  //   console.log(this.userUid)
  // }

  // Get user Details
  getUserDetail() {
    const userUid = this.getUserUid();
    return this._db.object('users/' + userUid + '/userDetails/')
      .valueChanges();
  }
  
}

