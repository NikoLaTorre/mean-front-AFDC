import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map, of, tap, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =  environment.baseUrl;
  private _user: any;

  get user(){
    return this._user;
  }

  constructor(private http: HttpClient) { }

 

  login(data: any): Observable<any>{
    return this.http.post<any>( `${this.baseUrl}/auth/login` , data)
    .pipe(
      tap( (res) => {

        if (res.ok === true){
          this._user = {
            id: res.id,
            username: res.username,
            token: res.token
          }
        }
        else {
          this._user = null;
        }
      }),
      map( res => res.ok ),
      catchError( err => of(err.error.msg))
    )
  }

  validarToken(): Observable<boolean>{

    const user = JSON.parse(localStorage.getItem("user")!);

    if(user){
      return new Observable( (subscriber) => subscriber.next(true))
    }else{
      return new Observable( (subscriber) => subscriber.next(false))
    }
  }

  register(data: any){
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data)
    .pipe(
      tap( (res) => {

        if (res.ok === true){
          this._user = {
            id: res.id,
            username: res.username,
            token: res.token
          }
        }
        else {
          this._user = null;
        }
      }),
      map( res => res.ok ),
      catchError( err => of(err.error.msg))
    )
  }
  
}

