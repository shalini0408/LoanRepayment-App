import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Accountinfo } from 'src/app/model/accountinfo';
import { environment } from 'src/environments/environment';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root'
})

export class AccountinfoServiceService {

  constructor(private http: HttpClient,private routingservice:RoutingService) { }
  
  public getaccountdetails():Observable<Accountinfo[]>{
    const authtoken=sessionStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
      return this.http.get<Accountinfo[]>(environment.accountinfourl+`/getAllSavingsAcc/${sessionStorage.getItem("loginkey")}`,{headers:headers});
    }
    public debitfromSavings(savingsObj:Accountinfo): Observable<Accountinfo> {
      const authtoken=sessionStorage.getItem("token");
      const headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
      return this.http.post<Accountinfo>(environment.accountinfourl+`/updateSavings`,savingsObj,{ headers: headers })
      
    }

    // private void: any  handleError(error:HttpErrorResponse) {
    //   // return throwError(()=> new Error("Request cannot be processed, please try after some time"))
     
    // }
  
}
