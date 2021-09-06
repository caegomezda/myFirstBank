import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url1 = environment.urlConfing.URL1
  private  httpOptions:any;
  
  constructor(public http:HttpClient) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };
   }

  async newUser(credecial,form){
    console.log('credecial',credecial);
    let uid = credecial.user.uid;
    let accessToken = credecial.user._delegate.accessToken
    const apiUrl = `${this.url1}${uid}.json?auth=${accessToken}`;
    let json = form
    json = JSON.stringify(json);
    
    return this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }
}
