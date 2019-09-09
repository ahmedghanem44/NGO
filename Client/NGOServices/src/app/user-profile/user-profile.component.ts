import { Component, OnInit,OnChanges} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { PasswordValidation } from '../signup-from/PasswordValidator';
import { Router } from '@angular/router';
import { IUser } from '../UserInterface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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
  public admin = localStorage.getItem('isAdmin'); 
  // public id ; 


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.getTheUser();
    setTimeout (() => {
      this.profileForm = this.fb.group({
        firstName : [this.user.firstName, Validators.required],
        lastName : [this.user.lastName,Validators.required],
        cma : [this.user.cma,Validators.required],
        // email : ['',Validators.required],
        password : [this.user.password,Validators.required],
        confirmPassword : [this.user.password,Validators.required],
        phone :[this.user.phone,Validators.required],
        street :[this.user.street,Validators.required],
        zipCode :[this.user.zipCode,Validators.required],
        city :[this.user.city,Validators.required],
        state : [this.user.state,Validators.required],
        country : [this.user.country,Validators.required],
        urbanization : [this.user.urbanization]
        // isAdmin : [true]
  
      },{
        validator: PasswordValidation.MatchPassword // validation method
      })
   }, 0);

  //  console.log(this.user.cma);
    
  };

   getTheUser(){
    let token = localStorage.getItem('currentUser');
    let payload = atob(token.split('\.')[1]);
    let userinfo = JSON.parse(payload);
    this.userService.getUserById(userinfo.id).subscribe(
      data => {
       this.user = data ;
       console.log(this.user.cma);
     },
     error =>{
      this.errorMsg = error;
      this.router.navigate(['/error']);
     },
     ()=> console.log("DONE")
   )
  }
  onSubmit(){
    this.userService.updateUser(this.user._id,this.profileForm.value).subscribe(
      response => console.log("Editing user profile succeed"),
      error => {
        console.log("Failed to edit the user profile");
        this.router.navigate(['/error']);
      }
    );
    this.router.navigate(['/homein']);
  }

}
