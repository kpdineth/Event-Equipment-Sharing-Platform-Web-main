
// export interface Charity {
//     ID: number;
//     Name: string;
//     Email: string;
//     Address1:string;
//     Address2:string;
//     Suburb:string;
//     State:string;
//     Postcode:number;
//     Country_ID:number;
//     Password:string;
//     Subscription_ID:number;
//     Manager_ID:string;
//     Approved:boolean;
// }

import { Record } from "immutable";

const CharityRecord = Record({
    ID: 0,
    Name: '',
    Email: '',
    Address1:'',
    Address2:'',
    Suburb:'',
    State:'',
    Postcode:0,
    Country_ID:0,
    Password:'',
    Subscription_ID:0,
    SubScriptionName:'',
    Manager_ID:'',
    Approved:false
});

export class Charity extends CharityRecord {

    ID: number;
    Name: string;
    Email: string;
    Address1:string;
    Address2:string;
    Suburb:string;
    State:string;
    Postcode:number;
    Country_ID:number;
    Password:string;
    Subscription_ID:number;
    SubScriptionName:string;
    Manager_ID:string;
    Approved:boolean;

    constructor(props : any) {
        super(props);
    }

}
