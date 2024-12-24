import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { LoaninfoServiceService } from 'src/app/services/loaninfo-service/loaninfo-service.service';
import { Loaninfo } from 'src/app/model/loaninfo'; 
import { AccountinfoServiceService } from 'src/app/services/accountinfo-service/accountinfo-service.service';
import { Accountinfo } from 'src/app/model/accountinfo';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.css']
})


export class AllLoansComponent implements OnInit {

  //dataSource: loan_data []= [
    //{serialID: 1, category:'Vehicle', accountno:"natwest12A123a", tenure:2,  principleAmount:500000  },
    //{serialID: 2, category:'bike', accountno:"natwest12B123b", tenure:1,  principleAmount:510000  },
    //{serialID: 3, category:'Home', accountno:"natwest12B123c", tenure:2,  principleAmount:230000  },
  //  {serialID: 4, category:'Vehicle', accountno:"3natwest12B123d", tenure:3,  principleAmount:110000  },
    //{serialID: 5, category:'Personal', accountno:"natwest12B123e", tenure:1,  principleAmount:435533  }
  //];

  loaninformation: loan_data []= [];
  accountInformation:Accountinfo[]=[];
  current_date=new Date();
  loandetails() {
    return this.routingService.loandetails();
  }

  constructor(private routingService:RoutingService, private loaninfo: LoaninfoServiceService,private accInfo:AccountinfoServiceService) { 
  }
getRandomInt(max:any) {
    return Math.floor(Math.random() * max)+2;
  }
  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.loaninfo.getloanaccdetails(sessionStorage.getItem("loginkey")).subscribe(res=> {
      console.log(res);
      this.loaninformation=res;
    });
    this.accInfo.getaccountdetails().subscribe(res=>{
      console.log(res);
      this.accountInformation=res;
      
    });
  }


}

export interface loan_data {
  loanaccno: number;
  category: string;
  custid: number;
  interest_rate: number;
  loan_amount: number;
  tenure:number;
}
export interface account_info{
  accno:string;
  branch_name:string;
  custid:number;
  ifsc:string;
  savingsamount:number;

}
