// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig:{
    apiKey: "AIzaSyCTs_8TyyOhK7_hixqxjrfCjRerh9HwghY",
    authDomain: "mtfirstbank.firebaseapp.com",
    databaseURL: "https://mtfirstbank-default-rtdb.firebaseio.com",
    projectId: "mtfirstbank",
    storageBucket: "mtfirstbank.appspot.com",
    messagingSenderId: "568817747679",
    appId: "1:568817747679:web:4ab62884699957d01d8b6a",
    measurementId: "G-N9CJM54EJZ"
  },

  urlConfing:{
    URL1: "https://mtfirstbank-default-rtdb.firebaseio.com/users-api/"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
