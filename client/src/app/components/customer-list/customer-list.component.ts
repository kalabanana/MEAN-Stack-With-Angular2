import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerModel } from "./customer-list.model";
import { BookService } from "../../services/book.service"
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],

})
export class CustomerListComponent implements OnInit {

  counts;
  contacts =  new Map <String, CustomerModel>();
  bookingList = [];
  contactList: any;
  processing;
  loading;
  message;
  messageClass;



  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.createCusList();
  }

  createCusList(){
    this.bookService.getAllReservations().subscribe(data =>{
      if(!data.success){
        this.processing = true;
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.bookingList = Array.from(data.bookings);
        this.bookingList.map(booking => {
            if(this.contacts.has(booking.telephone)){
              this.contacts.get(booking.telephone).pastBookings.push(booking);
            }else {
              const contact = new CustomerModel(booking.name, booking.telephone);
              contact.pastBookings.push(booking);
              this.contacts.set(booking.telephone,contact);
          }
        });

        this.contactList = Array.from(this.contacts.values());
        console.log(this.contactList);
        this.contactList = this.groupByName(this.contactList);
      }
    })
  }

  groupByName(contactList: CustomerModel[]){
    const customerMap = new Map<String, CustomerModel[]>();
    this.contactList.map(customer =>{
      let alphab = customer.name.charAt(0).toUpperCase();
      if (!customerMap.has(alphab)){
        customerMap.set(alphab, []);
      }
      customerMap.get(alphab).push(customer);
    });
    return Array.from(customerMap);
  }
}
