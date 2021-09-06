import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  idUser:any;
  constructor() { }

  saveIdUser(id){
    this.idUser = id;
  }

  getIdUser(){
    return this.idUser;
  }
}
