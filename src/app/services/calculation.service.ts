import { Injectable } from '@angular/core';
import { NotFoundError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  getEmiPerMonth(principle: any, interestRatePerMonth: any, months: any)  {
    let numerator =
      principle *
      interestRatePerMonth *
      Math.pow(1 + interestRatePerMonth, months);
    let denominator = Math.pow(1 + interestRatePerMonth, months) - 1;
    let amount = numerator / denominator;
    return amount;
  }

  getMonths(
    tenure: any //tenure is in years
  ) {
    return tenure * 12;
  }

  getInterestRatePerMonth(
    interestRate: any //interestrates should be in decimal
  ) {
    return interestRate / 12;
  }
  getInterestAmountPermonth(currentprincipal: any, interestRatePerMonth: any) {
    return interestRatePerMonth * currentprincipal;
  }
  getPrincipalAmountPermonth (emiPerMonth: any,interestAmountPerMonth: any)
  {
    return emiPerMonth-interestAmountPerMonth;
  }


  }
