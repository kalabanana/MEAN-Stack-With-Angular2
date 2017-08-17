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

  confirmForm;
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
              private router: Router,
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

  updateEditSubmit(){
    this.processing = true;
    this.bookService.editConfirmation(this.booking).subscribe(data => {
      if(!data.success){
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
      }else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/confirmCode',this.id])
        },1000)
      }
    })

  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.bookService.getReservation(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'confirmation code not found.';
      } else {
        this.booking = data.booking;
        this.id = data.booking._id;
        this.processing = false;
        this.loading = false;
      }
    });
    this.createForm();
    this.loading = false;
  }

  goBack(){
    this.location.back();
  }

}
