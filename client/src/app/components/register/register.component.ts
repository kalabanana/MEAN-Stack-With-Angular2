import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms"
import { AuthService} from "../../services/auth.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  //disCode = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenService: AuthService,
    private router: Router) {
    this.createForm();
  }
  createForm(){
    this.registerForm = this.formBuilder.group({
      //define all fields of the group
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
        Validators.minLength(5),
        Validators.maxLength(12),
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
    this.registerForm.controls['firstName'].disable();
    this.registerForm.controls['lastName'].disable();
    this.registerForm.controls['username'].disable();
    this.registerForm.controls['password'].disable();
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['telephone'].disable();
  }
  enableForm(){
    this.registerForm.controls['firstName'].enable();
    this.registerForm.controls['lastName'].enable();
    this.registerForm.controls['username'].enable();
    this.registerForm.controls['password'].enable();
    this.registerForm.controls['email'].enable();
    this.registerForm.controls['telephone'].enable();
  }
  checkEmail(){
    this.authenService.checkEmail(this.registerForm.get('email').value).subscribe(data => {
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
    this.authenService.checkUsername(this.registerForm.get('username').value).subscribe(data => {
      if(!data.success){
        this.usernameValid = false;
        this.usernameMessage = data.message;
      }else{
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    })
  }
  onRegisterSubmit(){
    this.processing = true;
    this.disableForm();
    const owner= {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value,
      telephone:this.registerForm.get('telephone').value
    }

    this.authenService.registerOwner(owner).subscribe( data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.processing = true;
        setTimeout(() =>{
          this.router.navigate(['/login'] )
        },2000)
      }
    })
  }


  ngOnInit() {
  }

}
