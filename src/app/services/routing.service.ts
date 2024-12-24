import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  accessLogin() {
    this.route.navigate(['login'])
  }

  accessDashboard() {
    this.route.navigate(['dashboard'])
  }

  accessForget() {
    this.route.navigate(['forget'])
  }

  loandetails() {
    this.route.navigate(['./loandetails'])
  }

  allloandetails() {
    this.route.navigate(['dashboard/allLoanDetails'])
  }
  
  getLoggedInUser() {
    return sessionStorage.getItem("loginkey");
  }

  advancepayment(accno:any) {
    this.route.navigate([`dashboard/allLoanDetails/loandetails/advancepayment/${accno}`])
  }

  accesspaymenthistory() {
    this.route.navigate(['dashboard/paymenthistory'])
  }

  accessspecificpayment() {
    this.route.navigate(['paymenthistory/specificpayment'])
  }

  constructor(private route:Router) { }
}
