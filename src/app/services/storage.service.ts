import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  idUser:any;
  token:any;
  constructor() { }
  //Guarda id del usuario en firebase para hacer consultas
  saveIdUser(id){
    this.idUser = id;
  }
  //Obtiene la del usuario activo
  getIdUser(){
    return this.idUser;
  }

  saveTokenUser(token){
    this.token = token
  }

  getToken(){
    return this.token
  }
}
