import { Injectable } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  fetchpayments(): Observable<Payment[]> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.get<Payment[]>(environment.paymenturl+"/getpayment", { 'headers': headers });
  }

  fetchpaymentsbycustid(tno: any): Observable<any> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.get(environment.paymenturl+"/pays" + `/${tno}`, { 'headers': headers });
  }

  getEmiDb(loanAccountNumber: any): Observable<any> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.get(environment.emiurl+`/getEmi/${loanAccountNumber}`, { headers: headers });
  }
  addTransactionpayments(paymentObj: Payment): Observable<Payment> {
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.post<Payment>(environment.paymenturl+`/addTransaction`, paymentObj, { headers: headers });
  }
}
