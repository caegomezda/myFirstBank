
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  accounts:any;
  isload:Boolean = false;
  constructor(private apiService : ApiService,
              private router : Router,
              private storage : StorageService) {}

  ionViewWillEnter(){
    this.theApiCall();
  }

  async theApiCall(){
    let result = await this.apiService.theApiCall();
    this.accounts = result["accounts"];
    this.isload = true;
  }

  account(){
    this.router.navigateByUrl('/profile', { replaceUrl: true });
  }

  more(){
    console.log("MORE");
  }

  statement(){
    console.log("STATMENT");
  }

  async goAccount(item){
    console.log('item',item);
    await this.storage.saveItemAccount(item);
    this.router.navigateByUrl('/account', { replaceUrl: true });
  }

}
