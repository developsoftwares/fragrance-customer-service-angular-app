import * as firebase from 'firebase';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    authDomain: "percentmobileapp.firebaseapp.com",
    projectId: 'percentmobileapp',
    appId: '1:358099435348:android:2edf94d229c24ab42852c1',
    apiKey: 'AIzaSyB7iS_y5BJlIo_rMSy_kAsqRPzYPQGcwUA',
    messagingSenderId: "358099435348",
    databaseURL: "https://percentmobileapp.firebaseio.com",
    storageBucket: "percentmobileapp.appspot.com",
   },
};





/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
