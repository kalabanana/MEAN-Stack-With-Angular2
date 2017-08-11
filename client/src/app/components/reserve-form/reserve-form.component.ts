import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.css']
})
export class ReserveFormComponent implements OnInit {
  reserveForm: FormGroup;
  createForm(){
    this.reserveForm = this.formBuilder.group({
      name:'',
      date:'',
      time:'',

    })
  }

  constructor( private formBuilder: FormBuilder ) {
    this.createForm();
  }

  ngOnInit() {
  }

  onReserveSubmit(){
    console.log('submit');
  }
}

