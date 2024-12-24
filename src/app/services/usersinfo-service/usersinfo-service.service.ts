import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersinfoServiceService {

  constructor(private http: HttpClient) { }

  public getuserdetails(custid:any):Observable<any>{
    const authtoken=sessionStorage.getItem("token");
    var headers = new HttpHeaders().set("Authorization", `Bearer ${authtoken}` );
      return this.http.get(environment.userurl+`/getuserdetails/${custid}`,{'headers':headers});
    }
}
