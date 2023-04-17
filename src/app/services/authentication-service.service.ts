import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SESSION ='authenticatedUser'

  public email: String="";
  public password: String ="";

  constructor(private http: HttpClient) {

  }
  authenticationService( userauth:User) {
    
    this.email =  userauth.email;
    this.password =  userauth.password;
       
    return this.http.post(`http://localhost:8000/api/auth/login`,userauth);
  }

  savesession(id: number, token: String) {
    sessionStorage.setItem(this.SESSION, token.toString())
    sessionStorage.setItem("id", id.toString())
  } 
  registeruser(userauth:User){
    return this.http.post(`http://localhost:8000/api/auth/register`,userauth);
  } 
  isUserLoggedIn() {
     if (sessionStorage.getItem(this.SESSION) === null) return false
    return true
  }
logout(){
  console.log(sessionStorage.getItem(this.SESSION))
  console.log(sessionStorage.getItem("password"))
  sessionStorage.removeItem(this.SESSION)
}
  
}