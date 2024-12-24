import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/model/payment';
import { Savingspayment } from 'src/app/model/savingspayment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavingshistoryService {

  constructor(private http: HttpClient) { }
  fetchpayments(cust:any): Observable<Savingspayment[]> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.get<Savingspayment[]>(environment.savingurl+"/savingshistory", { 'headers': headers });
  }

  fetchpaymentsbycustid(tno: any): Observable<any> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.get<any>(environment.savingurl+"/pays" + `/${tno}`, { 'headers': headers });
  }
  addTransactionpayments(paymentObj: Savingspayment): Observable<Savingspayment> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.post<Savingspayment>(environment.savingurl+"/addTransaction", paymentObj, { headers: headers });
  }
}
