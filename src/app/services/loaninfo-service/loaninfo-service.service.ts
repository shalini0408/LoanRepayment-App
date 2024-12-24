import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoaninfoServiceService {

  constructor(private http: HttpClient) { }
  
  public getloanaccdetails(custid:any):Observable<any>{
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
      
        return this.http.get(environment.loandetailsurl+`/getLoanDetailsbyCust/${custid}`,{'headers':headers});
      }
}

  