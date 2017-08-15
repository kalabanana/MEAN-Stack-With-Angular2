import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from "@angular/http"

@Injectable()
export class BookService{
  domain = "http://localhost:8080";

  constructor(private http: Http) { }

  // submits to save data
  onReserveSubmit(booking){
    return this.http.post(this.domain + '/reservation/home', booking).map(res => {
      console.log('sending data')
      return res.json()}); //ok
  }

  // getReservation(){
  //   return this.http.get(this.domain + '/reservation/confirm').map(res => {
  //     console.log('getting data')
  //     return res.json();
  //   })
  // }
}
