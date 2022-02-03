// import { throwError as observableThrowError } from 'rxjs/internal/observable/throwError';
// //import { of as observableOf } from 'rxjs/observable/of';
// import { Injectable, Inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map, finalize, retryWhen, concatMap, delay } from 'rxjs/operators';
// import { AppConfigurationApi } from '../apis/appconfigurationapi';
// import { Observable } from 'rxjs/internal/Observable';
// import { of as observableOf } from 'rxjs/internal/observable/of';
// import { APIResponse } from '../models/apiresponse';
// import { Subject } from 'rxjs/internal/Subject';
// import { OperatorFunction, MonoTypeOperatorFunction } from 'rxjs';

// @Injectable()
// export class DataProviderService {
//     private baseUrl: string = '';
//     private apiVersion: string = '';
//     private commomErrorMessage: string = 'Something went wrong please try again';

//     constructor(public http: HttpClient,
//         private appConfigurationApi: AppConfigurationApi,
//         //private messageDialogService: MessageDialogService,
//         //private spinnerService: SpinnerService,
//         //@Inject(AuthApi) public authApi: AuthApi
//     ) {
//         this.baseUrl = this.appConfigurationApi.getBaseUrl();
//         //this.apiVersion = `v${this.appConfigurationApi.getPreDefineApiVersion()}`;
//     }

//     getApiUrl(): string {
//         return `${this.baseUrl}${this.apiVersion}`;
//     }
    
//     baseServiceProvider<T>(next: { source: { source: { source: { value: any; }; }; }; pipe: (arg0: OperatorFunction<APIResponse, T>, arg1: MonoTypeOperatorFunction<unknown>, arg2: OperatorFunction<unknown, unknown>, arg3: MonoTypeOperatorFunction<unknown>) => Observable<T>; }, blnINeedToShowProgress: boolean = false,
//         blnIsNeedToShowOriginalErrorMessage: boolean = false, cacheKey: string = '', handleExceptionInConsole: boolean = false): Observable<T> {
//         if (cacheKey !== '') {
//             let value= sessionStorage.getItem(cacheKey);
//             if(value != null)
//             {
//                 let sessionStorageObject = JSON.parse(value);
//                 if (sessionStorageObject !== null) {
//                     return observableOf(sessionStorageObject);
//                 }
//             }
//         }
//         let requestDetails: any = next.source.source.source.value;
//         //if (blnINeedToShowProgress) { this.spinnerService.show(); }
//         return next.pipe(
//             map((rslt: APIResponse) => {
//                 if (//rslt.error && rslt.error.length > 0 && 
//                     //requestDetails.url.indexOf('admin/UserManagement/lookup/usersandgroups') === -1) {
//                     // if (rslt.status === APIResponseStatus.SECURITY_VIOLATION || rslt.status === APIResponseStatus.NETWORK_CONNECT_TIMEOUT_ERROR) {
//                     //     let messageTitle = ''; let isError = true;
//                     //     if (rslt.error.map(e => e.message).join('\n').toLowerCase() === 'the integrated app data used for this operation has expired due to inactivity. you will need to close this page and start your operation again from the integrated app.') {
//                     //         messageTitle = 'Query data has expired';
//                     //         isError = false;
//                     //     }

//                     //     this.showErrorMessage(rslt.error.map(e => e.message).join('\n'), messageTitle, isError).subscribe((result) => {
//                     //         window.close();
//                     //     });
//                     // } else 
//                     {
//                         //TODO: Show error
//                         //this.showErrorMessage(rslt.error.map(e => e.message).join('\n'));
//                     }
//                 //}
//                 if (cacheKey !== '') {
//                     sessionStorage.setItem(cacheKey, JSON.stringify(rslt.data));
//                 }
//                 return rslt.data as T;
//             }),
//             retryWhen(errors => this.retryFailedRequest(errors, next.source.source.source.value)),
//             catchError((error, httpRequest) => this.handleError(error, httpRequest, blnIsNeedToShowOriginalErrorMessage, handleExceptionInConsole)),
//             finalize(() => { //if (blnINeedToShowProgress) { this.spinnerService.hide(); } 
//             })
//         );
//     }

