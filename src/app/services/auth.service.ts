import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: any;

  get user(){
    return this._user;
  }

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any>{
    return this.http.post<any>("http://localhost:3000/auth/login", data)
    .pipe(
      tap( (res) => {

        if (res.ok){
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
      map( res => res.ok)
    )
  }
}
