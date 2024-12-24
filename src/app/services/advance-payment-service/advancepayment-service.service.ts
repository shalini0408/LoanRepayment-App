import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Emi } from 'src/app/model/emi';
import { Accountinfo } from 'src/app/model/accountinfo';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdvancepaymentServiceService {

  constructor(private http: HttpClient) { }

  getEmiDb(loanAccountNumber: any): Observable<any> {
    const authtoken=sessionStorage.getItem("token");
    const headers_object = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
    return this.http.get<any>(environment.emiurl+`/getEmi/${loanAccountNumber}`, { headers: headers_object });
  }
  getLoanDetails(loanAccountNumber: any): Observable<any> {
    const authtoken=sessionStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + authtoken);
    // headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("token")?.toString())
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*');
      console.log(sessionStorage.getItem("token"));
    return this.http.get(environment.loandetailsurl+`/getLoanDetails/${sessionStorage.getItem("loginkey")}/${loanAccountNumber}`, { headers: headers_object })
    .pipe(catchError(this.handleError));
  }
  makeAdvancePayment(emiUpdated:Emi): Observable<Emi> {
    const authtoken=sessionStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + authtoken);
    return this.http.post<Emi>(environment.emiurl+`/updateEMI`,emiUpdated, { headers: headers_object })
    .pipe(catchError(this.handleError));
  }
  private handleError(error:HttpErrorResponse) {
    if(error.status === 0) {
      console.log("Error occured, please after some time");
    } else {
      console.log("Error occured");
    }
    return throwError(()=> new Error("Request cannot be processed, please try after some time"))
    //return throwError(()=> new Error(`${error.message}`));
  }
}

