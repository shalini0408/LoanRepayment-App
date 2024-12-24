import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from "ng-apexcharts";
// import {MatDialog} from '@angular/material';
import * as XLSX from 'xlsx';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { AdvancepaymentServiceService } from 'src/app/services/advance-payment-service/advancepayment-service.service';
import { RoutingService } from 'src/app/services/routing.service';
import { AccountinfoServiceService } from 'src/app/services/accountinfo-service/accountinfo-service.service';
import { Accountinfo } from 'src/app/model/accountinfo';
import { Emi } from 'src/app/model/emi';
import { ThisReceiver } from '@angular/compiler';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/services/payment-service/payment.service';
import { Savingspayment } from 'src/app/model/savingspayment';
import { SavingshistoryService } from 'src/app/services/savingshistory/savingshistory.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.css'],
})
export class AdvancePaymentComponent implements OnInit, AfterViewInit {
  
  

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;
  accountNumber: any;
  loanStatus = "Inactive"
  upcommingDuedate = new Date(2022, 11, 18);
  userEmi = 0;
  fileName = 'ExcelSheet.xlsx';
  principleAmount = 0;
  outStandingAmount = 0;
  interest = 0;
  tenure = 0;
  pendingEMI = new Array(5);
  tenureToggle = "hidden";
  tenureBlock = 'none'
  EMI_DATA: EMITable[] = [];
  monthlyPayment = 0;
  totalPayment = 0;
  selectedEMI = 0;
  upcommingEMi = 0;
  principalremaining = this.principleAmount;
  Interestpermonth = 0;
  emiPermonth = 0;
  principalpermonth = 0;
  sino = 0;
  interestTobepaid=0;

  selctedAccno:any;
  selctedAccBranch:any;
  selectedIFSC:any;
  payableamount:number;
  availableBalance:any;
  //Instance of the object
  loan: Loaninfo = new Loaninfo();
  emi: Emi = new Emi();
  emi_updated: Emi = new Emi();
  acc: Accountinfo[];

