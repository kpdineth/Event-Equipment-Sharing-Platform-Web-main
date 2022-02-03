import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppConfigurationApi } from "../apis/appconfigurationapi";
import { AuthApi } from "../apis/authapi";
import { LoginRequest } from "../models/loginrequest";
import { LoginResponse } from "../models/loginresponse";
import { NewUserRequest } from "../models/newuserrequest";
import { NewUserResponse } from "../models/newuserresponse";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })

export class AuthService implements AuthApi{

    // getAuthToken(): string {
    //     return "thisistempauthtoken";
    // }

    private _authChangeSub = new Subject<boolean>()
    authChanged():Observable<boolean>{
        return this._authChangeSub.asObservable();
    }
    
    constructor(private _http: HttpClient, private _appConfigurationApi:AppConfigurationApi, private _jwtHelper: JwtHelperService) {
      this.sendAuthStateChangeNotification(this.isAuthenticated());
     }
    isAuthenticated(): boolean {
      const token = localStorage.getItem("token");
      return token!= undefined && token != null && !this._jwtHelper.isTokenExpired(token);
    }
    
    registerUser(route: string, body: NewUserRequest): Observable<NewUserResponse> {
        return this._http.post<NewUserResponse>(this.createCompleteRoute(route, this._appConfigurationApi.getBaseUrl()), body);
    }

    loginUser(route: string, body: LoginRequest): Observable<LoginResponse> {
        return this._http.post<LoginResponse>(this.createCompleteRoute(route, this._appConfigurationApi.getBaseUrl()), body);
    }
  
    logout() :void {
      localStorage.removeItem("token");
      this.sendAuthStateChangeNotification(false);
    }
  
    sendAuthStateChangeNotification(isAuthenticated: boolean): void{
      this._authChangeSub.next(isAuthenticated);
    }
  
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}${route}`;
    }

}