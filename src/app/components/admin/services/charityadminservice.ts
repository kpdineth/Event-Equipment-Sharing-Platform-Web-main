import { Injectable } from "@angular/core";
import { CharityAdminApi } from "../../../apis/charityadminapi";
import { Charity } from "../../../models/charity";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HandleError, HttpErrorHandler } from "../../../services/http-error-handler.service";
import { AppConfigurationApi } from "../../../apis/appconfigurationapi";
import { tap, catchError, shareReplay } from 'rxjs/operators';
import {List} from 'immutable';
import { asObservable } from "src/app/state/asObservable";
import { SubscriptionApi } from "src/app/apis/subscriptionapi";
import { Subscription } from "src/app/models/subscriptions";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  
@Injectable({ providedIn: 'root' })

export class CharityAdminService implements CharityAdminApi{
   private _charityList: BehaviorSubject<List<Charity>> = new BehaviorSubject<List<Charity>>(List([]));

    private handleError: HandleError;
    GET_CHARITIES_URL:string="api/admin/Charity";
    DELETE_CHARITY_URL:string="api/admin/Charity";
    UPDATE_CHARITY_URL:string="api/admin/Charity";
    private _lstSubscriptions:Subscription[]=[];
    
    constructor(private _http: HttpClient,
        httpErrorHandler: HttpErrorHandler,
        private _appConfigurationApi:AppConfigurationApi,
        private _subscriptionApi:SubscriptionApi
        ) {
            this.handleError = httpErrorHandler.createHandleError('CharityService');
            //var lstSubscriptions = this._subscriptionApi.getSubscriptionsSync();
            this._subscriptionApi.getSubscriptions().subscribe(result=>{
              this._lstSubscriptions = result;
              this.loadInitialData();
            });
    }
    charityListAsync() :Observable<any>{
      return asObservable(this._charityList);
    }

    loadInitialData() {
      this.getCharities()
          .subscribe(
              res => {
                  let charities = (<Charity[]>res).map((charity: Charity) =>
                      new Charity({ ID: charity.ID, Name:charity.Name,Email:charity.Email, Address1:charity.Address1, 
                      Address2:charity.Address2,
                      Suburb:charity.Suburb,
                      State:charity.State,
                      Postcode:charity.Postcode,
                      Country_ID:charity.Country_ID,
                      Subscription_ID:charity.Subscription_ID,
                      SubScriptionName:this._lstSubscriptions.find(s => s.ID == charity.Subscription_ID)?.SubscriptionName,
                      Approved:charity.Approved
                      }));

                  this._charityList.next(List(charities));
              },
              err => console.log("Error retrieving Charities")
          );

  }

  deleteCharity(id:number): Observable<boolean> {
    let obs: Observable<boolean> = this.deleteCharityById(id);

    obs.subscribe(
            res => {
                let charities: List<Charity> = this._charityList.getValue();
                let index = charities.findIndex((charity) => charity.ID === id);
                this._charityList.next(charities.delete(index));
            }
        );

        return obs;
    }

  deleteCharityById(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this._appConfigurationApi.getBaseUrl() + this.DELETE_CHARITY_URL + "/" + id)
        .pipe(
            catchError(this.handleError('deleteCharity',false)),
            shareReplay(1)
          );
  }

    getCharities(): Observable<Charity[]> {
        return this._http.get<Charity[]>(this._appConfigurationApi.getBaseUrl() + this.GET_CHARITIES_URL)
        .pipe(
            catchError(this.handleError('getCharities', []))
          );
    }

    updateCharity(charity: Charity): Observable<boolean> {
      return this._http.put<boolean>(this._appConfigurationApi.getBaseUrl() + this.UPDATE_CHARITY_URL + "/" + charity.ID, charity)
          .pipe(
              catchError(this.handleError('updateCharity',false))
            );
    }

    // addCharity(charity: CharityRegistration): Observable<any> {
    //         return this._http.post<CharityRegistration>(this._appConfigurationApi.getBaseUrl() + this.ADD_CHARITIES_URL, charity, httpOptions).pipe(
    //           tap((newCharity: CharityRegistration) => this.log(`added charity w/ id=${newCharity.ID}`)),
    //           catchError(this.handleError<CharityRegistration>('addCharity'))
    //         );
    //       }
    // log(msg: string): void {
    //     console.log(msg);
    // }
    
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