  displayedColumns: string[] = ['monthID','emi', 'interest', 'principle', 'balence'];
  dataSource = new MatTableDataSource<EMITable>(this.EMI_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _Activatedroute: ActivatedRoute, private advancepaymentService: AdvancepaymentServiceService, private routeService: RoutingService, private accountservice: AccountinfoServiceService,private paymentService:PaymentService,private savingsservice:SavingshistoryService) {
    this.methodA();
    this.accountNumber = this._Activatedroute.snapshot.paramMap.get("accno")?.toString()!;
  }
  selectSavingsAccount?: Accountinfo;
  selectedSavings(value: any) {
    console.log(value);
    console.log(this.acc);

    this.selectSavingsAccount = this.acc.find(res => { return res.accno == value });
    this.selctedAccno=this.selectSavingsAccount?.accno;
    this.selctedAccBranch=this.selectSavingsAccount?.branch_name;
    this.selectedIFSC=this.selectSavingsAccount?.ifsc;
    this.availableBalance=this.selectSavingsAccount?.savingsamount;
    console.log(this.selectSavingsAccount?.accno);

  }

/*   emiValueChange(value: any) {
    // this.userEmi=1000;
    console.log(value);
    this.emiPermonth = (this.principleAmount * (this.interest / 12 / 100) * Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12)) / (Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12) - 1);
    console.log("emipermonth" + this.emiPermonth);
    this.Interestpermonth = (this.outStandingAmount * (this.interest / 12)) / 100;
    console.log("Before  interestpermonth" + this.Interestpermonth);
    this.principalpermonth = this.emiPermonth - this.Interestpermonth;
    console.log("Before  principalpermonth" + this.principalpermonth);
    this.outStandingAmount = this.outStandingAmount - this.principalpermonth - value;
    console.log("outs" + this.outStandingAmount);
    console.log("---------------------*--------------------");
    this.Interestpermonth = (this.outStandingAmount * (this.interest / 12)) / 100;
    console.log("interestpermonth" + this.Interestpermonth);
    this.emiPermonth = (this.principleAmount * (this.interest / 12 / 100) * Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12)) / (Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12) - 1);
    console.log("emipermonth" + this.emiPermonth);
    this.principalpermonth = this.emiPermonth - this.Interestpermonth;
    console.log("principalpermonth" + this.principalpermonth);

  } */
  paymentObj:Payment=new Payment();
  savingobj:Savingspayment=new Savingspayment();
  paymentSuccessful() {
    console.log(this.selectSavingsAccount);
    var custid=10001111
    custid=Number(sessionStorage.getItem("loginkey"));
    this.paymentObj.custid=custid;
    this.paymentObj.time_payment_atempted=new Date();
    this.paymentObj.amountpaid=this.payableamount;
    this.paymentObj.loanaccno=this.accountNumber;

    this.savingobj.custid=custid;
    this.savingobj.time_payment_atempted=this.paymentObj.time_payment_atempted;
    this.savingobj.amount_debited=this.payableamount;
    this.savingobj.savingsaccno=this.selctedAccno;
   
    console.log(this.savingobj.savingsaccno);
    
    if (this.selectSavingsAccount?.savingsamount != 0) {
      if (this.prePaymentAmount != 0) {
        if (this.emiPermonth > this.outStandingAmount) {
          this.emiPermonth = this.outStandingAmount;
        }
        else if(this.payableamount==this.outStandingAmount){
          this.emi_updated.emi_amount = 0;
          this.emi_updated.remaining_amount =0;
          this.emi_updated.loan_status = "closed";
          this.emi_updated.upcomming_payment_date = this.upcommingDuedate;
          this.emi_updated.loanaccno = this.accountNumber;
          this.emi_updated.s_no = this.sino;          
        }
        else {
          this.emiPermonth = (this.principleAmount * (this.interest / 12 / 100) * Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12)) / (Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12) - 1);
          console.log("emipermonth" + this.emiPermonth);
          this.Interestpermonth = (this.outStandingAmount * (this.interest / 12)) / 100;
          console.log("Before  interestpermonth" + this.Interestpermonth);
          this.principalpermonth = this.emiPermonth - this.Interestpermonth;
          console.log("Before  principalpermonth" + this.principalpermonth);
          this.outStandingAmount = this.outStandingAmount - this.principalpermonth - this.prePaymentAmount;
          console.log("outs" + this.outStandingAmount);
          console.log("---------------------*--------------------");
          this.Interestpermonth = (this.outStandingAmount * (this.interest / 12)) / 100;
          console.log("interestpermonth" + this.Interestpermonth);
          this.principalpermonth = this.emiPermonth - this.Interestpermonth;
          console.log("principalpermonth" + this.principalpermonth);
          this.emi_updated.emi_amount = this.emiPermonth;
          this.emi_updated.remaining_amount = this.outStandingAmount;
          if(this.outStandingAmount<=this.emiPermonth){
            this.emi_updated.emi_amount = this.outStandingAmount;
          }
          this.emi_updated.loan_status = this.loanStatus;
          this.emi_updated.upcomming_payment_date = new Date(this.upcommingDuedate.setMonth(this.upcommingDuedate.getMonth()+1));     
          this.emi_updated.loanaccno = this.accountNumber;
          this.emi_updated.s_no = this.sino;
          console.log("emi_updated" + this.emi_updated.upcomming_payment_date);  
        }
        if(this.availableBalance>=this.payableamount){
          this.paymentObj.payment_status="success";
          
          this.advancepaymentService.makeAdvancePayment(this.emi_updated).subscribe(res=>{
            console.log(res);           
          });
          this.savingobj.payment_status="success";
          var savingsObj:Accountinfo=new Accountinfo();
          savingsObj.savingsamount=this.availableBalance-this.payableamount;
          savingsObj.accno=this.selctedAccno;
          savingsObj.branch_name=this.selctedAccBranch;
          savingsObj.custid=Number(sessionStorage.getItem("loginkey"));
          savingsObj.ifsc=this.selectedIFSC;
          
          this.accountservice.debitfromSavings(savingsObj).subscribe(res=>{
            
            console.log("GGFHH"+res);
            
          });
          
        }else{
          this.paymentObj.payment_status="failed";
          this.savingobj.payment_status="failed";
          alert("Insufficient funds")
        }
        
      } else {
        this.paymentObj.payment_status="failed";
        this.savingobj.payment_status="failed";
        alert("0 prepaymemt not allowed")
      }
      
    }
    else {
      this.paymentObj.payment_status="failed";
      this.savingobj.payment_status="failed";
      alert('choose another trasaction');
    }
    
    
    this.paymentService.addTransactionpayments(this.paymentObj).subscribe(res=>{
      console.log(res);
      
      console.log("ashgdajs"+this.savingobj.time_payment_atempted);
      
    });

    this.savingsservice.addTransactionpayments(this.savingobj).subscribe(res=>{
      
      console.log(res);
      this.routeService.accesspaymenthistory();
      
    });
    
    // Date dt=this.upcommingDuedate;
    // dt=this.upcommingDuedate.setMonth(this.upcommingDuedate.getMonth()+1)
    // console.log(dt);
    
    //this.routeService.accesspaymenthistory();
    
    

  }
  methodA() {
    this.chartOptions1 = {
      series: [
        {
          name: "Fixated values",
          data: [this.principleAmount , 0, 0,(((5000+this.interestTobepaid)/this.principleAmount)/this.tenure)*365*100 ]
        },
        {
          name: "Variable Amounts",
          data: [(this.principleAmount - this.outStandingAmount) , this.interest * (this.outStandingAmount) * 0.01, this.interest * (this.principleAmount - this.outStandingAmount) * 0.01-this.interest * (this.outStandingAmount) * 0.01, 0]
        },
        /* {
          name: "",
          data: [0, 0, 0, 0]
        } */
      ],
      colors: ["#FFFF00",
        "#42145f"],
      chart: {
        toolbar: {
          show: true,
          tools: {
            download: false
          }
        },
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Principle vs Paid",
          "Interest to be Paid",
          "Interest can be Saved",
          "APR"
        ]
      },
      yaxis: {
        decimalsInFloat: Number,
        title: {
          text: "Amount"
        }
      },
      tooltip: {
        enabled: true,
      },
      fill: {
        opacity: 1
      },
    };
    this.chartOptions = {
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      series: [this.outStandingAmount,  this.interestTobepaid],
      labels: ["OutStanding Amount", "Interest to be paid"],
      colors: ["#42145f", "#1d7b8a"],
      animations: {
        enabled: true,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 360
            },
            dataLabels: {
              enabled: true
            },
            legend: {
              show: true

            },
          }
        }
      ]
    };
  }
  makeFullPayment() {
    this.tenureToggle = "visible"
    this.tenureBlock = "block"
    this.prePaymentAmount = this.outStandingAmount
    this.payableamount=this.outStandingAmount;
    //this.emiChange(this.selectedEMI);
  }
  exportexcel(): void {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  prePaymentAmount = 0
  makePartialPayment(value: any) {
    this.tenureToggle = "visible"
    this.tenureBlock = "block"
    this.prePaymentAmount = value;
    this.payableamount=Number(value)+this.upcommingEMi;
    console.log(value);

  }

  ngOnInit(): void {
    
    this.accountservice.getaccountdetails().subscribe(res => {
      console.log(res);
     
      this.acc = res;
    })
    this.advancepaymentService.getEmiDb(this.accountNumber).subscribe(res => {
      //console.log(res);
      if (res !== null) {
        this.sino = res.s_no;
        this.accountNumber = res.loanaccno;
        this.loanStatus = res.loan_status;
        this.upcommingEMi = res.emi_amount;
        this.outStandingAmount = res.remaining_amount;
        this.upcommingDuedate = new Date(res.upcomming_payment_date);
      } else {
        this.routeService.accessDashboard();
      }

    });
    this.advancepaymentService.getLoanDetails(this.accountNumber).subscribe(res => {
      //console.log(res);
      if (res !== null) {

        this.principleAmount = res.loan_amount;
        this.tenure = res.tenure;
        this.interest = res.interest_rate;
        this.pendingEMI = new Array(this.tenure * 12);
        
        for (var index = 0; index < this.pendingEMI.length; index++) {
          this.pendingEMI[index] = index + 1;
          this.dataSource.paginator = this.paginator;
        }
        this.EMI_DATA = [];
        var loanAmount = this.outStandingAmount;
        var years = this.tenure;
        var annualRate = this.interest;
        var monthlyRate = annualRate / 1200;
        this.monthlyPayment = loanAmount * monthlyRate / (1 - 1 / Math.pow(1 + monthlyRate, years * 12));
        this.totalPayment = Math.round((this.monthlyPayment * 12) * years * 100 / 100);

        var balance = loanAmount;
        for (var i = 1; i <= years * 12; i++) {
          var interest1 = (balance * (this.interest / 12)) / 100;
          this.monthlyPayment=this.upcommingEMi-interest1;
          //balance=balance-this.monthlyPayment;
          // var principal = this.monthlyPayment - this.interestTobepaid;
          // this.monthlyPayment = Math.round(this.monthlyPayment * 100) / 100;
          /* this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(this.monthlyPayment * 100) / 100, balence: Math.round(balance * 100) / 100 }); */
          // balance = balance - principal;
          if (this.upcommingEMi < balance) {
            this.EMI_DATA.push({ monthID: i,emi:this.upcommingEMi, interest: Math.round(interest1 * 100) / 100, principle: Math.round(this.monthlyPayment * 100) / 100, balence: Math.round(balance * 100) / 100 });
            balance=balance-this.monthlyPayment;
          } else {
            this.EMI_DATA.push({ monthID: i,emi:0,  interest: Math.round(interest1 * 100) / 100, principle: Math.round(balance * 100) / 100, balence: 0});
            break;
          }


        }
        for(var i=0;i<this.EMI_DATA.length;i++){
          this.interestTobepaid+=this.EMI_DATA[i].interest;
        }
        this.dataSource = new MatTableDataSource<EMITable>(this.EMI_DATA);
        this.methodA();
      } else {
        this.routeService.accessDashboard();
      }

    })
  }


  close() {
    window.location.reload();
  }


/*   emiChange(value: any) {
    this.Interestpermonth = (this.outStandingAmount * (this.interest / 12)) / 100;;
    this.emiPermonth = (this.principleAmount * (this.interest / 12 / 100) * Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12)) / (Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12) - 1);
    console.log("emipermonth" + this.emiPermonth);

    this.principalpermonth = this.emiPermonth - this.Interestpermonth;
    console.log("principalamountpermonth" + this.principalpermonth);

    this.selectedEMI = value;
    this.outStandingAmount = this.outStandingAmount - this.principalpermonth;
    console.log("outs" + this.outStandingAmount);

  } */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface EMITable {
  monthID: number;
  interest: number;
  principle: number;
  balence: number;
  emi:number;
}



export class Loaninfo {
  category!: string;
  loanaccno!: number;
  tenure!: number;
  loan_amount!: number;
}

export interface account_info {
  accno: number;
  branch_name: string;
  custid: number;
  ifsc: string;
  savingsamount: number;

}