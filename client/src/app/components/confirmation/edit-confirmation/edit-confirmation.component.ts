import { Component, OnInit } from '@angular/core';
import { BookService } from "../../../services/book.service";
import { ActivatedRoute, Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Location } from "@angular/common"

@Component({
  selector: 'app-edit-confirmation',
  templateUrl: './edit-confirmation.component.html',
  styleUrls: ['./edit-confirmation.component.css']
})
export class EditConfirmationComponent implements OnInit {

  confirmForm: FormGroup;
  booking;
  name;
  party;
  date;
  id;
  telephone;
  currentUrl;
  processing = false;

  message
  messageClass;
  loading = true;


  constructor(private bookService : BookService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location) {

  }
  createForm(){
    this.confirmForm = this.formBuilder.group({
      name: [this.name, Validators.compose([Validators.required,])],
      party: [this.party, Validators.compose([Validators.required])],
      date: [this.date, Validators.compose([Validators.required])],
      telephone: [this.telephone, Validators.compose([Validators.required])]

    })
  }
  updateReservation(){
    this.processing = true;

  }

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
        this.processing = false;
        this.loading = false;
      }
    });
    this.createForm();
  }

  goBack(){
    this.location.back();
  }

}
