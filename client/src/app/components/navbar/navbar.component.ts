import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup

  createForm(){
    this.searchForm = this.formBuilder.group({
      search: ''
    })
  }

  constructor(private formBuilder: FormBuilder) {
    this.createForm()
  }

  ngOnInit() {
  }

}
