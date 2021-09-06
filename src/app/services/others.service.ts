import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OthersService {

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
}
