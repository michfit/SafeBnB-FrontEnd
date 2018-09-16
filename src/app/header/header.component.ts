import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private observerSet = false
  public isSignedIn = false

  constructor(public afAuth: AngularFireAuth) {
    this.signedIn = this.signedIn.bind(this)
    this.authObserver = this.authObserver.bind(this)
    this.signedIn()
  }

  doLogin() {
    if(this.isSignedIn) {
      return
    }
    if(!this.observerSet) {
      firebase.auth().onAuthStateChanged(this.authObserver);
      this.observerSet = true
    }
    return new Promise<any>(async (resolve, reject) => {
      const prov = new firebase.auth.GoogleAuthProvider()
      resolve(await this.afAuth.auth.signInWithPopup(prov)
    )})
  }

  authObserver(user) {
    if(user) {
      this.signedIn()
    }
  }

  public signedIn(): boolean {
    this.isSignedIn = !!firebase.auth().currentUser
    return !!firebase.auth().currentUser
  }

  ngOnInit() {}

}
