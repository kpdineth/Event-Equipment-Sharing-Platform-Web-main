import { Observable } from "rxjs/internal/Observable";
import { Charity } from "../models/charity";

export abstract class CharityAdminApi{
    abstract getCharities(): Observable<Charity[]>;
    abstract deleteCharity(id:number): Observable<boolean>;
    abstract updateCharity(charity: Charity): Observable<boolean>;
    abstract charityListAsync():Observable<any>;
}