import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  d = new Date();
  constructor() { }

  //Crea aleatoriamente cuentas para nuevos usuarios
  accoutGenerator(){
    let accounts = [];
    let accoutsname = ["Ahorros","Corriente"]
    let acNumber = Math.round(this.getRandomArbitrary(1,3));
    for (let index = 0; index < acNumber; index++) {
        let anotherNumber = Math.round(this.getRandomArbitrary(0,1));
        accounts.push({
          accoutType:accoutsname[anotherNumber],
          value:this.getRandomArbitrary(25000,5000000)
        });
    }
    return accounts
  }

  // Retorna un número aleatorio entre min (incluido) y max (excluido)
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  fechaHoyInv(Ndias){
    let dd = this.d.getDate() + Ndias;
    let mm = this.d.getMonth() + 1;
    let yy = this.d.getFullYear();
    let myDateString = yy + "-" + mm + "-" +dd
    if (dd<10 && mm>10) {
      myDateString = yy + "-" + mm + "-" + "0" + dd
    } else if (mm<10 && dd>10) {
      myDateString = yy + "-" + "0" + mm + "-"+dd
    }else if(dd<10 && mm<10){
      myDateString = yy + "-" +"0"+ mm + "-" + "0" + dd
    }
    return myDateString
  }
}
