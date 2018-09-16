import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import * as M from 'materialize-css'

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})

export class ListingsComponent implements OnInit {

  public listings: any[];
  public showed_listings;
  public AVERAGE_DANGER_LEVEL = 3572.9931034482747;
  public hidden = false;
  index = 6;
  length = 100;
  pageSize = 6;
  pageNum = 0
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(db: AngularFireDatabase) {
    db.list('/airbnb')
    .valueChanges()
    .subscribe(res => {
        this.listings = res;
        this.listings.sort((a, b) => {
          let keyA = a.danger_index
          let keyB = b.danger_index
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
      });
      this.showed_listings = this.listings.slice(0, this.pageSize);
      console.log(this.showed_listings)
    })
  }

  get_votes(i) {
    console.log(i)
  }

  calculate_relative(danger_level) {
    if(danger_level === 0) {
      return 0
    }
    if(danger_level < this.AVERAGE_DANGER_LEVEL) {
      let num = (danger_level/this.AVERAGE_DANGER_LEVEL*100).toFixed(2);
      return num
    }else {
      this.hidden=true;
      return -1
    }
  }

  image_for_safety(danger_level) {
    const avg = parseInt((danger_level/this.AVERAGE_DANGER_LEVEL*100).toFixed(2))
    if (avg < 30) {
      return 'assets/safety.png'
    } else if (avg < 70) {
      return 'assets/safety-warning.png'
    } else {
      return 'assets/safety-error.png'
    }
  }

  voted(e, i) {
    console.log(i)
    //console.log(firebase.auth().currentUser)
    if (!!firebase.auth().currentUser) {
      //console.log(e.target.checked)
      M.toast({html: 'ok'})
    } else {
      e.preventDefault()
      M.toast({html: 'You must be logged in to use this feature'})
    }
  }

  more() {
    this.index += this.pageSize
    this.pageNum += this.pageSize
    this.showed_listings = this.listings.slice(this.index, this.index+this.pageSize)
  }

  prev() {
    if (this.index - this.pageSize < 0) return
    this.index -= this.pageSize
    this.pageNum -= this.pageSize
    this.showed_listings = this.listings.slice(this.index-this.pageSize, this.index);
  }

  ngOnInit() {
  }
}