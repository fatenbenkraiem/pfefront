import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demandeur } from 'src/app/model/Demandeur';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = "http://127.0.0.1:8000/api/auth";

  constructor(private http: HttpClient) {}
  reservation!: Reservation[]

create (demandeur :Demandeur ):Observable<Demandeur>
{
  return this.http.post<Demandeur>(this.contactUrl+"/user/add" ,demandeur);
}

getcontact(): Observable<Demandeur[]> {
  return this.http.get<Demandeur[]>(this.contactUrl+"/user");
}

deletecontact(id: number): Observable<Demandeur>{
  return this.http.delete<Demandeur>(`${this.contactUrl}/user/delete/`+id);
}

findcontactById(id: number): Observable<Demandeur>{
  return this.http.get<Demandeur>(`${this.contactUrl}/user/`+id);
}
update(demandeur :Demandeur , id:number ):Observable<Demandeur>{
return this.http.put<Demandeur>(this.contactUrl+"/user/edit/"+id,demandeur);
}


}
