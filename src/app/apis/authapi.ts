import { Observable, Subject } from "rxjs";
import { LoginRequest } from "../models/loginrequest";
import { LoginResponse } from "../models/loginresponse";
import { NewUserRequest } from "../models/newuserrequest";
import { NewUserResponse } from "../models/newuserresponse";

export abstract class AuthApi{
    //abstract getAuthToken(): string;
    abstract registerUser(route: string, body: NewUserRequest): Observable<NewUserResponse>;
    abstract loginUser(route: string, body: LoginRequest): Observable<LoginResponse>;
    abstract logout(): void;
    abstract sendAuthStateChangeNotification(isAuthenticated: boolean): void;
    abstract authChanged():Observable<boolean>;
    abstract   isAuthenticated(): boolean;
}