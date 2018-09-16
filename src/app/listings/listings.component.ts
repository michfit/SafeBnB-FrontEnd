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
  public AVERAGE_DANGER_LEVEL = 3572.9931034482747;

  constructor(db: AngularFireDatabase) {
    db.list('/')
    .valueChanges()
    .subscribe(res => {
        // console.log(res)
        this.listings = res;
        this.listings.sort(function(a, b){
          let keyA = a.danger_index
          let keyB = b.danger_index
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
      });
        this.showed_listings = this.listings.slice(0, 6);
        console.log(this.showed_listings);
    })
  }

  calculate_relative(danger_level) {
    if(danger_level === 0) {
      return "Safest Area";
    }
    if(danger_level < this.AVERAGE_DANGER_LEVEL) {
      let num = (danger_level/this.AVERAGE_DANGER_LEVEL*100).toFixed(2);
      return `${num} % Average Crime Index`;
    }
  }

  ngOnInit() {
  }
}
