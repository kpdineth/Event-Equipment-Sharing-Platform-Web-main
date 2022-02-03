import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthApi } from 'src/app/apis/authapi';
import { LoginRequest } from 'src/app/models/loginrequest';

@Component({
  selector: 'eesp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  constructor(private _authApi: AuthApi, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue : any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: LoginRequest = {
      Email: login.username,
      Password: login.password
    }

    this._authApi.loginUser('api/accounts/login', userForAuth)
    .subscribe(res => {
       localStorage.setItem("token", res.Token);
       this._authApi.sendAuthStateChangeNotification(res.IsAuthSuccessful);
       this._router.navigate([this._returnUrl]);
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    })
  }

}
