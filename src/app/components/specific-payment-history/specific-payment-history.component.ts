import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute } from '@angular/router';
import { Emi } from 'src/app/model/emi';
import { Payment } from 'src/app/model/payment';
import { AdvancepaymentServiceService } from 'src/app/services/advance-payment-service/advancepayment-service.service';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { RoutingService } from 'src/app/services/routing.service';
@Component({
  selector: 'app-specific-payment-history',
  templateUrl: './specific-payment-history.component.html',
  styleUrls: ['./specific-payment-history.component.css']
})
export class SpecificPaymentHistoryComponent implements OnInit {
  final:Payment=new Payment();
  emi:Emi=new Emi();
  currentloggedinuser: any;
  totalamount=this.emi.emi_amount;
  transactionid?:string;
  paid=this.emi.emi_amount-this.emi.remaining_amount;
  previous_remaining=this.emi.remaining_amount;
  Remaining=this.emi.remaining_amount;
  

  constructor(private activatedRoute:ActivatedRoute,private paymentservice:PaymentService,private routingservice:RoutingService,private advancepayment:AdvancepaymentServiceService) { 
    this.transactionid=this.activatedRoute.snapshot.paramMap.get('trxn')?.toString()!;
  }

  ngOnInit(): void {
    // console.log(this.transactionid);

    this.paymentservice.fetchpaymentsbycustid(this.transactionid).subscribe(res=>{
      console.log(res);
      
      if(res.transaction_no!=this.transactionid){
        alert("Transaction doesn't exists");
      }
      else{
      this.final=res;
      this.advancepayment.getEmiDb(this.final.loanaccno).subscribe(res=>{
        this.emi=res;
        console.log(this.emi.remaining_amount);
        
      });
      }
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.routingservice.accessLogin();
      
    });

    // this.advancepayment.getEmiDb(this.final.loanaccno).subscribe(res=>{
    //   this.emi=res;
    //   console.log("emi"+res);
      
    // },(error) => {                              //Error callback
    //   console.error('error caught in component')
    //   this.routingservice.accessLogin();
      
    // });
  }
}
