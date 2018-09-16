import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import * as M from 'materialize-css'
import 'firebase/functions'

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

  public currentListing;

  constructor(db: AngularFireDatabase) {
    db.list('/airbnb')
    .valueChanges()
    .subscribe(res => {
      $('.preloader-background').fadeOut('slow');
      $('.preloader-wrapper').fadeOut();
      console.log($('.waves-effect.waves-light.btn.view-more').length)
      $('.waves-effect.waves-light.btn.view-more').attr('hidden', <any>false)
        this.listings = res;
        this.listings.sort((a, b) => {
          let keyA = a.danger_index
          let keyB = b.danger_index
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
      });
      this.showed_listings = this.listings.slice(0, this.pageSize);
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
    const functions = firebase.functions();

    //console.log(firebase.auth().currentUser)
    if (!!firebase.auth().currentUser) {
      //console.log(e.target.checked)
      M.toast({html: 'ok'})
      let addVote = firebase.functions().httpsCallable('addVote')
      addVote({id: i}).then((res) => {
        console.log(res.data.text)
      })
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
    if (this.index - this.pageSize < 1) return
    this.index -= this.pageSize
    this.pageNum -= this.pageSize
    this.showed_listings = this.listings.slice(this.index-this.pageSize, this.index);
  }

  ngOnInit() {
  }
}