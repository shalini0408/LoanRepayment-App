import { Component, OnInit } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-paymenttable',
  templateUrl: './paymenttable.component.html',
  styleUrls: ['./paymenttable.component.css']
})
export class PaymenttableComponent implements OnInit {
  p = 3000000;
  loan =3000000;
  _i = 0.07;
  t = 10;
  amountSaved:any=0.00;
  prepayment:any=0.00;
  totalAmountAfterPrepayment:any=0.00;
  x=this.calculationService.getEmiPerMonth( this.loan, this.calculationService.getInterestRatePerMonth(this._i),this.calculationService.getMonths(this.t));

  constructor(private calculationService : CalculationService) {
    this.client(1);
    
   }

  ngOnInit(): void 
  {
  }
  onclickcall()
  {
    this.onclick(100000,5);
  }
  initialTotalAmount = this.calculationService.getEmiPerMonth(this.loan,
    this.calculationService.getInterestRatePerMonth(this._i),
    this.calculationService.getMonths(this.t)
  )*this.calculationService.getMonths(this.t);
  b = this.calculationService.getInterestAmountPermonth(
    3000000,
    this.calculationService.getInterestRatePerMonth(0.07)
  );
  m = this.calculationService.getMonths(10);
  onclick(amount: number, currentmonth: number) 
  {
    this.p= this.p - amount;
    let updatedmonths = this.calculationService.getMonths(this.t)-currentmonth;
    this.x = this.calculationService.getEmiPerMonth(this.p, this.calculationService.getInterestRatePerMonth(this._i),updatedmonths)
    this.client(currentmonth);
    this.prepayment=this.prepayment+amount;
  }
  client(currentmonth: number) 
  {   
    
    
    for (let i = currentmonth; i <= this.calculationService.getMonths(this.t); i++) {
      this.totalAmountAfterPrepayment=Number(this.x)+this.totalAmountAfterPrepayment+this.prepayment;
      if(this.p<=0)
      break;
      /* console.log(
        this.x.toFixed(2),
        i,
        this.p.toFixed(2),
        this.calculationService.getInterestAmountPermonth(this.p, this.calculationService.getInterestRatePerMonth(this._i)).toFixed(2),
        this.calculationService.getPrincipalAmountPermonth(this.x,this.calculationService.getInterestAmountPermonth(this.p,this.calculationService.getInterestRatePerMonth(this._i))).toFixed(2)
      ); */

          
          let y= this.calculationService.getInterestAmountPermonth(this.p,this.calculationService.getInterestRatePerMonth(this._i));
           let prm= this.x - y;
          
           this.p = this.p - prm;
          

      
    }
    console.log(this.totalAmountAfterPrepayment);
    console.log(this.initialTotalAmount);
    this.amountSaved=(this.initialTotalAmount-this.totalAmountAfterPrepayment);
        console.log(Math.abs(this.amountSaved.toFixed(2)));//finding total savings
  }

  list()
  {

  }



}
