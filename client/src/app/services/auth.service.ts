import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from "@angular/http"
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080"; // Development Domain - Not Needed in Production
  authToken;
  owner;
  options;

  constructor(
    private http: Http //import module
  ) { }

  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerOwner(owner){
    return this.http.post(this.domain + '/authentication/register', owner).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }

  updateOwner(owner){
    return this.http.put(this.domain+'/authentication/updateOwner/', owner, this.options).map(res => {
      console.log("send profile to database");
      console.log(res);
      return res.json()});
  }

  login(owner){
    return this.http.post(this.domain + '/authentication/login', owner, this.options).map(res => res.json());
  }


  loggedIn(){
    return tokenNotExpired();
  }
  logout(){
    this.authToken = null;
    this.owner =null;
    localStorage.clear();
  }
  storeOwnerData(token, owner) {
    localStorage.setItem('token', token);
    localStorage.setItem('owner', JSON.stringify(owner)); //
    this.authToken = token; //
    this.owner = owner; //
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => {
      return res.json()
    });
  }
}
