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
    console.log('this.itemAccount',this.itemAccount);
  }

  async theApiCall(){
    let result = await this.apiService.theApiCall();
    this.accounts = result["accounts"];
    console.log('this.accounts',this.accounts);
    this.isload = true;
  }

  // getItemAccount(){
  //   let numeroCuenta = this.itemAccount["NumeroCuenta"];
  //   for (let index = 0; index < this.accounts.length; index++) {
  //     if (this.accounts[index]["numeroCuenta"] === numeroCuenta) {
  //       this.account = this.accounts[index]   
  //     }
  //   }

  //   console.log('this.account',this.account);
  // }

}
