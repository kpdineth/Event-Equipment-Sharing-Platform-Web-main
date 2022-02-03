import { Observable } from "rxjs/internal/Observable";
import { Subscription } from "../models/subscriptions";

export abstract class SubscriptionApi{
    abstract getSubscriptions(): Observable<Subscription[]>;
    //abstract getSubscriptionsSync(): Subscription[];
    abstract getSubscriptionsSync(): Promise<Subscription[]>
    
}