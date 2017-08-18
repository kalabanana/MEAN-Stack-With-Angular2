import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { BookService } from "../../services/book.service"
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BookingListComponent implements OnInit, OnDestroy {
  message;
  messageClass;
  loading = true;
  reservations;
  showDialog = false;

  //listChanged = new Subject <any []>();

  constructor(private authService: AuthService,
              private bookService: BookService,
              private ref: ChangeDetectorRef
  ) { }


  p: number = 1;
  collection: any[];
  reservationFilter: any = {_id: ''};

  ngOnInit() {
    this.loading = true;
    this.getAllReservations();
  }
  ngOnDestroy(){
    console.log('destroying view')
    this.ref.detach();
  }

  getAllReservations(){
    this.bookService.getAllReservations().subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = 'Fail to load all reservations';
      }else {
        // this.ref.markForCheck();
        // this.ref.detectChanges();
        console.log("receive all bookings from service")
        this.reservations = data.bookings;
        this.collection = data.bookings;
      }
    })
    this.loading = false;
  };


}
