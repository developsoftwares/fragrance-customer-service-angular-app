import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
// import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class DbCustomerService implements OnInit {
  product: Observable<any[]>;
  shoppingCart: Observable<any[]>;
  num;
  myId; 
  private numOfProdInCart = new BehaviorSubject(this.num);
  curNumOfCartItems = this.numOfProdInCart.asObservable();

  constructor(private db: AngularFireDatabase, private user: UserService, private af: AngularFireAuth) {

  }

  ngOnInit() {

  }



  getUsers() {
    return this.db.list('users').valueChanges();
  }

  getProducts() {
    return this.db.list('products/', ref => ref.limitToFirst(12)).valueChanges();
  }

  addProduct2Cart(product) {
    const customerUid = this.user.getUserUid();
    const id = this.db.createPushId();
    const shopCart = this.db.database.ref('users/' + customerUid + '/shoppingCart/' + id);
    product['id'] = id;
    shopCart.set(product);
  }

  submitOrder(order) {
    const customerUid = this.user.getUserUid();
    const orderId = order.orderId;
    const shopCart = this.db.database.ref('users/' + customerUid + '/orders/' + orderId);
    shopCart.set(order);
  }

  updateNoOfOrders(order, numOfOrders) {
    const customerUid = this.user.getUserUid();
    const orderId = order.orderId;
    this.db.database.ref('users/' + customerUid + '/orders/' + orderId)
      .update({ 'orderNo': numOfOrders });
  }

  getOrders() {
    const customerUid = this.user.getUserUid();
    return this.db.list('users/' + customerUid + '/orders/', ref => ref.limitToLast(10)).valueChanges();
  }

  addProduct2WishList(product) {
    const customerUid = this.user.getUserUid();
    const id = this.db.createPushId();
    const wishList = this.db.database.ref('users/' + customerUid + '/wishList/' + id);
    // product['id'] = id;
    wishList.set(product);
  }


  getShoppingCart(): Observable<any[]> {
    const customerUid = this.user.getUserUid();
    return this.db.list('users/' + customerUid + '/shoppingCart')
      .valueChanges();
  }

  updateNumShopCart() {
    const Cart = this.getShoppingCart()
      .subscribe(data => {
        this.num = data.length;
        this.numOfProdInCart.next(this.num);
      });
  }
 
  editProd4Cart(product, id) {
    const customerUid = this.user.getUserUid();
    const shopCart = this.db.database.ref('users/' + customerUid + '/shoppingCart/' + id);
    shopCart.update(product);
  }

  editProfile(userData) {
    const customerUid = this.user.getUserUid();
    const userProfile = this.db.database.ref('users/' + customerUid + '/userDetails/');
    userProfile.update(userData);
  }

  saveCartCalcutaion(product, id) {
    const customerUid = this.user.getUserUid();
    console.log(product);
    const shopCart = this.db.database.ref('users/' + customerUid + '/shoppingCart/' + id);
    shopCart.update({ 'subTotal': product['subTotal'], 'quantity': product['quantity'] });

  }

  increaseNumOfOrders(numOfOrders: number) {
    const customerUid = this.user.getUserUid();
    this.db.database.ref('users/' + customerUid + '/numberOfOrders')
      .set(numOfOrders);
  }

  getNumberOfOrders() {
    const customerUid = this.user.getUserUid();
    return this.db.object('users/' + customerUid + '/numberOfOrders').valueChanges()
      .pipe(first()).toPromise();
  }

  deleteProd4Cart(productId) {
    const customerUid = this.user.getUserUid();
    console.log(productId);
    const shopCart = this.db.database.ref('users/' + customerUid + '/shoppingCart/' + productId);
    console.log("deleted");
    shopCart.remove();
  }

  clearCart() {
    const customerUid = this.user.getUserUid();
    const shopCart = this.db.database.ref('users/' + customerUid + '/shoppingCart/');
    console.log("deleted");
    shopCart.remove();
  }

}
