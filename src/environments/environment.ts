// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  accountinfourl:'http://localhost:8080/api/accountinfo',
  emiurl:'http://localhost:8080/api/emi',
  loandetailsurl:'http://localhost:8080/api/loan',
  loginurl:'http://localhost:8080/login',
  paymenturl:'http://localhost:8080/api/payment',
  savingurl:'http://localhost:8080/api/savingpaymenthistory',
  userurl:'http://localhost:8080/api/users',
  maintoken:'',
  loggedUser:''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
