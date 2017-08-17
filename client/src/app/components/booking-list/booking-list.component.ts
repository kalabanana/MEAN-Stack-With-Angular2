import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { BookService } from "../../services/book.service"
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  message;
  messageClass;
  loading = true;
  reservations;

  constructor(private authService: AuthService,
              private bookService: BookService) { }
  p: number = 1;
  collection: any[];

  ngOnInit() {
    this.getAllReservations();
  }

  getAllReservations(){
    this.bookService.getAllReservations().subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = 'Fail to load all reservations';
      }else {
        this.reservations = data.bookings;
        this.collection = data.bookings;
      }
    })
  };


}
