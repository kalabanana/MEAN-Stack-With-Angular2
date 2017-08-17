import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from "@angular/http"
import { AuthService } from "./auth.service"

@Injectable()
export class CustomerService {

  domain = "http://localhost:8080";
  options;
  authToken;

  constructor(private http: Http, private authService: AuthService) { }

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

  getCustomer(){
    this.createAuthenticationHeaders();
    //
  }
}
