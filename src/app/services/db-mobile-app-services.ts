import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { ChildActivationEnd } from '@angular/router';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class MobileAppServices {

  

  constructor(private db: AngularFireDatabase,private _auth: AngularFireAuth,private _db: AngularFireDatabase) {}


  customerMobileAppConfig = {
    projectId: 'percentmobileapp',
    appId: '1:358099435348:android:2edf94d229c24ab42852c1',
    apiKey: 'AIzaSyB7iS_y5BJlIo_rMSy_kAsqRPzYPQGcwUA',
    messagingSenderId: "358099435348",
    databaseURL: "https://percentmobileapp.firebaseio.com",
    storageBucket: "percentmobileapp.appspot.com",
  }  

  customerMobileApp = firebase.initializeApp(this.customerMobileAppConfig, 'customerMobileApp')
  mobileAppDBInit = firebase.database(this.customerMobileApp); 


  

  getFrags(){
  return this.db.list(this.mobileAppDBInit.ref().child('listOfFragrance/')).valueChanges()
  }


  getOrders(){
    return this.mobileAppDBInit.ref('Orders').once('value', function (snapshot) {
      snapshot.forEach(childSnapshot => childSnapshot.val());
    })
  }

  addFrag(frag) {
    let fragName = frag.fragranceName.split('.').join("");
    frag.uniqueID = frag.fragranceName.replace(/[\. ,:-]+/g, "").toLowerCase();
    const fragToAdd =  this.mobileAppDBInit.ref('listOfFragrance/' + fragName);
    fragToAdd.set(frag)
  }

  deleteFrag(frag) {
    let fragName = frag.fragranceName;
    const fragToDelete =  this.mobileAppDBInit.ref('listOfFragrance/' + fragName);
    fragToDelete.remove();
  }

  editFrag(frag) {
    let fragName = frag.fragranceName.split('.').join("");
    const fragToEdit =  this.mobileAppDBInit.ref('listOfFragrance/' + fragName);
    fragToEdit.update({
     'fragranceName': frag['fragranceName'], 
     'description': frag['description'],
     'designer': frag['designer'], 
     'category': frag['category'],
     'wholeSellerPrice': frag['wholeSellerPrice'],
     'bigSizePrice': frag['bigSizePrice'],
     'endUserPrice': frag['endUserPrice'],
     'mediumSizePrice': frag['mediumSizePrice'],
     'samplePrice': frag['samplePrice'],
     'genderType': frag['genderType'],
     'scentGroup': frag['scentGroup'],
    });
  }

  isEmpty(sizeArray: []) {
    return sizeArray.length ? true : false;
  }

   async attendToOrder(order) {
      const orderId = order.uniqueId;
      const userId = order.userId
      const attendTo = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
      const attend =  this.mobileAppDBInit.ref('Orders/' + orderId);
      attend.update({
        "attendedTo": "attendedTo",
      }).then(
      await attendTo.update({
          "attendedTo": "attendedTo",
        })
      )
    }

   async deliverOrder(order) {
      const orderId = order.uniqueId;
      const userId = order.userId
      const attendTo = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
      const attend =  this.mobileAppDBInit.ref('Orders/' + orderId);
      attend.update({
        "attendedTo": "delivered", "paymentStatus": "Paid"
      }).then(
       await attendTo.update({
          "attendedTo": "delivered", "paymentStatus": "Paid"
        })
      )
    }

    async returnOrder(order) {
      const orderId = order.uniqueId;
      const userId = order.userId
      const returnTo = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
      const returned =  this.mobileAppDBInit.ref('Orders/' + orderId);
      returned.update({
        "attendedTo": "returned", "paymentStatus": "Not Paid"
      }).then(
       await returnTo.update({
          "attendedTo": "returned", "paymentStatus": "Not Paid"
        })
      )
    }


    sellSample(order) {
      const id = order.uniqueId;
      const attend =  this.mobileAppDBInit.ref('RequestedSampling/' + id);
      attend.update({
        "sold": "sold", "paymentStatus": "Paid"
      });
    }

    returnSample(order) {
      const id = order.uniqueId;
      const attend =  this.mobileAppDBInit.ref('RequestedSampling/' + id);
      attend.update({
        "returned": "returned", "paymentStatus": "Not Paid"
      });
    }

   async editOrderedFrag(order, orderedFragToEdit, totalAmount, totalQuantity){
      const orderId = order.uniqueId;
      const userId = order.userId
      const fragType = orderedFragToEdit.fragranceName + orderedFragToEdit.bottleSize;
      const fragId = fragType.replace(/ /g, '');
      const editFragQuantityinOrdersPath = this.mobileAppDBInit.ref('Orders/' + orderId);
      const editFragQuantityinUsersPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
      const editCustFragPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId + '/fragrances/' + fragId);
      const editFragPath =  this.mobileAppDBInit.ref('Orders/' + orderId + '/fragrances/' + fragId);
      editFragPath.update(orderedFragToEdit).then(
        await editCustFragPath.update(orderedFragToEdit),
       await editFragQuantityinOrdersPath.update({
        'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
       }).then(
        await editFragQuantityinUsersPath.update({
          'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
         }),
       )
      );
    }


   async addNewOrderedFrag(order, orderedFragToAdd, totalAmount, totalQuantity){
      const orderId = order.uniqueId;
      const userId = order.userId
      const fragType = orderedFragToAdd.fragranceName + orderedFragToAdd.bottleSize;
      const fragId = fragType.replace(/ /g, '');
      const addFragQuantityinOrdersPath = this.mobileAppDBInit.ref('Orders/' + orderId);
      const addFragQuantityinUsersPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
      const addCustFragPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId + '/fragrances/' + fragId);
      const addFragPath =  this.mobileAppDBInit.ref('Orders/' + orderId + '/fragrances/' + fragId);
      addFragPath.update(orderedFragToAdd).then(
      await  addCustFragPath.update(orderedFragToAdd),
      await addFragQuantityinOrdersPath.update({
        'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
       }).then(
        await addFragQuantityinUsersPath.update({
          'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
         }),
       )
      );
    }



   async deleteOrderedFrag(order, orderedFragToDelete, totalAmount, totalQuantity) {
      const orderId = order.uniqueId;
      const userId = order.userId
      const fragType = orderedFragToDelete.fragranceName + orderedFragToDelete.bottleSize;
      const fragId = fragType.replace(/ /g, '');
      const deleteFragQuantityinOrdersPath = this.mobileAppDBInit.ref('Orders/' + orderId);
      const deleteFragQuantityinUsersPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
      const deleteCustFragPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId + '/fragrances/' + fragId)
      const deleteFragPath =  this.mobileAppDBInit.ref('Orders/' + orderId + '/fragrances/' + fragId);
      deleteFragPath.remove().then(
       await deleteCustFragPath.remove(),
       await deleteFragQuantityinOrdersPath.update({
        'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
       }).then(
        await deleteFragQuantityinUsersPath.update({
          'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
         }),
       )
      );
    }

   async deleteSampleFrag(sample,orderedSampleToDelete, totalQuantity){
    const orderId = sample.uniqueId;
    const userId = sample.userId
    const fragId = orderedSampleToDelete.fragranceName;
    const updateDeletedSampleDetails = this.mobileAppDBInit.ref('RequestedSampling/' + orderId + '/deletedSamples/' + fragId)
    const updateFragQuantityinSamplePath = this.mobileAppDBInit.ref('RequestedSampling/' + orderId);
    const updateFragQuantityinUsersPath = this.mobileAppDBInit.ref('Users/' + userId + '/RequestedSampling/' + orderId);
    const deleteCustSamplePath = this.mobileAppDBInit.ref('Users/' + userId + '/RequestedSampling/' + orderId + '/fragrances/' + fragId)
    const deleteSamplePath =  this.mobileAppDBInit.ref('RequestedSampling/' + orderId + '/fragrances/' + fragId);
   await updateDeletedSampleDetails.set(orderedSampleToDelete).then(
     await deleteSamplePath.remove(),
     await deleteCustSamplePath.remove().then(
     await updateFragQuantityinSamplePath.update({
      'totalFragrances': totalQuantity 
     }).then(
      await updateFragQuantityinUsersPath.update({
        'totalFragrances': totalQuantity 
       }),
     )
     )
    )
   }


   async deleteOrderedFragForDispatch(order, orderedFragToDelete, totalAmount, totalQuantity, newFragQuantity) {
    const orderId = order.uniqueId;
    const userId = order.userId
    const fragType = orderedFragToDelete.fragranceName + orderedFragToDelete.bottleSize;
    const fragId = fragType.replace(/ /g, '');
    const updateFragQuantityinOrders = this.mobileAppDBInit.ref('Orders/' + orderId + '/deletedOrders/' + fragId)
    const deleteFragQuantityinOrdersPath = this.mobileAppDBInit.ref('Orders/' + orderId);
    const deleteFragQuantityinUsersPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
    const deleteCustFragPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId + '/fragrances/' + fragId)
    const deleteFragPath =  this.mobileAppDBInit.ref('Orders/' + orderId + '/fragrances/' + fragId);
    orderedFragToDelete.quantity = newFragQuantity;
    await updateFragQuantityinOrders.set(orderedFragToDelete),
    await deleteFragPath.remove().then(
     await deleteCustFragPath.remove(),
     await deleteFragQuantityinOrdersPath.update({
      'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
     }).then(
      await deleteFragQuantityinUsersPath.update({
        'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
       }),
     )
    );
  }


  async editOrderedFragForDispatch(order, orderedFragToEdit, totalAmount, totalQuantity, newFragQuantity){
    const orderId = order.uniqueId;
    const userId = order.userId
    const fragType = orderedFragToEdit.fragranceName + orderedFragToEdit.bottleSize;
    const fragId = fragType.replace(/ /g, '');
    const editFragQuantityinOrdersPath = this.mobileAppDBInit.ref('Orders/' + orderId);
    const editFragQuantityinUsersPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId);
    const editCustFragPath = this.mobileAppDBInit.ref('Users/' + userId + '/orders/' + orderId + '/fragrances/' + fragId);
    const editFragPath =  this.mobileAppDBInit.ref('Orders/' + orderId + '/fragrances/' + fragId);
    const updateFragQuantityinOrders = this.mobileAppDBInit.ref('Orders/' + orderId + '/deletedOrders/' + fragId);

    // CHECK IF DELETED ORDERS IS EMPTY //
    if(this.isEmpty(order.deletedOrders)) {
      console.log('deleted Orders is not empty')

      // RUN IF DELETED ORDERS IS NOT EMPTY //

      for (let index = 0; index < order.deletedOrders.length; index++) {

     // ITERATE THROUGH DELETED ORDERS TO GET EACH FRAGRANCE //

        const element = order.deletedOrders[index];

        console.log(element.fragranceName + element.bottleSize)
        console.log(orderedFragToEdit.fragranceName + orderedFragToEdit.bottleSize)

        // CHECK IF ORDERED FRAGRANCE IS ALREADY IN DELETED ORDERS //
        if(element.fragranceName + element.bottleSize === orderedFragToEdit.fragranceName + orderedFragToEdit.bottleSize) {

     // RUN IF ORDERED FRAGRANCE IS ALREADY IN DELETED ORDERS //
     console.log('fragrance already exist')
     console.log('Element quantity ', element.quantity);
     console.log('Element quantity ', newFragQuantity);
        //  let newQuantity  = element.quantity + newFragQuantity
        //  console.log(newQuantity);
         await updateFragQuantityinOrders.set({
          'fragranceName': orderedFragToEdit.fragranceName,
          'bottleSize': orderedFragToEdit.bottleSize,
          'price': orderedFragToEdit.price,
          // 'quantity': orderedFragToEdit.quantity,
          'quantity': element.quantity + newFragQuantity,
          // 'timeAdded': orderedFragToEdit.timeAdded
        })
    }
    else {
      console.log('fragrance doesnt exist')
      // RUN IF ORDERED FRAGRANCE IS NOT IN DELETED ORDERS //

      await updateFragQuantityinOrders.set({
        'fragranceName': orderedFragToEdit.fragranceName,
        'bottleSize': orderedFragToEdit.bottleSize,
        'price': orderedFragToEdit.price,
        // 'quantity': orderedFragToEdit.quantity,
        'quantity': newFragQuantity,
        // 'timeAdded': orderedFragToEdit.timeAdded
      })

    }
}
 }else{

       // RUN IF DELETED ORDERS IS EMPTY //
       console.log('deleted orders is empty')
      console.log(' No deletedOrders')
      await updateFragQuantityinOrders.set({
        'fragranceName': orderedFragToEdit.fragranceName,
        'bottleSize': orderedFragToEdit.bottleSize,
        'price': orderedFragToEdit.price,
        // 'quantity': orderedFragToEdit.quantity,
        'quantity': newFragQuantity,
        // 'timeAdded': orderedFragToEdit.timeAdded
      })
}

 // UPDATE TOTAL AMOUNT AND TOTAL FRAGRANCES //

   await editFragPath.update(orderedFragToEdit).then(
      await editCustFragPath.update(orderedFragToEdit),
     await editFragQuantityinOrdersPath.update({
      'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
     }).then(
      await editFragQuantityinUsersPath.update({
        'totalAmount': totalAmount, 'totalFragrances': totalQuantity 
       }),
     )
    );

  // newFragQuantity = '';  
  }

    
    getCustomerDetails() {
      let userRef = this.mobileAppDBInit.ref('Users/')
     return this.db.list(userRef, userRef => userRef).valueChanges();
    }

    
    editCustomer(customer) {
      let userId = customer.userId;
      const editcustPath = this.mobileAppDBInit.ref('Users/' + userId + '/userDetails/');
      editcustPath.update(customer);
    }

  



}
