import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { AppConfigurationApi } from "../apis/appconfigurationapi";
import { tap, catchError } from 'rxjs/operators';
import { CharityRegistrationApi } from "../apis/charityregistrationapi";
import { CharityRegistration } from "../models/charityregistration";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  
@Injectable({ providedIn: 'root' })

export class CharityRegistrationService implements CharityRegistrationApi{
    private handleError: HandleError;
    GET_CHARITIES_URL:string="api/Charity";
    ADD_CHARITIES_URL:string="api/CharityRegistration";
    
    constructor(private _http: HttpClient,
        httpErrorHandler: HttpErrorHandler,
        private _appConfigurationApi:AppConfigurationApi
        ) {
            this.handleError = httpErrorHandler.createHandleError('CharityService');
    }

    // getCharities(): Observable<Charity[]> {
    //     return this._http.get<Charity[]>(this._appConfigurationApi.getBaseUrl() + this.GET_CHARITIES_URL)
    //     .pipe(
    //         catchError(this.handleError('getCharities', []))
    //       );
    // }

    addCharity(charity: CharityRegistration): Observable<any> {
            return this._http.post<CharityRegistration>(this._appConfigurationApi.getBaseUrl() + this.ADD_CHARITIES_URL, charity, httpOptions).pipe(
              tap((newCharity: CharityRegistration) => this.log(`added charity w/ id=${newCharity.ID}`)),
              catchError(this.handleError<CharityRegistration>('addCharity'))
            );
          }
    log(msg: string): void {
        console.log(msg);
    }
    
    //Only for testing
    // getMockCharity():Observable<Charity[]>{
    //     let lstCharities:Charity[]=[
    //         {id:1, name:'Himal Patel', email:'himalpatel@gmail.com'},
    //         {id:2, name:'Test User-1', email:'testemail@gmail.com'},
    //         {id:3, name:'Test User-2', email:'myemail@gmail.com'}
    //     ];
    //     return of(lstCharities);
    // }
}