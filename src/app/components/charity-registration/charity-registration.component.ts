import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CharityRegistrationApi } from 'src/app/apis/charityregistrationapi';
import { SubscriptionApi } from 'src/app/apis/subscriptionapi';
import { CharityRegistration } from 'src/app/models/charityregistration';
import { Country } from 'src/app/models/country';
import { Subscription } from 'src/app/models/subscriptions';

@Component({
  selector: 'eesp-charity-registration',
  templateUrl: './charity-registration.component.html',
  styleUrls: ['./charity-registration.component.css']
})
export class CharityRegistrationComponent implements OnInit {

  charity:CharityRegistration={ID :0, Country_ID:1, Subscription_ID:3 } as CharityRegistration;
  _subscriptions:Observable<Subscription[]>;
  showError:boolean = false;
  errorMessage:string='';

  _Country: Country[] = [
    {ID:1, Name:"Australia"},
    {ID:2,Name: 'USA' }
  ];
  
  
  constructor(private _charityRegistrationApi: CharityRegistrationApi,private _router: Router, private _subscriptionApi: SubscriptionApi) {
    
   }

  ngOnInit(): void {
    this._subscriptions = this._subscriptionApi.getSubscriptions();
  }

  changeCountry(e:any) {
    // this.cityName.setValue(e.target.value, {
    //   onlySelf: true
    // })
  }

  onAddClick():void{
    this.showError=false;

    this._charityRegistrationApi.addCharity(this.charity).subscribe(response =>{
      if(response.Success )
        this.charity.ID=response.ID; 
      else{
        this.showError=true;
        this.errorMessage = response.Message + "\nError Detail:";
        for (let index = 0; index < response.ValidationErrors.length; index++) {
          const element = response.ValidationErrors[index];
          this.errorMessage +=element + "\n";
                }
      }
    },
    error => alert(`Error : ${error}`));
  }

  // onUpdateClick():void{
  //   alert('add clicked for id ' + this.charity.ID + ' and name=' + this.charity.Name + '- and email :' + this.charity.Email);
  // }
}
