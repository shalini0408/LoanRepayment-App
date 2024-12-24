import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

import { AdvancepaymentServiceService } from 'src/app/services/advance-payment-service/advancepayment-service.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})


export class LoanDetailsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  upcommingDuedate = new Date(2022, 11, 18);
  principleAmount = 0;
  interest = 0;
  accountNumber: string = '';
  tenure = 0;
  loanStatus: string = '';
  outStandingAmount = 0;
  upcommingEMi = 0;
  penaltyAmount = 0;

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.accountNumber = this.Activatedroute.snapshot.paramMap.get("accno")?.toString()!;
    console.log(this.accountNumber);
    var remamt=0;
    this.advancepaymentService.getEmiDb(this.accountNumber).subscribe(res => {
      console.log(res);
      
      if (res !== null) {
        this.accountNumber = res.loanaccno;
        this.loanStatus = res.loan_status;
        this.upcommingEMi = res.emi_amount;
        remamt=res.remaining_amount
        this.outStandingAmount = res.remaining_amount;
        this.upcommingDuedate = res.upcomming_payment_date;
      } else {
        this.routingService.accessDashboard();
      }
      this.methodB();

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.routingService.accessLogin();
      
    });
    this.advancepaymentService.getLoanDetails(this.accountNumber).subscribe(res => {
      //console.log(res);
      if (res !== null) {
        this.principleAmount = res.loan_amount;
        this.tenure = res.tenure;
        this.interest = res.interest_rate;
      }
      this.methodB();
      
    });
  }
  methodB(){
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [this.principleAmount, this.interest * (this.principleAmount - this.outStandingAmount) * 0.01, 0]
        },
        {
          name: "",
          data: [this.principleAmount - this.outStandingAmount, 0, this.outStandingAmount ]
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
          "Interest Paid",
          "OutStanding amount",
        ]
      },
      yaxis: {
        decimalsInFloat: Number,
        title: {
          text: "Amount"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val + " thousand";
          }
        }
      }
    };
  }

  accessadvancePayment() {
    this.routingService.advancepayment(this.accountNumber);
  }
  constructor(private routingService: RoutingService, private Activatedroute: ActivatedRoute, private advancepaymentService: AdvancepaymentServiceService) {
    
  }
}
