import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms"
import { AuthService} from "../../services/auth.service"
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm()
  }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/home'])
  }

}
