import { Record } from "immutable";

const SubscriptionRecord = Record({
    ID: 0,
    SubscriptionName: '',
    NumberofItemsCanbBerrowed:0,
    CostOftheItemsBorrowedPerPeriod:0,
    NumberOfUserCanLogin:0
});

export class Subscription extends SubscriptionRecord {

    ID: number;
    SubscriptionName: string;
    NumberofItemsCanbBerrowed:number;
    CostOftheItemsBorrowedPerPeriod:number;
    NumberOfUserCanLogin:number;

    constructor(props : any) {
        super(props);
    }

}
