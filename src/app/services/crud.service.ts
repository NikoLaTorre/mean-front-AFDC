import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl =  environment.baseUrl;
  private _user: any = JSON.parse(localStorage.getItem("user")!);

  

  get user(){
    return this._user;
  }

  constructor(private http: HttpClient) { }

  read(): Observable<any>{
    const headers = new HttpHeaders()
    .set('x-auth-token', this.user.token);
    return this.http.get(`${this.baseUrl}/task/read`, {headers})
  }

  delete(id: string): Observable<any>{
    const headers = new HttpHeaders()
    .set('x-auth-token', this.user.token);
    return this.http.delete(`${this.baseUrl}/task/delete/${id}`, {headers});
  }

  create(tarea: string): Observable<any>{
    const headers = new HttpHeaders()
    .set('x-auth-token', this.user.token);
    return this.http.post(`${this.baseUrl}/task/create`, {"nombre": tarea}, {headers});
  }

  update(tarea:string, id:string): Observable<any>{
    const headers = new HttpHeaders()
    .set('x-auth-token', this.user.token);
    return this.http.post(`${this.baseUrl}/task/update/${id}`, {"nombre": tarea}, {headers});
  }
}
