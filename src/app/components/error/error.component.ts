import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private routingService:RoutingService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.routingService.accessLogin();
    },2000);
  }

}
