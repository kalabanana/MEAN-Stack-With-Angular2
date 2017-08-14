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

  profileForm: FormGroup;
  username;
  email;
  firstName;
  lastName;
  telephone;
  processing = false;
  owner;


  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  //disCode = false;
  message;
  messageClass;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.createForm();
  }
  createForm(){
    this.profileForm = this.formBuilder.group({
        firstName:['', Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            this.validateFirstName
          ]

        )] , //passes a default
        lastName: ['', Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            this.validateLastName,
          ]
        )],
        username: ['', Validators.compose([
            Validators.required,
            this.validateUsername,
          ]
        )],
        password: ['', Validators.compose(
          [Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            this.validatePassword,
          ]
        )],

        email:['', Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            this.validateEmail
          ]
        )],
        telephone:['', Validators.compose(
          [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(15),
            this.validatePhone
          ]
        )],
        confirm: ['',
          Validators.required
        ],
        franCode: ['Qx76Sk562sgdfr']

      },
      //added to overall fo
      {validator: this.matchingPasswords('password','confirm')})
  }
  matchingPasswords(password, confirm){
    return (group: FormGroup)  => {
      if(group.controls[password].value === group.controls[confirm].value ){
        return null;
      }else{
        return {'matchingPasswords': true}
      }
    }
  }
  validateFirstName(controls){
    const regExp = new RegExp(/^[a-z ,.'-]+$/i);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validateFirstName': true}
    };
  }

  validateLastName(controls){
    const regExp = new RegExp(/^[a-z ,.'-]+$/i);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validateLastName': true}
    };
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validateUsername': true}
    };
  }
  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validatePassword': true}
    };
  }
  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validateEmail': true}
    };
  }
  validatePhone(controls){
    const regExp = new RegExp(/^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validatePhone': true}
    };
  }
  disableForm(){
    this.profileForm.controls['firstName'].disable();
    this.profileForm.controls['lastName'].disable();
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['password'].disable();
    this.profileForm.controls['email'].disable();
    this.profileForm.controls['telephone'].disable();
  }
  enableForm(){
    this.profileForm.controls['firstName'].enable();
    this.profileForm.controls['lastName'].enable();
    this.profileForm.controls['username'].enable();
    this.profileForm.controls['password'].enable();
    this.profileForm.controls['email'].enable();
    this.profileForm.controls['telephone'].enable();
  }


  onUpdateSubmit(){
    this.processing = true;
    this.disableForm();
    const owner= {
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      username: this.profileForm.get('username').value,
      password: this.profileForm.get('password').value,
      email: this.profileForm.get('email').value,
      telephone:this.profileForm.get('telephone').value
    }
    // this.authenService.updateOwner(owner).subscribe( data => {
    //   if(!data.success){
    //     this.messageClass = 'alert alert-danger';
    //     this.message = data.message;
    //     this.processing = false;
    //     this.enableForm();
    //   }else{
    //     this.messageClass = 'alert alert-success';
    //     this.message = data.message;
    //     this.processing = true;
    //   }
    // })
  }

  checkEmail(){
    this.authService.checkEmail(this.profileForm.get('email').value).subscribe(data => {
      if(!data.success){
        this.emailValid = false;
        this.emailMessage = data.message;
      }else{
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    })
  }
  checkUsername(){
    this.authService.checkUsername(this.profileForm.get('username').value).subscribe(data => {
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message;
      }else{
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    })
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.owner.username; // Set username
      this.email = profile.owner.email; // Set e-mail
      this.firstName = profile.owner.firstName;
      this.lastName = profile.owner.lastName;
      this.telephone = profile.owner.telephone;
    });
  }

}
