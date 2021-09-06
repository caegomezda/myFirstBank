import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {
  accounts:any;
  isload:Boolean = false;
  itemAccount:any;
  constructor(private apiService : ApiService,
              private router : Router,
              private storage : StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.theApiCall();
  }

  async theApiCall(){
    let result = await this.apiService.getAccountData();
    this.accounts = result["accounts"];
    this.isload = true;
  }

  async accountStatement(item){
    await this.storage.saveItemAccount(item);
    this.router.navigateByUrl('/balance', { replaceUrl: true });
  }

  addAccount(){
    console.log("Agregar Cuenta");
  }

}
