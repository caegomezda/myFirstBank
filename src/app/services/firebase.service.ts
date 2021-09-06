import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';
import { User } from '../components/interfaces/User';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentUser: User = null;
 
  constructor(private afAuth: AngularFireAuth, 
              private apiService :ApiService,
              private utilities : UtilitiesService,
              private storage : StorageService) {

    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;      
    });
  }
  // Registro en la base de datos
  async signup({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    let creationTime = credential.user.metadata.creationTime;
    let uid = credential.user.uid;
    let createdAccounts = await this.utilities.accoutGenerator();
    let newForm = {
        email: email,
        creationDate:creationTime,
        accounts: createdAccounts,
        uid:uid
    }
    let result = await this.apiService.AddNewUser(credential,newForm);
  }

 //Login con el api
  async signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  sendVerificationEmail(email) {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then((res) => {
          this.storage.saveResVerificationEmail(res);
        })
      });
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
