import { Component, OnInit, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './PasswordValidator';


@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})

export class AdminUserEditComponent implements OnInit {

  
  public profileForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    cma : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    confirmPassword : new FormControl(''),
    phone : new FormControl(''),
    street :new FormControl(''),
    zipCode :new FormControl(''),
    city :new FormControl(''),
    state : new FormControl(''),
    country : new FormControl(''),
    urbanization : new FormControl(''),
    isAdmin : new FormControl('')
  });
  
  public user ; 
  public errorMsg;
  public id ;
  public admin:boolean;
  public isAdmin = localStorage.getItem('isAdmin');

  constructor(private activatedRoute : ActivatedRoute, private userService:UserService,
                private fb : FormBuilder, private router :Router) { }
  

  ngOnInit() {
    if (localStorage.getItem('token') != null){
    this.getTheUser();
    setTimeout (() => {
      this.profileForm = this.fb.group({
        firstName : [this.user.firstName, Validators.required],
        lastName : [this.user.lastName,Validators.required],
        cma : [this.user.cma,Validators.required],
        email : [this.user.email,Validators.required],
        password : [this.user.password,Validators.required],
        confirmPassword : [this.user.password,Validators.required],
        phone :[this.user.phone,Validators.required],
        street :[this.user.street,Validators.required],
        zipCode :[this.user.zipCode,Validators.required],
        city :[this.user.city,Validators.required],
        state : [this.user.state,Validators.required],
        country : [this.user.country,Validators.required],
        urbanization : [this.user.urbanization],
        isAdmin : [this.admin]
  
      },{
        validator: PasswordValidation.MatchPassword // validation method
      })
   }, 0);
  }else{
    this.router.navigate(['/signin']);
  }

  }

  getTheUser(){
    this.id = this.activatedRoute.snapshot.queryParams["id"]||0;
    console.log(this.id);
    this.userService.getUserById(this.id).subscribe(
      data => {
       this.user = data ;
       if(this.user.isAdmin){
         this.admin = true;
       }else{
         this.admin = false;
       }
       console.log(this.user.cma);
     },
     error => {
       this.errorMsg = error,
       this.router.navigate(['/error'])
     },
     ()=> console.log("DONE")
   )
  }

  onSubmit(){
    this.userService.updateUser(this.id,this.profileForm.value).subscribe(
      response => console.log("Editing user profile succeed"),
      error => {
        console.log("Failed to edit the user profile");
        this.router.navigate(['/error']);
      }
    );
    this.router.navigate(['/user_mng']);
    
  }

}
