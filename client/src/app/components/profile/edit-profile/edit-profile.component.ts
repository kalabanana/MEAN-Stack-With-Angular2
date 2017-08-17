import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms"
import { AuthService} from "../../../services/auth.service";
import { ActivatedRoute,Router } from "@angular/router"

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  loading = false;
  profileForm;
  username;
  firstName;
  lastName;
  telephone;
  street;
  city;
  state;
  zip;

  processing = false;
  owner;

  message;
  messageClass;

  constructor(    private formBuilder: FormBuilder,
                  private authService: AuthService,
                  private router: Router) { }

  createForm(){
    this.profileForm = this.formBuilder.group({
        firstName:[this.firstName, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          this.validateFirstName
          ]

        )] , //passes a default
        lastName: [this.lastName, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            this.validateLastName,
          ]
        )],
        username: [this.username, Validators.compose(
          [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(12),]
        )],

        street:[this.street],
        city:[this.city],
        state:[this.state],
        zip:[this.zip],
        telephone:[this.telephone, Validators.compose(
          [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(15),
            this.validatePhone
          ]
        )],
      },
    );
    this.loading = true;
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
  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return {'validatePassword': true}
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
    this.profileForm.controls['telephone'].disable();
    this.profileForm.controls['street'].disable();
    this.profileForm.controls['city'].disable();
    this.profileForm.controls['state'].disable();
    this.profileForm.controls['zip'].disable();

  }
  enableForm(){
    this.profileForm.controls['firstName'].enable();
    this.profileForm.controls['lastName'].enable();
    this.profileForm.controls['telephone'].enable();
    this.profileForm.controls['username'].enable();
    this.profileForm.controls['street'].enable();
    this.profileForm.controls['city'].enable();
    this.profileForm.controls['state'].enable();
    this.profileForm.controls['zip'].enable();

  }

  onUpdateSubmit(){
    this.processing = true;
    this.disableForm();

     const owner = {
      username: this.profileForm.get('username').value,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      telephone: this.profileForm.get('telephone').value,
      street: this.profileForm.get('street').value,
      city: this.profileForm.get('city').value,
      state: this.profileForm.get('state').value,
      zip: this.profileForm.get('zip').value,

    }

    this.authService.updateOwner(owner).subscribe( data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.processing = true;
        this.disableForm();
        setTimeout(()=>{
          this.router.navigate(['/profile'])
        }, 500)
      }
    })
  }


  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if(!profile.success){
        this.messageClass= 'aler alert-danger';
        this.message = 'Profile Not Found'
      }else {
        this.username = profile.owner.username;
        this.firstName = profile.owner.firstName;
        this.lastName = profile.owner.lastName;
        this.telephone = profile.owner.telephone;
        this.street = profile.owner.street;
        this.city = profile.owner.city;
        this.state = profile.owner.state;
        this.zip = profile.owner.zip;

        this.owner = profile.owner;
        this.loading = false;
      }
      this.createForm();
    });
  }

}
