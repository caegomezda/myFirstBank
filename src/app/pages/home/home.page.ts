
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  accounts:any;
  isload:Boolean = false;
  constructor(private apiService : ApiService,
              private router : Router) {}

  ionViewWillEnter(){
    this.theApiCall();
  }

  async theApiCall(){
    let result = await this.apiService.theApiCall();
    this.accounts = result["accounts"];
    this.isload = true;
  }

  account(){
    console.log("Profile");
    this.router.navigateByUrl('/profile', { replaceUrl: true });
  }

  more(){
    console.log("MORE");
  }

  statement(){
    console.log("STATMENT");
  }

}
