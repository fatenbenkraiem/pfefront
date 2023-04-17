import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class userservice {

    private userUrl = "http://127.0.0.1:8000/api/auth";

    constructor(
      private http: HttpClient
    ) { }

    edituser(user :User): Observable<User>
    {
        return this.http.put<User>(this.userUrl+"/edit",user);
    }
    getuser(nom:String): Observable<User> {
      return this.http.get<User>(`${this.userUrl }/nom`+nom);
      } 
    
   
}
