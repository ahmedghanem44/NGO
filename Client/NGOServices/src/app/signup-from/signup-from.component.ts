import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { PasswordValidation } from './PasswordValidator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-from',
  templateUrl: './signup-from.component.html',
  styleUrls: ['./signup-from.component.css']
})
export class SignupFromComponent implements OnInit {

  public isSubmit = 'false' ;
  
  public signupForm: FormGroup;
  // public signupForm = new FormGroup({
  //   firstName : new FormControl(''),
  //   lastName : new FormControl(''),
  //   cma : new FormControl(''),
  //   email : new FormControl(''),
  //   password : new FormControl(''),
  //   phone :new FormControl(''),
  //   street :new FormControl(''),
  //   // street2 : [''],
  //   zip :new FormControl(''),
  //   city :new FormControl(''),
  //   state : new FormControl(''),
  //   country : new FormControl(''),
  //   urbanization : new FormControl(''),
  //   isAdmin : new FormControl(true)
  // });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {

    localStorage.setItem('signupSubmit',this.isSubmit);

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cma: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      // street2 : [''],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      urbanization: [''],
      isAdmin: [false]

    }, {
        validator: PasswordValidation.MatchPassword // validation method
      })
  };

  onSubmit() {
    
    // TO DO  add a method to check if the email already exists
    // TO DO logic for form guard
    // localStorage.setItem('signupSubmit',"true");
    this.userService.signup(this.signupForm.value).subscribe(
      data => {
        console.log("Sign up succeed");
        if (localStorage.getItem('isAdmin') == "true") {
          this.router.navigate(['/user_mng']);
        } else {
          this.router.navigate(['/signin']);
        }
      },
      error => {
        console.log(error);
        console.log("Failed to signup the new user");
        this.router.navigate(['/error']);
      }
    );

  }


}
