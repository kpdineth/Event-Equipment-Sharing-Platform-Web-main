import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CharityRegistrationComponent } from './components/charity-registration/charity-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CharityAdminApi } from './apis/charityadminapi';
//import { CharityService } from './components/admin/charityadminservice';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { httpInterceptorProviders } from './services/http-interceptors';
import { AuthService } from './services/authservice';
import { AuthApi } from './apis/authapi';
import { AppConfigurationApi } from './apis/appconfigurationapi';
import { AppConfigurationService } from './services/apiconfigurationservice';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorHandlerService } from './services/http-interceptors/error-handler.service';
import { JwtModule } from "@auth0/angular-jwt";
import { CharityRegistrationService } from './services/charityregistrationservice';
import { CharityRegistrationApi } from './apis/charityregistrationapi';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionApi } from './apis/subscriptionapi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NumberToStringPipe } from './components/pipe/numbertostringpipe';
import { CharityUserHomeComponent } from './components/charity-user-home/charity-user-home.component';
import { EditCharityComponent } from './components/edit-charity/edit-charity.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export function loadConfigFromFile(config: AppConfigurationApi) {
  return () => {
    return Promise.all([
      config.load()
    ]);
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CharityRegistrationComponent,
    MenuComponent,
    CharityUserHomeComponent,
    EditCharityComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSelectModule,
    MatFormFieldModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7197"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigFromFile,
      deps: [AppConfigurationService],
      multi: true
    },
    HttpErrorHandler,
    DecimalPipe,
    MessageService,
  //  { provide: CharityApi, useExisting: CharityService },
    { provide: CharityRegistrationApi, useExisting: CharityRegistrationService },
    { provide: AuthApi, useExisting: AuthService },
    { provide: AppConfigurationApi, useExisting: AppConfigurationService },
    {provide: SubscriptionApi, useExisting: SubscriptionService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
    //httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
