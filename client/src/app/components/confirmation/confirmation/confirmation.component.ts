import { Component, OnInit } from '@angular/core';
import { BookService } from "../../../services/book.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  name
  date
  party
  book;

  constructor(private bookService : BookService) { }

  ngOnInit() {
    //   this.bookService.getReservation().subscribe(confirmation => {
    //     this.name = confirmation.book.name; // Set username
    //     this.date = confirmation.book.date; // Set e-mail
    //     this.party = confirmation.book.party;
    //     this.book = confirmation.book;
    // })};
  }
}
