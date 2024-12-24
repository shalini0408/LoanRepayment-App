import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpecificPaymentHistoryComponent } from './components/specific-payment-history/specific-payment-history.component';
import { AdvancePaymentComponent } from './components/advance-payment/advance-payment.component';
import { AllLoansComponent } from './components/all-loans/all-loans.component';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
import { AuthGuard } from './services/auth.guard';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { EMICalculatorComponent } from './components/emicalculator/emicalculator.component';
import { LoggedinauthGuard } from './services/loggedinauth.guard';
import { ErrorComponent } from './components/error/error.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { SavingshistoryComponent } from './components/savingshistory/savingshistory.component';
import { SpecificsavingshistoryComponent } from './components/specificsavingshistory/specificsavingshistory.component';


const routes: Routes = [  
  
  { path: 'login', component: LoginComponent, canActivate: [LoggedinauthGuard] },
  { path: 'forget', component: ForgotpasswordComponent, canActivate: [LoggedinauthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
      
  //{ path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'emicalculator', component: EMICalculatorComponent, canActivate: [AuthGuard] },
  //{ path: 'allLoanDetails', component: AllLoansComponent, canActivate: [AuthGuard] },
  //{ path: 'paymenthistory', component: PaymentHistoryComponent, canActivate: [AuthGuard]},
  //{ path: '404', component: ErrorComponent},
  //{ path: '**', redirectTo: '404' },
  //{ path: '/*path', redirectTo: '404'},

  //{path: '404', component: ErrorComponent},
  //{path: '**', redirectTo: '/404'},
 
  
  { path: 'profile', redirectTo: 'login', pathMatch: 'full' },
  { path: 'emicalculator', redirectTo: 'login', pathMatch: 'full' },
  { path: 'paymenthistory', redirectTo: 'login', pathMatch: 'full' },
  { path: 'advancepayment', redirectTo: 'login', pathMatch: 'full' },
  { path: 'loandetails', redirectTo: 'login', pathMatch: 'full' },
  { path: 'specificpayment', redirectTo: 'login', pathMatch: 'full' },
  { path: 'allLoanDetails', redirectTo: 'login', pathMatch: 'full' },
  
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path:'', redirectTo:'allLoanDetails', pathMatch:'full'},
      
      { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'emicalculator', component: EMICalculatorComponent, canActivate: [AuthGuard] },
      { path: 'allLoanDetails', component: AllLoansComponent, canActivate: [AuthGuard] },
      { path: 'paymenthistory', component: PaymentHistoryComponent, canActivate: [AuthGuard]},
      { path: 'savingshistory', component: SavingshistoryComponent, canActivate: [AuthGuard]},
      { path: 'specificsavingshistory', component: SpecificsavingshistoryComponent, canActivate: [AuthGuard]},
      {path:'accountDetails/:loanId', component: AccountDetailsComponent, canActivate: [AuthGuard] },
      {
        path: 'paymenthistory', children: [
          { path: 'specificpayment/:trxn', component: SpecificPaymentHistoryComponent, canActivate: [AuthGuard] }]
      },
      {
        path: 'savingshistory', children: [
          { path: 'specificsavingshistory/:trxn', component: SpecificsavingshistoryComponent, canActivate: [AuthGuard] }]
      },
      {
        path: 'allLoanDetails', children: [
          {
            path: 'loandetails/:accno', component: LoanDetailsComponent, canActivate: [AuthGuard]
          }]
      },

      {
        path: 'allLoanDetails', children: [
          {
            path: 'loandetails', children: [
              { path: 'advancepayment/:accno', component: AdvancePaymentComponent, canActivate: [AuthGuard] },]
          }]
      },


    ], canActivate: [AuthGuard]
  }, 

  { path: '**', pathMatch: 'full', 
  component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
