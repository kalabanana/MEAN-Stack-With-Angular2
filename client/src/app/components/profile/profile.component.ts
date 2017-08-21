import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service"
import { ActivatedRoute, Router } from "@angular/router"

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
  street;
  city;
  state;
  zip;
  loading = true;

  constructor(
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if(!profile.success){
        this.loading = true;
        this.owner = null;
      }else {
        this.loading = false;
        this.owner = profile.owner;
        // this.email = profile.owner.email;
        // this.username = profile.owner.username;
        // this.firstName = profile.owner.firstName;
        // this.lastName = profile.owner.lastName;
        // this.telephone = profile.owner.telephone;
        // this.street = profile.owner.street;
        // this.city = profile.owner.city;
        // this.state = profile.owner.state;
        // this.zip = profile.owner.zip;
      }
    });
  }

}
