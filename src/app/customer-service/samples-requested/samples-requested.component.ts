import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MobileAppServices } from 'src/app/services/db-mobile-app-services';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { sample } from 'rxjs/operators';

@Component({
  selector: 'app-samples-requested',
  templateUrl: './samples-requested.component.html',
  styleUrls: ['./samples-requested.component.css']
})
export class SamplesRequestedComponent implements OnInit {
  soldBtn = '';
  returnedBtn = '';
  information = '';
  showAllSamplesBtn = false;
  reqSamples = [];
  fragrances = [];
  showIfSample: boolean;
  showSpinner: boolean;
  showNoSearchResult: boolean;
  showNoTodayResult: boolean;
  print =  false; 
  printArr = []; 


  constructor(public dialog: MatDialog,private mobileAppDB : MobileAppServices, public router: Router,public authService: AuthService, public afAuth: AngularFireAuth,private user: UserService, private db: AngularFireDatabase) { }

  trackByMethod(index:number, sample:any): number {
    return sample.uniqueId;
  }
  

  searchDates(from,to){
    let startDate = from.toISOString();
    let endDate = to.toISOString()
    this.showNoTodayResult = false;

    console.log(startDate, endDate);
   this.querySamplesByDate(startDate, endDate)
  } 



  querySamplesByDate(from ,to){
    
    this.information = 'You are searching from '  + new Date(from).toDateString()  + ' to ' + new Date(to).toDateString() + '.';
    console.log(from, to)
    let date;
    this.showSpinner = true
    this.reqSamples = []
    const customerUid = this.user.getUserUid();
    this.db.list(this.mobileAppDB.mobileAppDBInit.ref().child('RequestedSampling/'), ref =>
    ref.orderByChild('dateOfRequest').startAt(from).endAt(to)).valueChanges()
    .subscribe(samples => {
      this.reqSamples = samples;
      console.log(samples);
      if (this.reqSamples.length >= 1) {
        this.showIfSample = true;
        this.showSpinner = false
        this.showNoSearchResult = false;
      }else {
        this.showNoSearchResult = true;
        this.showIfSample = false;
        this.showSpinner = false
      }
      this.reqSamples.forEach(eachSample => {
        let eachSampleArr = [];
        let eachDeletedSampleArr = [];
        console.log(eachSample)
          for (const key in eachSample.fragrances) {
            if (eachSample.fragrances.hasOwnProperty(key)) {
              const element = eachSample.fragrances[key];
              eachSampleArr.push(element);
            }
          }
          for (const key in eachSample.deletedSamples) {
            if (eachSample.deletedSamples.hasOwnProperty(key)) {
              const element = eachSample.deletedSamples[key];
              eachDeletedSampleArr.push(element);
            }
          }
        eachSample.fragrances = eachSampleArr;
        eachSample.deletedSamples = eachDeletedSampleArr;
        console.log(eachSample.fragrances);
        console.log(eachSampleArr);
        console.log(this.reqSamples);
      });
    })
   this.showAllSamplesBtn = true;
  }


  checkOrderStatus(sample){
    if(sample.sold){
      return "All these samples has been sold."
    }else if(sample.returned){
      return "All these samples has been returned."
  }else if(sample.sold && this.isEmpty(sample.deletedSamples)){
    return this.arrLength(sample.fragrances) + " samples was SOLD while " + this.arrLength(sample.deletedSamples) + " samples  was RETURNED."
  }else{
    return ""
  }
}


isEmpty(sizeArray: []) {
  return sizeArray.length ? true : false;
}

arrLength(sizeArray: []) {
  return sizeArray.length;
}



checkPaymentStatus (sample){
  if(sample.paymentStatus == "Not Paid"){
    return "Not Paid"
  }else if(sample.paymentStatus == "Paid"){
    return "Paid" 
}
}

  calcOrderTotal(sample) {
    return sample.fragrances.reduce(function (accum, currentVal) {
      return accum + parseInt(currentVal.samplePrice, 10);
    }, 0)
  }


  showSoldBtn(sample) {
   
    if (sample.sold) {
      this.soldBtn = 'Samples Sold';
    } else if(sample.returned) {
      this.soldBtn = 'Samples Returned';
    }else {
      this.soldBtn = ''
    }
    return this.soldBtn;
  }

  
  showReturnedBtn(sample) {
   
    if (sample.returned) {
      this.returnedBtn = 'Samples returned';
    } else {
      this.returnedBtn = '';
    }
    return this.returnedBtn;
  }



  multiplyTotalAmount(){
    let total = 0.00;
    this.printArr.forEach(sample => {
      sample.fragrances.reduce(function (accum, currentVal) {
      return total = accum + parseInt(currentVal.samplePrice, 10);
      }, 0)
    })
    return total
  }


  printMode(sampleToPrint, sample) {
  this.showIfSample = false;
  this.print = true;
  this.showSpinner = true;
  this.printArr.push(sample);
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
    this.showIfSample = true;
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



  getSamplesReqToday() {
   this.information = 'These samples were requested for today, Search older requested samples by dates.'
   const dateNow = new Date().toISOString();
  // let date = this.parseISOString(dateNow);
  // let today = this.isoFormatDMY(date)
  // console.log(today);

  this.showNoSearchResult = false;
    this.showSpinner = true
    this.reqSamples = []
    this.db.list(this.mobileAppDB.mobileAppDBInit.ref().child('RequestedSampling/'),  ref =>
    ref.orderByChild('dateOfRequest').startAt(dateNow)).valueChanges()
    .subscribe(sample => {
      this.reqSamples = sample;
      console.log(sample);
      console.log(this.reqSamples);
      if (this.reqSamples.length >= 1) {
        this.showSpinner = false;
        this.showIfSample = true;
        this.showAllSamplesBtn = false;
        this.showNoTodayResult = false;
      }else {
        this.showNoTodayResult = true;
        this.showNoSearchResult = false;
        this.showIfSample = false;
        this.showSpinner = false
      }
      this.reqSamples.forEach(eachSample => {
        let eachSampleArr = [];
        let eachDeletedSampleArr = [];
        console.log(eachSample)
          for (const key in eachSample.fragrances) {
            if (eachSample.fragrances.hasOwnProperty(key)) {
              const element = eachSample.fragrances[key];
              eachSampleArr.push(element);
            }
          }
          for (const key in eachSample.deletedSamples) {
            if (eachSample.deletedSamples.hasOwnProperty(key)) {
              const element = eachSample.deletedSamples[key];
              eachDeletedSampleArr.push(element);
            }
          }
        eachSample.fragrances = eachSampleArr;
        eachSample.deletedSamples = eachDeletedSampleArr;
        console.log(eachSample.fragrances);
      });
    })
    
  }

  ngOnInit() {
   this.getSamplesReqToday();
  }

}
