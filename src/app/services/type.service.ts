import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { ActualitesType } from 'src/app/model/actualite-type';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
 
  private typeUrl = "http://127.0.0.1:8000/api/auth";

  constructor(private http: HttpClient) { }
  actualitesType!: ActualitesType[]


  getAll(): Observable<ActualitesType[]> {
    return this.http.get<ActualitesType[]>("http://127.0.0.1:8000/api/auth/type");
  }

  createActualite(actualite: ActualitesType): Observable<ActualitesType>{
    return this.http.post<ActualitesType>(this.typeUrl+"/type/add",actualite);
  }

  deleteActualite(id: number): Observable<ActualitesType>{
    return this.http.delete<ActualitesType>(`${this.typeUrl}/type/delete/`+id);
  }

  findActualiteById(id: number): Observable<ActualitesType>{
    return this.http.get<ActualitesType>(`${this.typeUrl}/type/`+id);
  }
  updateActualite(actualite: ActualitesType,id:number): Observable<ActualitesType>{
    return this.http.put<ActualitesType>(this.typeUrl+"/type/"+id,actualite);
  }

}
