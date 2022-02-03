import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharityRegistrationComponent } from './components/charity-registration/charity-registration.component';
import { CharityUserHomeComponent } from './components/charity-user-home/charity-user-home.component';
import { EditCharityComponent } from './components/edit-charity/edit-charity.component';
import { HomeComponent } from './components/home/home.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: HomeComponent },
  {path:'register/charity', component: CharityRegistrationComponent},
  {path:'charity/home', component: CharityUserHomeComponent,canActivate: [AuthGuard]},
  {path:'charity/users', component: UserListComponent,canActivate: [AuthGuard]},
  {path:'charity/users/add', component: AddUserComponent,canActivate: [AuthGuard]},
  {path:'charity/users/edit', component: EditUserComponent,canActivate: [AuthGuard]},
  {path:'charity/edit', component: EditCharityComponent,canActivate: [AuthGuard]},
//  {path:'charity/list', component:CharityListComponent,canActivate: [AuthGuard]},
  { path: 'authentication', loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
