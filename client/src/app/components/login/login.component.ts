// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms"
// import { AuthService } from "../../services/auth.service"
// import { Router } from "@angular/router"
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   messageClass;
//   message;
//   processing=false;
//   loginForm: FormGroup;
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.createForm();
//   }
//
//   createForm(){
//     this.loginForm = this.formBuilder.group({
//       email:['', Validators.required],
//       password: ['', Validators.required]
//
//     })
//   };
//   disableForm(){
//     this.loginForm.controls['email'].disable();
//     this.loginForm.controls['password'].disable();
//   }
//   enableForm(){
//     this.loginForm.controls['email'].enable();
//     this.loginForm.controls['password'].enable();
//   }
//   ngOnInit() {
//   }
//
//   onLoginSubmit(){
//     this.processing =true;
//     this.disableForm();
//
//     const owner = {
//       email: this.loginForm.get('email').value,
//       password: this.loginForm.get('password').value
//     }
//
//     this.authService.login(owner).subscribe(data => {
//       if(!data.success){
//         this.messageClass = 'alert alert-danger';
//         this.message = data.message;
//         this.processing = false;
//         this.enableForm();
//       }else {
//         this.messageClass = 'alert alert-success';
//         this.message = data.message;
//         this.processing = true;
//         this.authService.storeOwnerData(data.token, data.owner);
//         setTimeout(()=> {
//           this.router.navigate(['/dashboard']);
//         }, 5000);
//         this.disableForm();
//       }
//     })
//   }
// }
