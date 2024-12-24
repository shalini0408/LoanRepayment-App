import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from 'src/app/model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  
  public validateUser(user:User):Observable<any>{
    return this.http.post(environment.loginurl,user)
   
  }
  

}
