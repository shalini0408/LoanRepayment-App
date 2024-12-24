import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accountinfo } from 'src/app/model/accountinfo';
import { AccountinfoServiceService } from 'src/app/services/accountinfo-service/accountinfo-service.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  constructor( private Activatedroute: ActivatedRoute,private accInfoService:AccountinfoServiceService,private routingservice:RoutingService) { }
  accountNumber:string
  allAccounts:Accountinfo;
  account?:Accountinfo;
  balence:any;
  custid:any;
  branch_name:any;
  ifsc:any;
  ngOnInit(): void {
    this.accountNumber = this.Activatedroute.snapshot.paramMap.get("loanId")?.toString()!;
  this.accInfoService.getaccountdetails().subscribe(res=>{
  
    this.account=res.find(data=>{return data.accno==this.accountNumber})
    console.log(this.account);
    this.balence=this.account?.savingsamount
    this.branch_name=this.account?.branch_name
    this.custid=this.account?.custid
    this.ifsc=this.account?.ifsc
    
  });
    /* this.account= */
    
    
  }

}
