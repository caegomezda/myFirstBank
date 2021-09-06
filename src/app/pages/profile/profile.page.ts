import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage{
  profile:any;
  isload:Boolean = false;
  constructor(private apiService : ApiService) { }

  ionViewWillEnter(){
    this.theApiCall();
  }
  
  async theApiCall(){
    let result = await this.apiService.getAccountData();
    this.profile = result["profile"];
    this.isload = true;
    console.log('profile',this.profile);
  }

}
