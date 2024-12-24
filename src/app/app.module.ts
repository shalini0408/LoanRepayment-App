import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllLoansComponent } from './components/all-loans/all-loans.component';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';
import { AdvancePaymentComponent } from './components/advance-payment/advance-payment.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { SpecificPaymentHistoryComponent } from './components/specific-payment-history/specific-payment-history.component';
import { EMICalculatorComponent } from './components/emicalculator/emicalculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HttpClientModule } from '@angular/common/http';
 import {MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgApexchartsModule } from "ng-apexcharts";
import { ErrorComponent } from './components/error/error.component';
import { PaymenttableComponent } from './components/paymenttable/paymenttable.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { SavingshistoryComponent } from './components/savingshistory/savingshistory.component';
import { SpecificsavingshistoryComponent } from './components/specificsavingshistory/specificsavingshistory.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    AllLoansComponent,
    LoanDetailsComponent,
    AdvancePaymentComponent,
    PaymentHistoryComponent,
    SpecificPaymentHistoryComponent,
    EMICalculatorComponent,
    ForgotpasswordComponent,
    EMICalculatorComponent,
    ErrorComponent,
    PaymenttableComponent,
    AccountDetailsComponent,
    SavingshistoryComponent,
    SpecificsavingshistoryComponent
    
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,MatCardModule,
    MatGridListModule,MatChipsModule,
    MatSelectModule,MatSliderModule,
    MatButtonModule,MatPaginatorModule,MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,NgApexchartsModule,MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
