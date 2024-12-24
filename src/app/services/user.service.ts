import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:3000/user";

  adduser(user:User):Observable<User> {
    return this.http.post<User>(this.url,user)
                    .pipe(catchError(this.handleError));
  }

  fetchusers():Observable<User[]> {
    return this.http.get<User[]>(this.url)
                    .pipe(catchError((error) => {
                      return throwError(() => {
                        new Error("Please try after some time" + error.message)
                      })
                    }));
  }

  fetchuserById(id:any):Observable<User> {
    return this.http.get<User>(this.url + `/${id}`)
                    .pipe(catchError(this.handleError));
  }

// forgotpassword(data:any){
//   return this.http.post(this.url+"/user",{
// requestType:'Password_RESET',
// email:data}).pipe(catchError(err=>{
//   return  return throwError(() => {
//     new Error("Please try after some time" + error.message)
//   })
// }))
// }
  private handleError(error:HttpErrorResponse) {
    if(error.status === 0) {
      console.log("Error occured, please after some time" + error.statusText);
    } else {
      console.log("Error occured");
    }
    return throwError(()=> new Error("Request cannot be processed, please try after some time"))
    //return throwError(()=> new Error(`${error.message}`));
  }
  constructor(private http:HttpClient) { }
}
