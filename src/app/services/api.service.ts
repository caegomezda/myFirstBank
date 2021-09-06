import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url1 = environment.urlConfing.URL1
  private  httpOptions:any;
  
  constructor(public http:HttpClient,
              private storage : StorageService) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };
   }

  async newUser(credential,form){
    let uid = credential.user.uid;
    let accessToken = credential.user._delegate.accessToken
    const apiUrl = `${this.url1}${uid}.json?auth=${accessToken}`;
    let json = form
    json = JSON.stringify(json);
    return this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }
  async apiCall(credential){
    let uid = credential["uid"];
    let accessToken = credential["token"]
    const apiUrl = `${this.url1}${uid}.json?auth=${accessToken}`;
    let json = {}
    json = JSON.stringify(json);
    return this.http.get(`${apiUrl}`, json).pipe(map( data => data)).toPromise();
  }

  async theApiCall(){
    let credential = {
      uid:  await this.storage.getIdUser(),
      token:  await this.storage.getToken()
    }
    let result  = await this.apiCall(credential);
    let data = await this.getData(result)
    return data
  }

  async getData(dataJson){
    let data = [];
    for (let key in dataJson) {
      data = dataJson[key] 
    }
    return data
  }
}
