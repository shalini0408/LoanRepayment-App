import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { User } from 'src/app/model/user';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  user?: User;
  hide = true;
  constructor(private authService: AuthServiceService, private routingService: RoutingService) { }
  onlogin() {
    //const user = this.userlist.find(obj => obj.customerid===customerid && obj.password===password);
    var flag=false;
    if (this.loginForm.valid) {
      //alert('login successful');    
      //after the login is successful, we are storing the username in the session storage
      this.user = { custid: this.loginForm.get("customerid")?.value, password: this.loginForm.get("password")?.value }
      this.authService.validateUser(this.user).subscribe(res => {
        console.log(res);
        if (res.token != null) {
          sessionStorage.setItem("loginkey", this.loginForm.get('customerid')?.value);
          //console.log(res.token);
          flag=true;
          sessionStorage.setItem("token", res.token);
          environment.maintoken=res.token;
          environment.loggedUser=this.loginForm.get("customerid")?.value.toString();
          
          this.routingService.accessDashboard();
          this.loginForm.reset();
        }else{
          
        }
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.message=("Please enter Valid credentials");  
        //throw error;   //You can also throw the error to a global error handler
      }
      )
    console.log(sessionStorage.getItem("token"));
    }
  }
  accessForget() {
    return this.routingService.accessForget();
  }


  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        customerid: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
    //this.userService.fetchusers().subscribe(res => this.userlist=res);
  }

}