//     // baseAjaxProvider(dataToPass: any, apiUrl: string): any {
//     //     let returnValue: any = new Object();
//     //     $.ajax({
//     //         type: 'POST',
//     //         url: apiUrl,
//     //         contentType: 'application/json; charset=utf-8',
//     //         data: JSON.stringify(dataToPass),
//     //         dataType: 'json',
//     //         cache: false,
//     //         async: false,
//     //         beforeSend: (request) => {
//     //             //request.setRequestHeader('Authorization', this.authApi.getAuthorizationHeaderValue());
//     //         },
//     //         success: (result) => {
//     //             if (result.data) {
//     //                 returnValue = JSON.parse(result.data);
//     //             } else {
//     //                 returnValue = [];
//     //             }
//     //         },
//     //         error: (request) => {
//     //             console.log(request.responseText);
//     //             return false;
//     //         }
//     //     });

//     //     return returnValue;
//     // }

//     private handleError(error: Response, httpRequest: any, blnIsNeedToShowOriginalErrorMessage: boolean = false, handleExceptionInConsole: boolean = false): Observable<string> {
//         if (handleExceptionInConsole) {
//             console.log(error);
//             return observableThrowError(error.statusText);
//         }
//         if (blnIsNeedToShowOriginalErrorMessage) { return observableThrowError(error.statusText); }
//         let httpRequestValue = httpRequest.source.source.source.source.source.source.value;
//         // if (error.status === APIResponseStatus.UNAUTHORIZED) {
//         //     this.authApi.logOut();
//         //     return observableThrowError(error.statusText);
//         // }
//         //if (this.spinnerService && this.spinnerService.isShowing()) { this.spinnerService.hide(); }
//         // if (error['error'] && error['error'] instanceof Blob) {
//         //     let fr = new FileReader();
//         //     fr.onload = ((result) => {
//         //         let response = JSON.parse(result.target['result']);
//         //         console.log(response);
//         //         if (response.message) {
//         //             this.showErrorMessage(JSON.stringify(httpRequestValue));
//         //         }
//         //     });
//         //     fr.readAsText(error['error']);
//         // } else 
//         {
//             console.log(error);
//             alert('error');
//             //this.showErrorMessage(JSON.stringify(httpRequestValue));
//         }
//         return observableThrowError(error.statusText);
//     }

//     // private showErrorMessage(strErrorText: string, strHeader: string = '', isError: boolean = true): Subject<string> {
//     //     //return this.messageDialogService.show(strHeader, strErrorText, true, isError);
//     // }

//     // private retryFailedRequest(errors: any, httpRequest: any): Observable<any> {
//     //     return errors.pipe(
//     //         concatMap((error, count) => {
//     //             if (count < 3 && httpRequest.method.toLowerCase() === 'get') {
//     //                 return observableOf(error['status']);
//     //             }
//     //             return observableThrowError(error);
//     //         }),
//     //         delay(1000)
//     //     );
//     // }

//     baseServiceForDownloadProvider<T>(next: { pipe: (arg0: MonoTypeOperatorFunction<unknown>, arg1: OperatorFunction<unknown, unknown>, arg2: MonoTypeOperatorFunction<unknown>) => Observable<T>; source: { source: { source: { value: any; }; }; }; }, blnINeedToShowProgress: boolean = false, blnIsNeedToShowOriginalErrorMessage: boolean = false): Observable<T> {
//         // if (blnINeedToShowProgress) {
//         //     this.spinnerService.show();
//         // }
//         return next.pipe(
//             retryWhen(errors => this.retryFailedRequest(errors, next.source.source.source.value)),
//             catchError((error, httpRequest) => this.handleError(error, httpRequest)),
//             finalize(() => {
//                 // if (blnINeedToShowProgress) {
//                 //     this.spinnerService.hide();
//                 // }
//             })
//         );
//     }
// }
