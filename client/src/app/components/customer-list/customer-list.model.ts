import { OnInit } from "@angular/core"

export class CustomerModel {
  name: String;
  telephone:String;
  date: Date;
  party: Number;
  tableId: Number;
  pastBookings: Array<Object>;

  constructor(name, telephone){
    this.name = name;
    this.telephone = telephone;
    this.pastBookings = [];
  }
}
