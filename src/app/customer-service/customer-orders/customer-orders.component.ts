
 import { Component, OnInit } from '@angular/core';
  //  import { DbCustomizeService } from 'src/app/db-customize-service';
  import { AngularFireDatabase } from '@angular/fire/database';
  import { AngularFireAuth } from '@angular/fire/auth';
  import { Router } from '@angular/router';
  import { UserService } from 'src/app/services/user-service';
  import { AuthService } from 'src/app/services/auth-service';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { MatDialog } from '@angular/material';
import { EditCustOrderDialogComponent } from './customer-orders-dialogs/edit-cust-order-dialog/edit-cust-order-dialog.component';
import { DeleteCustOrdersDialogComponent } from './customer-orders-dialogs/delete-cust-orders-dialog/delete-cust-orders-dialog.component';
import { AddCustOrderDialogComponent } from './customer-orders-dialogs/add-cust-order-dialog/add-cust-order-dialog.component';

  @Component({
    selector: 'app-customer-orders',
    templateUrl: './customer-orders.component.html',
    styleUrls: ['./customer-orders.component.css']
  })
  export class CustomerOrdersComponent implements OnInit {
    textBtn = 'Process Order'
    information = '';
    clicked = false;
    showAllOrdersBtn = false;
    totalAmount: number;
    orders = [];
    fragrances = [];
    totals = [];
    showIfOrder: boolean;
    showSpinner: boolean;
    showNoLoadingResult: boolean;
    showNoSearchResult: boolean;
    showNoTodayResult: boolean;
    print =  false; 
    printObj = {}; 
    printArr = []; 


  
    constructor(public dialog: MatDialog,private mobileAppDB : MobileAppServices, public router: Router,public authService: AuthService, public afAuth: AngularFireAuth,private user: UserService, private db: AngularFireDatabase) { }

    trackByMethod(index:number, order:any): number {
      return order.uniqueId;
    }
    

    searchDates(from,to){
      let startDate = from.toISOString();
      let endDate = to.toISOString()
      this.showNoTodayResult = false;
 
      console.log(startDate, endDate);
     this.queryOrdersByDate(startDate, endDate)
    } 
  

  
    queryOrdersByDate(from ,to){
      
      this.information = 'You are searching from '  + new Date(from).toDateString()  + ' to ' + new Date(to).toDateString() + '.';
      console.log(from, to)
      let date;
      this.showSpinner = true
      this.orders = []
      const customerUid = this.user.getUserUid();
      this.db.list(this.mobileAppDB.mobileAppDBInit.ref().child('Orders/'), ref =>
      ref.orderByChild('dateOfOrder').startAt(from).endAt(to)).valueChanges()
      .subscribe(order => {
        this.orders = order;
        console.log(order);
        if (this.orders.length >= 1) {
          this.showIfOrder = true;
          this.showSpinner = false
          this.showNoSearchResult = false;
        }else {
          this.showNoSearchResult = true;
          this.showIfOrder = false;
          this.showSpinner = false
        }
        this.orders.forEach(eachOrder => {
          let eachOrderArr = [];
          console.log(eachOrder)
          // eachOrder.fragrances.forEach(o => {
            for (const key in eachOrder.fragrances) {
              if (eachOrder.fragrances.hasOwnProperty(key)) {
                const element = eachOrder.fragrances[key];
                eachOrderArr.push(element);
              }
            }
          // });
          eachOrder.fragrances = eachOrderArr;
          console.log(eachOrder.fragrances);
          console.log(eachOrderArr);
          console.log(this.orders);
        });
      })
     this.showAllOrdersBtn = true;
    }


    viewAllOrders() {
      this.showSpinner = true
      this.showNoSearchResult = false;
      this.showIfOrder = true;
      this.showAllOrdersBtn = false;
      // this.showTotal();
      this.orders = [];
      this.mobileAppDB.getOrders().then((value) => {
        this.orders =  Object.values(value.val());
         console.log(this.orders);

         if (this.orders.length >= 1) {
          this.showIfOrder = true;
          this.showSpinner = false
          this.showNoLoadingResult = false;
        }else {
          this.showIfOrder = false;
          this.showNoLoadingResult = true;
          this.showSpinner = false
        }
        console.log(this.orders);

        this.orders.forEach(eachOrder => {
          let eachOrderArr = [];
          console.log(eachOrder)
          eachOrder.fragrances.forEach(o => {
            for (const key in o) {
              if (o.hasOwnProperty(key)) {
                const element = o[key];
                eachOrderArr.push(element);
              }
            }
          });
          eachOrder.fragrances = eachOrderArr;
          console.log(eachOrder.fragrances);
        });
       
      })
      this.showSpinner = true
      this.showNoSearchResult = false;
      this.showIfOrder = true;
      this.showAllOrdersBtn = false;
    }

    calcOrderSubTotal(frag) {
      return frag.price * frag.quantity;
    }

    totalQuantity(order) {
       return order.reduce(function (accum, val) {
        return accum + parseInt(val.quantity, 10);
      }, 0);
     
    }

    checkOrderStatus(order){
      if(order.attendedTo == 'attendedTo'){
        return "Processing Order.."
      }else if(order.attendedTo == 'delivered'){
        return "Delivered Order"
    }else{
      return ""
    }
  }


  checkPaymentStatus (order){
    if(order.paymentStatus == "Not Paid"){
      return "Not Paid"
    }else if(order.paymentStatus == "Paid"){
      return "Paid" 
  }
  }

    calcOrderTotal(order) {
      return order.fragrances.reduce(function (accum, currentVal) {
        return accum + parseInt(currentVal.price, 10) * parseInt(currentVal.quantity, 10)
      }, 0)
    }

  
    attendTo(order) {
      this.mobileAppDB.attendToOrder(order);
      order['attendedTo'] = "attendedTo";
      console.log(order);
    }

    showBtn(order) {
     
      if (order.attendedTo == 'attendedTo') {
        this.textBtn = 'Processing..';
      } else if(order.attendedTo == 'delivered') {
        this.textBtn = 'Delivered';
      }else if(order.attendedTo == 'returned'){
        this.textBtn = 'Order Returned';
      }else{
        this.textBtn = 'Process Order';
      }
      return this.textBtn;
    }

    

  openEditOrderDialog(frag, order): void {
    const dialogRef = this.dialog.open(EditCustOrderDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        "fragranceToEdit": frag,
        "order": order
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openDeleteOrderDialog(frag, order): void {
    const dialogRef = this.dialog.open(DeleteCustOrdersDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        "fragranceToDelete": frag,
        "order": order
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddOrderDialog(order): void {
    const dialogRef = this.dialog.open(AddCustOrderDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        "order": order
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


    multiplyTotalAmount(){
      let total = 0.00;
      this.printArr.forEach(order => {
        order.fragrances.forEach(item => {
          total += (item.quantity * item.price)
        })
      })
    return total; 
    }

    multiplyTotalQuan(){
      let multiply;
     this.printArr.forEach(val => {
      multiply = val.fragrances;
      })
        return multiply.reduce(function (accum, val) {
          return accum + parseInt(val.quantity, 10);
        }, 0);
    }


    printMode(orderToPrint, order) {
    this.showIfOrder = false;
    this.print = true;
    this.showSpinner = true;
    this.printArr.push(order);
    this.showSpinner = false;
      console.log(this.printArr);
    }

    printOrder() {
      var printButton = document.getElementById("printBtn");
      var cancelButton = document.getElementById("cancelPrintBtn");
        printButton.style.visibility = 'hidden';
        cancelButton.style.visibility = 'hidden';
        window.print();
        printButton.style.visibility = 'visible';
        cancelButton.style.visibility = 'visible';
    }

    cancelPrinting() {
      this.printArr = [];
      this.showIfOrder = true;
      this.print = false;
    }

      parseISOString(s) {
      var b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }

      isoFormatDMY(d) {  
      function pad(n) {return (n<10? '0' :  '') + n}
      return pad(d.getUTCFullYear()) + '-' + pad(d.getUTCMonth() + 1) + '-' + d.getUTCDate();
      }



    getOrdersToday() {
     this.information = 'These orders were placed today, Search older orders by dates.'
     const dateNow = new Date().toISOString();
    // let date = this.parseISOString(dateNow);
    // let today = this.isoFormatDMY(date)
    // console.log(today);

    this.showNoSearchResult = false;
      this.showSpinner = true
      this.orders = []
      this.db.list(this.mobileAppDB.mobileAppDBInit.ref().child('Orders/'),  ref =>
      ref.orderByChild('dateOfOrder').startAt(dateNow)).valueChanges()
      .subscribe(order => {
        this.orders = order;
        console.log(order);
        console.log(this.orders);
        if (this.orders.length >= 1) {
          this.showSpinner = false;
          // this.showNoSearchResult = false;
          this.showIfOrder = true;
          this.showAllOrdersBtn = false;
          this.showNoTodayResult = false;
        }else {
          this.showNoTodayResult = true;
          this.showNoSearchResult = false;
          this.showIfOrder = false;
          this.showSpinner = false
        }
        this.orders.forEach(eachOrder => {
          let eachOrderArr = [];
          console.log(eachOrder)
            for (const key in eachOrder.fragrances) {
              if (eachOrder.fragrances.hasOwnProperty(key)) {
                const element = eachOrder.fragrances[key];
                eachOrderArr.push(element);
              }
            }
          eachOrder.fragrances = eachOrderArr;
          console.log(eachOrder.fragrances);
        });
      })
    }

  

    ngOnInit() {
     this.getOrdersToday();
    }

  }