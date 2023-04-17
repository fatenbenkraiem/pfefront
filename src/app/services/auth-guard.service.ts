import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router , private authservice:AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
        if (this.authservice.isUserLoggedIn()) {
            return true ;
        }
      
        this.router.navigate(['/admin/login']);
        return false ;
    }
}