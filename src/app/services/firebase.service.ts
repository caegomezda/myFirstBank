import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from './api.service';
import { OthersService } from './others.service';
 
export interface User {
  uid: string;
  email: string;
}
 
export interface Message {
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentUser: User = null;
 
  constructor(private afAuth: AngularFireAuth, 
              private afs: AngularFirestore,
              private apiService :ApiService,
              private other : OthersService) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;      
    });
  }

  async signup({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log('credential',credential);
    let date = credential.user.metadata.creationTime;
    let uid = credential.user.uid;
    let accounts = await this.other.accoutGenerator();
    let newForm = {
      email: email,
      creationDate:date,
      accounts: accounts,
      uid:uid
    }
    let result = await this.apiService.newUser(credential,newForm);
    console.log('result',result);
  }
 
  async signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
 
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
