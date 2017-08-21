import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerModel } from "./customer-list.model";
import { BookService } from "../../services/book.service"
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],

})
export class CustomerListComponent implements OnInit {

  //grouped with name and telephone
  contacts =  new Map <String, CustomerModel>();
  //contact's booking list
  bookingList: any;
  //pastBookings: any;
  contactList: any;
  processing;
  loading;
  message;
  messageClass;

  selectedContact: CustomerModel;



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
        /* All of the returned bookings are listed here*/
        // returns all bookings
        this.bookingList = Array.from(data.bookings);
        this.bookingList.map(booking => {
          // check if inside contact map has a registered telephone already
            if(this.contacts.has(booking.telephone)){
              // then just add one to that booking of pastBookings array
              this.contacts.get(booking.telephone).pastBookings.push(booking);
              //console.log(this.contacts.get(booking.telephone).pastBookings);



            }else {
              // else create new customer model with the name and telephone
              const contact = new CustomerModel(booking.name, booking.telephone);
              //then add the model to booking
              contact.pastBookings.push(booking);
              //set the map of contacts to the id as the telephone and a contact model(with name and telephone)
              //console.log(contact.pastBookings);
              this.contacts.set(booking.telephone, contact);}
        });
        // add the map of contact value to an array of contact list
        this.contactList = Array.from(this.contacts.values());
        //has all of the pastBooking in the contactList
        //console.log(Array.from(this.contactList.name))
        this.contactList = this.groupByName(this.contactList);
        console.log(this.contactList);
      }
    })
  }

  groupByName(contactList: CustomerModel[]){
    const contactMap = new Map<String, CustomerModel[]>();
    this.contactList.map(contact =>{
      let alphab = contact.name.charAt(0).toUpperCase();
      if (!contactMap.has(alphab)){
        contactMap.set(alphab, []);
      }
      contactMap.get(alphab).push(contact);
    });
    return Array.from(contactMap).sort();
  }

  // onSelect(contactList: CustomerModel[]){
  //   this.contactList.map(contact =>{
  //     let customerInfo = contact.pastBookings
  //   })
  // }

  onSelect(contact: CustomerModel): void{
    this.selectedContact = contact;
    //
    // console.log(this.selectedContact)
  }

}
