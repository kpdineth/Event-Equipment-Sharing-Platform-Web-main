import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Configuration } from '../models/configuration';
import { AppConfigurationApi } from '../apis/appconfigurationapi';

@Injectable({
    providedIn: 'root'
})
export class AppConfigurationService implements AppConfigurationApi {
    private baseUrl: string = '';
   // private apiVersion: number;
    //private clientSetting: ClientSetting;
    private loadConfigurationPromise: Promise<void> ;
    constructor(private http: HttpClient) { } 
    getBaseUrl(): string {
        return this.baseUrl;
    }

    load(): Promise<void> {
        if (!this.loadConfigurationPromise) {
            this.loadConfigurationPromise = new Promise<void>((resolve) => {
                let request: any = null;
                switch (environment.envname) {
                    case 'prod': {
                        request = this.http.get(`assets/configuration/configuration.${environment.envname}.json`);
                    } break;

                    case 'dev': {
                        request = this.http.get(`assets/configuration/configuration.${environment.envname}.json`);
                    } break;

                    case 'default': {
                        console.error('Environment is not set or invalid');
                        resolve();
                    } break;
                }
                request.subscribe((result: Configuration) => {
                    const config = result as Configuration;
                    this.baseUrl = config.baseurl;
                    resolve();
                },
                    (error: any) => { console.error(error); });
            });
        }
        return this.loadConfigurationPromise;
    }

    // loadClientSettings(): Promise<{}> {
    //     return new Promise((resolve) => {
    //         const headers = new HttpHeaders().set('X-Skip-Interceptor', '');
    //         this.http.get(`${this.clientsettingapiurl}${window.location.host}`, { headers }).subscribe(result => {
    //             const config = result as ClientSetting;
    //             if (this.checkIfSupportLogin()) {
    //                 config.client_id = config.client_id;                  
    //             }
    //             resolve();
    //         },
    //             error => { console.error(error); });
    //     });
    // }

    
    getQueryStringValue(key: string): string {
        return decodeURIComponent(window.location.href.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
    }

    
}

