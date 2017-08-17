import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BookService } from "../../../services/book.service"
import { ActivatedRoute, Router} from "@angular/router"
import { FlashMessagesService } from "angular2-flash-messages"

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  showDialog = true;
  message;
  messageClass;
  foundConfirm = false;
  processing = false;
  booking;
  id;
  name;
  date;

  currentUrl;

  constructor(private  bookService: BookService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private flashMessage: FlashMessagesService,
              ) { }


  ngOnInit() {
    this.currentUrl = this.activateRoute.snapshot.params;

    this.bookService.getReservation(this.currentUrl.id).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger'
        this.message = data.message;
        this.processing = true;
      }else {
        this.messageClass = 'alert alert-success'
        this.message = data.message;
        this.processing = false;
        this.booking = {
          name: data.booking.name,
          date: data.booking.date,
          id: data.booking._id
        }
        this.foundConfirm = true;
      }
    })
  }

  close(){
    this.showDialog = false;
    this.processing = true;
    this.router.navigate(['/booking-list']);
  }

  deleteReservation(){
    console.log('calling deleteReservation function');
    this.showDialog = false;
    this.processing = true;
    this.bookService.deleteConfirmation(this.currentUrl.id).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger'
        this.message = data.message;
      }else {
        this.messageClass = 'alert alert-success'
        this.message = data.message;
        this.processing = true;
        this.flashMessage.show('Successfully removed a reservation', {cssClass: 'alert alert-success'})
        setTimeout(()=>{
           this.router.navigate(['/booking-list'])
         }, 5000);
      }
    })


  }

}
