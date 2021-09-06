import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {
  itemAccount:any;
  accounts:any;
  account:any;
  isload:any;
  constructor(private storage : StorageService,
              private apiService : ApiService  ) { }

  ionViewWillEnter(){
    this.getAccountInfo();
    this.theApiCall();
  }

  async getAccountInfo(){
    this.itemAccount = await this.storage.getItemAccount();
  }

  async theApiCall(){
    let result = await this.apiService.getAccountData();
    this.accounts = result["accounts"];
    this.isload = true;
  }

}
