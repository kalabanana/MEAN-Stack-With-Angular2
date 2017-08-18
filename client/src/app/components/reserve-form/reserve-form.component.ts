import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import { BookService } from "../../services/book.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.css']
})
export class ReserveFormComponent implements OnInit {
  reserveForm;
  showDialog = false;
  processing = false;

  messageClass;
  message;
  loading = false;
  err;

  createForm() {
    this.reserveForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,])],
      party: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(1),
      ])],
      date: ['', Validators.compose([
        Validators.required,
        this.validateTime])],
      telephone: ['', Validators.compose([
        Validators.required,
        this.validatePhone])],
    })
  }
  validatePhone(controls){
    const regExp = new RegExp(/^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validatePhone': true}
    };
  }
  validateTime(controls) {
    const t = (new Date(controls.value));
    if (t.getTime() < Date.now()) {
      return {
        validateTime: {
          err: 'You must pick a future time'
        }
      }
    } else {
      if (t.getDay() == 1) {
        return {
          validateTime: {
            err: 'Crepe House closes on Sunday'
          }
        }
      } else {
        if (t.getHours() < 11 || t.getHours() > 21) {
          return {
            validateTime:{
              err: 'Crepe House opens at 11 AM and closes at 9PM '
            }
          }
        }
      }
    }
    return null;
  }

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private router: Router) {
  }


  ngOnInit() {
    this.loading = false;
    this.createForm();

  }

  disableForm() {
    this.reserveForm.controls['name'].disable();
    this.reserveForm.controls['party'].disable();
    this.reserveForm.controls['date'].disable();
    this.reserveForm.controls['telephone'].disable();

  }

  enableForm() {
    this.reserveForm.controls['name'].enable();
    this.reserveForm.controls['party'].enable();
    this.reserveForm.controls['date'].enable();
    this.reserveForm.controls['telephone'].enable();

  }

  onReserveSubmit() {
    this.processing = true;

    const booking = {
      name: this.reserveForm.get('name').value,
      party: this.reserveForm.get('party').value,
      date: this.reserveForm.get('date').value,
      telephone: this.reserveForm.get('telephone').value
    }

    this.bookService.onReserveSubmit(booking).subscribe(data => {
        if (!data.success) {
          this.enableForm();
          this.messageClass = "alert alert-danger";
          this.message = data.message;
        } else {
          this.processing = true;
          this.messageClass = "alert alert-success";
          this.message = data.message;
          this.enableForm();
          console.log(data);

          setTimeout(() => {
            this.router.navigate(['/confirmCode',data.id])
          }, 1000);
        }
      }
    )
  }
}

