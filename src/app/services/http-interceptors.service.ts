import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptors implements HttpInterceptor{
 

  constructor(private authenticationService :AuthenticationService ) {

   }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
      
      if (request.url.search('/api/auth/login') === -1  ) {
     if (this.authenticationService.isUserLoggedIn())
     {
     
    
     let token :any =sessionStorage.getItem('authenticatedUser');
      console.log(token)
 
        const authReq = request.clone({
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }) 
    });
    console.log(request);   
    return next.handle(authReq);
  }
else
{
  return  next.handle(request);
}     }
 else
{
  return  next.handle(request);

}
}
}