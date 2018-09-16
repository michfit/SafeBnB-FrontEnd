import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})

export class ListingsComponent implements OnInit {

  public listings;
  public showed_listings;

  constructor(db: AngularFireDatabase) {
    db.list('/airbnb')
    .valueChanges()
    .subscribe(res => {
        console.log(res)
        this.listings = res;
        this.showed_listings = this.listings.slice(0, 6);
    })
  }

  ngOnInit() {
  }
}
