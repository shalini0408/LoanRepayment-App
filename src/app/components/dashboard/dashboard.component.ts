import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id : any;
  
  constructor(private routingservice: RoutingService) { 
   this.id = 1;
  }
  onlogoutclick()
  {
    sessionStorage.removeItem("loginkey");
    this.routingservice.accessLogin();
    
  }
  ngOnInit(): void {
  }

}
