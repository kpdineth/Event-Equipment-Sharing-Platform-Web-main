import { Component, OnInit } from '@angular/core';
import { CharityRegistration } from 'src/app/models/charityregistration';

@Component({
  selector: 'eesp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  charityLink='/register/charity';

  cardsData:any=[
    {
      image:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg',
      description: `Some quick example text to build on the card title and make up the bulk of the card's content`
    },
    {
      image:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg',
      description:`Some quick example text to build on the card title and make up the bulk of the card's content`
    },
    {
      image:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg',
      description:`Some quick example text to build on the card title and make up the bulk of the card's content`
    },
    {
      image:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg',
      description:`Some quick example text to build on the card title and make up the bulk of the card's content`
    },
    {
      image:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg',
      description:`Some quick example text to build on the card title and make up the bulk of the card's content`
    },
    {
      image:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg',
      description:`Some quick example text to build on the card title and make up the bulk of the card's content`
    },
  ]

  constructor() { 
  }

  ngOnInit(): void {
  }

}
