import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms"
import { AuthService} from "../../services/auth.service"
import {Router} from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              private router: Router,
              private  flashMessage: FlashMessagesService) {
    this.createForm()
  }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
    this.flashMessage.show('You have successfully logged out!', {cssClass: 'alert alert-info'})
    this.router.navigate(['/'])
  }

}
