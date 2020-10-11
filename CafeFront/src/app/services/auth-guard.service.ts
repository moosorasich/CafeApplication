import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router:Router, private authService: CustomerService ) {
 
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean|UrlTree {

      if (!this.authService.isLoggedIn()) {
          alert('You are not allowed to view this page. You are redirected to login Page');
          
          this.router.navigate(["login"]);
          return false;
      } 
      return true;
  }
}
