import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from "@angular/http"

@Injectable()
export class AuthService {

  domain  = "http://localhost:8080";
  authToken;
  owner;

  constructor(
    private http: Http //import module
  ) { }

  registerOwner(owner){
    return this.http.post(this.domain+"/authentication/register", owner).map(res => res.json());
  }
  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }
  test(){
    return this.http.post(this.domain, {test: "testing"});
  }



  // login(owner){
  //   return this.http.post(this.domain + '/authentication/login', owner).map(res => res.json());
  // }
  // storeOwnerData(token, owner){
  //   localStorage.setItem('token',token);
  //   localStorage.setItem('owner',JSON.stringify(owner));
  //   this.authToken = token;
  //   this.owner = owner;
  // }
}
