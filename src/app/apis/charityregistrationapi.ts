import { Observable } from "rxjs/internal/Observable";
import { CharityRegistration } from "../models/charityregistration";

export abstract class CharityRegistrationApi{
    abstract addCharity(charity: CharityRegistration): Observable<any>
}