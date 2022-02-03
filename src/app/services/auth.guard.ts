import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthApi } from '../apis/authapi';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authApi: AuthApi, private _router: Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this._authApi.isAuthenticated()) {
      return true;
    }
    this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
