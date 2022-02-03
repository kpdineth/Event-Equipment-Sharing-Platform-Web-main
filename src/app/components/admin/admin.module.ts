import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CharityListComponent } from './charity-list/charity-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CharityAdminApi } from 'src/app/apis/charityadminapi';
import { CharityAdminService } from './services/charityadminservice';
import { AuthGuard } from 'src/app/services/auth.guard';
import { NumberToStringPipe } from '../pipe/numbertostringpipe';

@NgModule({
  declarations: [
    AdminHomeComponent,
    CharityListComponent,
    NumberToStringPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
  //    { path: 'register', component: RegisterUserComponent },
      { path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard]},
      { path: 'charitylist', component: CharityListComponent,canActivate: [AuthGuard] },

    ])
  ],
  providers: [
    { provide: CharityAdminApi, useExisting: CharityAdminService },
  ]
})
export class AdminModule { }
