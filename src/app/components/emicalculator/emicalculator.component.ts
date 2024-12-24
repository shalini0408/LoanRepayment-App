import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from "ng-apexcharts";
import * as XLSX from 'xlsx';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-emicalculator',
  templateUrl: './emicalculator.component.html',
  styleUrls: ['./emicalculator.component.css']
})
export class EMICalculatorComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  upcommingDuedate = new Date(2022, 11, 18);
  title = 'angular-app';
  fileName = 'ExcelSheet.xlsx';
  principleAmount = 500000;
  outStandingAmount = 500000;
  interest = 5;
  accountNumber = "nat231dgrw3234vr3";
  overDueby = 2;
  tenure = 10;
  pendingEMI = new Array(5);
  tenureToggle = "hidden";
  initialTenure = 4;
  tenureBlock = 'none'
  EMI_DATA: EMITable[] = [];
  monthlyPayment = 0;
  totalPayment = 0;
  selectedEMI = 0;
  leftoutEmi = 5;
  // emiPermonth=0 //2000
  //Shalini added the code
  principalremaining = this.principleAmount;
  updateIntrestToBePaid = (this.principalremaining * (this.interest / 12)) / 100;;
  emiPermonth = (this.principleAmount * (this.interest / 12 / 100) * Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12)) / (Math.pow((1 + (this.interest / 12 / 100)), this.tenure * 12) - 1);
  principalamountpermonth = this.emiPermonth - this.updateIntrestToBePaid;
  // i=this.interest/100/12;
  displayedColumns: string[] = ['monthID', 'interest', 'principle', 'balence'];
  displayedColumnsApr: string[] = ['OriginaLoanAmount', 'OriginalTerm', 'APR', 'MonthlyRepayment', 'EarlyRepaymentCharge', 'NetInterestSaved'];
  dataSource = new MatTableDataSource<EMITable>(this.EMI_DATA);
  dataSourceApr: any[] = [
    { "OriginaLoanAmount": 400000, 'OriginalTerm': 60, 'APR': 7.9, 'MonthlyRepayment': 100.49 * 80, 'EarlyRepaymentCharge': 32.7 * 80, 'NetInterestSaved': 228.8 * 80 },
    { "OriginaLoanAmount": 10000 * 80, 'OriginalTerm': 60, 'APR': 3.7, 'MonthlyRepayment': 182.54 * 80, 'EarlyRepaymentCharge': 29.26 * 80, 'NetInterestSaved': 233.41 * 80 },
    { "OriginaLoanAmount": 20000 * 80, 'OriginalTerm': 60, 'APR': 3.9, 'MonthlyRepayment': 366.82 * 80, 'EarlyRepaymentCharge': 61.77 * 80, 'NetInterestSaved': 493.15 * 80 }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private _Activatedroute: ActivatedRoute) {
    this.methodA();
    this.accountNumber = this._Activatedroute.snapshot.paramMap.get("accno")?.toString()!;
    console.log(this.accountNumber);


  }
  methodA() {
    this.chartOptions = {
      chart: {
        width: 420,
        type: 'donut',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 100,
          animateGradually: {
              enabled: true,
              delay: 50
          },
          dynamicAnimation: {
              enabled: true,
              speed: 50
          }
      }
      ,dataLabels: {
        enabled: true
      },
      legend: {
        show: true
      },
      },
      
      
      series: [this.totalPayment, this.totalPayment-this.principleAmount],
      labels: ["Total Payment", "Interest Paid"],
      colors: ["#42145f", "#1d7b8a"],
      animations: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: true
            },
          }
        }
      ]
    };
  }
  pitch1(event:any){
    this.principleAmount=event.value;
    this.outStandingAmount=event.value;
    this.EMI_DATA = [];
    var loanAmount = this.outStandingAmount;
    var years = this.tenure;
    var annualRate = this.interest;
    var monthlyRate = annualRate / 1200;
    this.monthlyPayment = loanAmount * monthlyRate / (1 - 1 / Math.pow(1 + monthlyRate, years * 12));
    this.totalPayment = Math.round((this.monthlyPayment * 12) * years * 100 / 100);
    var balance = loanAmount;
    this.monthlyPayment = Math.round(this.monthlyPayment * 100) / 100;
    for (var i = 1; i <= years * 12; i++) {
      var interest1 = monthlyRate * balance;
      var principal = this.monthlyPayment - interest1;
      balance = balance - principal;
      if (principal < balance) {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: Math.round(balance * 100) / 100 });
      } else {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: 0 });
        break;
      }
      //console.log(i+" "+interest1+" "+principal+" "+balance);
    }
    this.methodA();
  }
  pitch2(event:any){
    this.interest=event.value;
    this.EMI_DATA = [];
    var loanAmount = this.outStandingAmount;
    var years = this.tenure;
    var annualRate = this.interest;
    var monthlyRate = annualRate / 1200;
    this.monthlyPayment = loanAmount * monthlyRate / (1 - 1 / Math.pow(1 + monthlyRate, years * 12));
    this.totalPayment = Math.round((this.monthlyPayment * 12) * years * 100 / 100);
    var balance = loanAmount;
    this.monthlyPayment = Math.round(this.monthlyPayment * 100) / 100;
    for (var i = 1; i <= years * 12; i++) {
      var interest1 = monthlyRate * balance;
      var principal = this.monthlyPayment - interest1;
      balance = balance - principal;
      if (principal < balance) {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: Math.round(balance * 100) / 100 });
      } else {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: 0 });
        break;
      }
      //console.log(i+" "+interest1+" "+principal+" "+balance);

    }
    this.methodA();
  }
  pitch(event: any) {
    console.log(event.value);
    this.EMI_DATA = [];
    this.tenure = event.value;
    var loanAmount = this.outStandingAmount;
    var years = this.tenure;
    var annualRate = this.interest;
    var monthlyRate = annualRate / 1200;
    this.monthlyPayment = loanAmount * monthlyRate / (1 - 1 / Math.pow(1 + monthlyRate, years * 12));
    this.totalPayment = Math.round((this.monthlyPayment * 12) * years * 100 / 100);
    var balance = loanAmount;
    this.monthlyPayment = Math.round(this.monthlyPayment * 100) / 100;
    for (var i = 1; i <= years * 12; i++) {
      var interest1 = monthlyRate * balance;
      var principal = this.monthlyPayment - interest1;
      balance = balance - principal;
      if (principal < balance) {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: Math.round(balance * 100) / 100 });
      } else {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: 0 });
        break;
      }
      //console.log(i+" "+interest1+" "+principal+" "+balance);

    }
    this.methodA();



  }
  makeFullPayment() {
    this.selectedEMI = 5//total pending
    this.emiChange();
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  ngOnInit(): void {
    for (var index = 0; index < this.pendingEMI.length; index++) {
      this.pendingEMI[index] = index + 1;
      this.dataSource.paginator = this.paginator;
    }
    this.EMI_DATA = [];
    this.tenure = this.initialTenure;
    var loanAmount = this.outStandingAmount;
    var years = this.tenure;
    var annualRate = this.interest;
    var monthlyRate = annualRate / 1200;
    this.monthlyPayment = loanAmount * monthlyRate / (1 - 1 / Math.pow(1 + monthlyRate, years * 12));
    this.totalPayment = Math.round((this.monthlyPayment * 12) * years * 100 / 100);

    var balance = loanAmount;
    for (var i = 1; i <= years * 12; i++) {
      var interest1 = monthlyRate * balance;
      var principal = this.monthlyPayment - interest1;
      this.monthlyPayment = Math.round(this.monthlyPayment * 100) / 100;
      balance = balance - principal;
      if (principal < balance) {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: Math.round(balance * 100) / 100 });
      } else {
        this.EMI_DATA.push({ monthID: i, interest: Math.round(interest1 * 100) / 100, principle: Math.round(principal * 100) / 100, balence: 0 });
        break;
      }
      //console.log(i+" "+interest1+" "+principal+" "+balance);
      this.methodA();

    }
  }
  emiChange() {


    // Interest Amount=(monthly interest rate*principal remaining amount)/100
    //Principal amount per month=emipermonth-Interest amount;
    //Principal remaning=Principal remaning-Principal amount per month;
    // console.log("principal remain  "+this.principalremaining);
    // console.log("emi  "+this.emiPermonth);
    // console.log("Interest "+this.updateIntrestToBePaid);
    // console.log("principal"+this.principalamountpermonth);
    console.log("---------------");
    console.log("dfsfds " + this.emiPermonth);
    console.log(-this.principleAmount + this.emiPermonth * 10 * 12);

    const emi = this.emiPermonth * (this.selectedEMI);
    this.principalremaining = this.principalremaining - this.principalamountpermonth - emi;
    console.log("principal remain  " + this.principalremaining);
    this.updateIntrestToBePaid = (this.principalremaining * (this.interest / 12)) / 100;
    console.log("Interest " + this.updateIntrestToBePaid);
    this.principalamountpermonth = this.emiPermonth - this.updateIntrestToBePaid;
    console.log("principal amount " + this.principalamountpermonth);

    this.methodA();
  }
  ngAfterViewInit() {

  }
}

export interface EMITable {
  monthID: number;
  interest: number;
  principle: number;
  balence: number;
}


