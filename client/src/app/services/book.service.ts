import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from "@angular/http"
import { AuthService} from "./auth.service"

@Injectable()
export class BookService{
  domain = "http://localhost:8080";
  options;
  authToken;

  constructor(private http: Http, private authService: AuthService) { }

  // submits to save data OK
  onReserveSubmit(booking){
    return this.http.post(this.domain + '/reservation/home', booking).map(res => {
      console.log('sending data')
      return res.json()}); //ok
  }

  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getReservation(id){
    return this.http.get(this.domain + '/reservation/confirm/' + id).map(res => {
      console.log('getting data')
      return res.json();
    })
  }
}
