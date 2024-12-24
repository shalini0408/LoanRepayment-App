import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinauthGuard implements CanActivate {

  constructor(private routingService:RoutingService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let user=this.routingService.getLoggedInUser();
      console.log("FDSGFDGDF"+environment.maintoken);
      
      if (user != null &&sessionStorage.getItem("token")==environment.maintoken) {
        this.routingService.accessDashboard();
        return false;
      }

    return true;
  }
  
}
