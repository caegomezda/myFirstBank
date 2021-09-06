import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  movements:any;
  isload:Boolean = false
  data:any
  constructor(private storage : StorageService,
              private apiService : ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getInfoMovements();
  }

  async getInfoMovements() {
    let keys = [];
    let data = [];
    let result = await this.storage.getItemAccount();
    this.movements = result["movimientos"];
    this.isload = true;
    console.log('this.movements',this.movements);
    for (let key in this.movements) {
      keys.push(key);
    }
    for (let k = 0; k < keys.length; k++) {
      data.push(this.movements[keys[k]])
    }
    this.data = data
  }
}
