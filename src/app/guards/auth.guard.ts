import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean  {
    return this._authService.validarToken().pipe(
      tap( valid => {
        if (!valid) {
          this.router.navigateByUrl("/auth")
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | boolean  {
    return this._authService.validarToken().pipe(
      tap( valid => {
        if (!valid) {
          this.router.navigateByUrl("/auth")
        }
      })
    );
  }
}
