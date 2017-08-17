import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from "@angular/http"
import { AuthService } from "./auth.service"

@Injectable()
export class AllBookingService {
  options;
  authToken;
  domain = "http://localhost:8080";

  constructor(private http: Http, private authService: AuthService) {

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

  getAllReservations(){
    //this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/reservation/allReservations', this.options).map(res => {
      console.log('getting all reservations');
      return res.json();
    })
  }

}
