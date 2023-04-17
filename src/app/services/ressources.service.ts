import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  private ressourcesUrl = "http://127.0.0.1:8000/api/auth";

  constructor( private http: HttpClient) { }
 
  getAll(): Observable<ActualiteRes[]> {
    return this.http.get<ActualiteRes[]>(this.ressourcesUrl+"/ressource");
  }
  createActualite(actualite: ActualiteRes,id:any): Observable<ActualiteRes>{
    return this.http.post<ActualiteRes>(`${this.ressourcesUrl}` + `/ressource/add/`+id,actualite);
  }

 deleteActualite(id: number): Observable<ActualiteRes>{
    return this.http.delete<ActualiteRes>(`${this.ressourcesUrl}/ressource/delete/`+id);
  }
  findActualiteById(id: number): Observable<ActualiteRes>{
    return this.http.get<ActualiteRes>(`${this.ressourcesUrl}/ressource/`+id);
  }
  updateActualite(actualite: ActualiteRes,id:number): Observable<ActualiteRes>{
    return this.http.put<ActualiteRes>(this.ressourcesUrl+"/ressource/edit/"+id,actualite);
  }

 
}
