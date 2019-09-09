import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PasswordValidation } from '../signup-from/PasswordValidator';

@Component({
  selector: 'app-signup-form-admin',
  templateUrl: './signup-form-admin.component.html',
  styleUrls: ['./signup-form-admin.component.css']
})
export class SignupFormAdminComponent implements OnInit {

  public isSubmit = 'false' ;
  
  public signupForm: FormGroup;

  public admin = localStorage.getItem('isAdmin'); 

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
  }

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
