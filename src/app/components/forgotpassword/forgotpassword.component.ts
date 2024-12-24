import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
forgotPasswordForm!:FormGroup;
responseMessage:any; 
constructor(private userService:UserService,private routingservice:RoutingService) { }
get f() {
  return this.forgotPasswordForm.controls;
}
handleSubmit(){
  var formdata=this.forgotPasswordForm.value;
  var data={
    email:formdata
  }
  // this.userService.forgotPassword(data).subscribe(res=>{
  //   console.log(res);
  //})
  // this.userService.f
}
accessLogin(){
this.routingservice.accessLogin();}
  ngOnInit(): void {
    this.forgotPasswordForm=new FormGroup(
      {
        email:new FormControl('',[Validators.required,Validators.email]),
        customerid:new FormControl('',[Validators.required]),
        aadhar:new FormControl('',[Validators.required]),
      dob:new FormControl('',[Validators.required])
        
      }
    );
  }

}
