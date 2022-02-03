import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { AppConfigurationApi } from '../apis/appconfigurationapi';
import { SubscriptionApi } from '../apis/subscriptionapi';
import { Subscription } from '../models/subscriptions';
import { asObservable } from '../state/asObservable';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService implements SubscriptionApi {
  private handleError: HandleError;
  //private _subscriptionList: BehaviorSubject<List<Subscription>> = new BehaviorSubject<List<Subscription>>(List([]));
  private _lstSubscription: Subscription[]=[];
  
    GET_SUBSCRIPTION_URL:string="api/Subscription";

    constructor(private _http: HttpClient,
      httpErrorHandler: HttpErrorHandler,
      private _appConfigurationApi:AppConfigurationApi
      ) {
          this.handleError = httpErrorHandler.createHandleError('SubscriptionService');
          this.loadInitialData();
  }
  getSubscriptionsSync(): Promise<Subscription[]> {
    return this.getSubscriptionsusingApi().toPromise();
  }

  // async getSubscriptionsSync(): Promise<Subscription[]> {
  //   return this.getSubscriptionsusingApi().toPromise();
  // }
  
  loadInitialData() {
    var lstSubscriptions = this.getSubscriptionsusingApi().toPromise().then(lstSubscriptions=>{
      for (let index = 0; index < lstSubscriptions.length; index++) {
        const subscription = lstSubscriptions[index];
        this._lstSubscription.push(
          new Subscription({ ID: subscription.ID, SubscriptionName:subscription.SubscriptionName,
            NumberofItemsCanbBerrowed:subscription.NumberofItemsCanbBerrowed,
            CostOftheItemsBorrowedPerPeriod:subscription.CostOftheItemsBorrowedPerPeriod,
            NumberOfUserCanLogin:subscription.NumberOfUserCanLogin
          })
        );
      }
    });
    
    // this.getSubscriptionsusingApi()
    //     .subscribe(
    //         res => {
    //             let subscriptions = (<Subscription[]>res).map((subscription: Subscription) =>
    //                 new Subscription({ ID: subscription.ID, SubscriptionName:subscription.SubscriptionName,
    //                   NumberofItemsCanbBerrowed:subscription.NumberofItemsCanbBerrowed,
    //                   CostOftheItemsBorrowedPerPeriod:subscription.CostOftheItemsBorrowedPerPeriod,
    //                   NumberOfUserCanLogin:subscription.NumberOfUserCanLogin
    //                 }));

    //             this._subscriptionList.next(List(subscriptions));
    //         },
    //         err => console.log("Error retrieving Subscriptions")
    //     );

}
  
// getSubscriptionsSync(): Subscription[]{
//   return this._lstSubscription;
// }

  getSubscriptions(): Observable<Subscription[]> {
    return this.getSubscriptionsusingApi();
  }

  getSubscriptionsusingApi(): Observable<Subscription[]> {
    return this._http.get<Subscription[]>(this._appConfigurationApi.getBaseUrl() + this.GET_SUBSCRIPTION_URL)
        .pipe(
            catchError(this.handleError('getSubscriptions', [])),
            shareReplay(1)
          );
  }
}
