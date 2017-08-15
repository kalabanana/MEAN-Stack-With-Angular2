import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms"
import { AuthService} from "../../services/auth.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  email;
  firstName;
  lastName;
  telephone;
  owner;


  constructor(
    private authService: AuthService,) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.owner.username; // Set username
      this.email = profile.owner.email; // Set e-mail
      this.firstName = profile.owner.firstName;
      this.lastName = profile.owner.lastName;
      this.telephone = profile.owner.telephone;
      this.owner = profile.owner;
      //console.log(profile);
    });
  }

}
