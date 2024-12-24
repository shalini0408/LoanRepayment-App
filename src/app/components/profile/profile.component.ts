import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersinfoServiceService } from 'src/app/services/usersinfo-service/usersinfo-service.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //user!:any;
  customerid: String;
  password: String;;
  //confirmpassword: "123456";
  email: String;
  username: String;

  contact:"xxxxxxxxxx";
  Address:"RZF-28 palam colony new Delhi 110045";
  aadhar:"XXXX-XXXX-XXXX";
  dob:"17-06-1999";
 name:"PAYAL SINGH";
 mailingAddress:"RZF-28 palam colony new Delhi 110045";
  

  constructor(private Activatedroute: ActivatedRoute, private usersinfoService: UsersinfoServiceService, private routingservice:RoutingService) { }

  ngOnInit(): void {

    //const id = this.Activatedroute.snapshot.paramMap.get("id")?.toString()!;

    //console.log(id);
    const id= this.routingservice.getLoggedInUser();
    this.usersinfoService.getuserdetails(id).subscribe(res => {
      if(res != null) {
        this.customerid= res.custid;
        this.password= res.password;
        this.email= res.email;
        this.username= res.username;
      }
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.routingservice.accessLogin();
      
    });
  }

}
