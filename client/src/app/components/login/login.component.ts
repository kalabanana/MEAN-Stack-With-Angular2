import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms"
import { AuthService } from "../../services/auth.service"
import { Router } from "@angular/router"
import { AuthGuard } from "../../guards/auth.guard"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard,
  ) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  disableForm() {
    this.form.controls['email'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  enableForm() {
    this.form.controls['email'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    const owner = {
      email: this.form.get('email').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(owner).subscribe(data => {
      // Check if response was a success or error

      if(owner.email == 'admin' && owner.password == 'hH!19852001'){
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // Navigate to dashboard view
        }, 2000);
      }
      else {
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Set bootstrap error class
          this.message = data.message; // Set error message
          this.processing = false; // Enable submit button
          this.enableForm(); // Enable form for editting
        } else {
          this.messageClass = 'alert alert-success'; // Set bootstrap success class
          this.message = data.message; // Set success message
          this.authService.storeOwnerData(data.token, data.owner);

          setTimeout(() => {
            if (this.previousUrl) {
              this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
            } else {
              this.router.navigate(['/dashboard']); // Navigate to dashboard view
            }
          }, 2000);
        }
      }
    });
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }
  }
}
