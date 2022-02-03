import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { CharityAdminApi } from 'src/app/apis/charityadminapi';
import { Charity } from 'src/app/models/charity';
import { of } from 'rxjs';
import { SubscriptionApi } from 'src/app/apis/subscriptionapi';

@Component({
  selector: 'app-charity-list',
  templateUrl: './charity-list.component.html',
  styleUrls: ['./charity-list.component.css']
})
export class CharityListComponent implements OnInit,AfterViewInit {

  _lstCharities: Charity[] = [];
  filter = new FormControl('');
  charities$: Observable<Charity[]>;

  deleteSubject = new Subject();

   constructor(private _charityService:CharityAdminApi,private pipe: DecimalPipe,private _router: Router) {
  }
  get charityList() {
    return this._charityService.charityListAsync();
  }
  ngAfterViewInit(): void {
    
  }
  // onAddClick():void{
  //   //this.router.navigateByUrl('/register/charity');
  // }

  search(text: string, pipe: PipeTransform): Charity[] {
    console.log('search called');
    console.log(text);
    //if(text==='')
    //  return this._lstCharities;

    return this._lstCharities.filter(charity => {
      const term = text.toLowerCase();
      return charity.Name.toLowerCase().includes(term)
        || charity.Email.toLowerCase().includes(term);
          //|| pipe.transform(country.area).includes(term)
          //|| pipe.transform(country.population).includes(term);
    });
  }

  ngOnInit(): void {
    this.charities$=this._charityService.getCharities();
    this.charities$
      .subscribe(charities => {
        this._lstCharities = charities;
        this.charities$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe))
        ); 
      });
      
  }
 
  onDeleteClick(id:number):void{
    //TODO: Add confirm.
    this._charityService.deleteCharity(id).subscribe(response =>{
        alert('Charity Deleted!');
    });

  }

  onUpdateClick(charity:Charity):void{
    charity = charity.set('Approved',true)
    //charity.Approved=true;
    this._charityService.updateCharity(charity).subscribe(response =>{
        alert('Charity Updated!');
        
    });

  }

}
