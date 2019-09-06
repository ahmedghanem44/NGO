import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';
import { PasswordValidation } from './PasswordValidator';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup-from',
  templateUrl: './signup-from.component.html',
  styleUrls: ['./signup-from.component.css']
})
export class SignupFromComponent implements OnInit {

  public signupForm : FormGroup;
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

  constructor(private fb:FormBuilder , private userService : UserService , private router :Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      cma : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      confirmPassword : ['',Validators.required],
      phone :['',Validators.required],
      street :['',Validators.required],
      // street2 : [''],
      zipCode :['',Validators.required],
      city :['',Validators.required],
      state : ['',Validators.required],
      country : ['',Validators.required],
      urbanization : [''],
      isAdmin : [true]

    },{
      validator: PasswordValidation.MatchPassword // validation method
    })
  };

  onSubmit(){
    this.userService.signup(this.signupForm.value).subscribe(
      response => console.log("Sign up succeed"),
      error => console.log("Failed to signup the new user")
    );
    this.router.navigate(['/home']);
  }
  

}
