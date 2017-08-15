import { Component, OnInit } from '@angular/core';
import { BookService } from "../../../services/book.service";
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  booking;
  name;
  party;
  date;
  id;
  telephone;
  currentUrl;

  message
  messageClass;
  loading = true;


  constructor(private bookService : BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.bookService.getReservation(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'confirmation code not found.';
      } else {
        this.booking = data.booking;
        this.name = data.booking.name;
        this.party = data.booking.party;
        this.date = data.booking.date;
        this.id = data.booking._id;
        this.telephone = data.booking.telephone;
        this.loading = false;
      }
    });
  }
}
