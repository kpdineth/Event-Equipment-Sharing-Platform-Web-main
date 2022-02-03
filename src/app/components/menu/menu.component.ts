import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from 'src/app/apis/authapi';

@Component({
  selector: 'eesp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isUserAuthenticated: boolean;

  constructor(private _authApi: AuthApi, private _router: Router) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this._authApi.isAuthenticated();
    this._authApi.authChanged().subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  public logout = () => {
    this._authApi.logout();
    this._router.navigate(["/"]);
  }

}
