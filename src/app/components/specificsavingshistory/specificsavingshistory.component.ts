import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Savingspayment } from 'src/app/model/savingspayment';
import { RoutingService } from 'src/app/services/routing.service';
import { SavingshistoryService } from 'src/app/services/savingshistory/savingshistory.service';

@Component({
  selector: 'app-specificsavingshistory',
  templateUrl: './specificsavingshistory.component.html',
  styleUrls: ['./specificsavingshistory.component.css']
})
export class SpecificsavingshistoryComponent implements OnInit {
transactionid:any;
final:Savingspayment=new Savingspayment();
  constructor(private activatedRoute:ActivatedRoute,private savingshistory:SavingshistoryService,private routingservice:RoutingService) { 
    this.transactionid=this.activatedRoute.snapshot.paramMap.get('trxn')?.toString()!;
  }

  ngOnInit(): void {
    this.savingshistory.fetchpaymentsbycustid(this.transactionid).subscribe(res=>{
      console.log(res);
      if(res!=null){
          this.final=res;
      }
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.routingservice.accessLogin();
      
    });

  }

}
