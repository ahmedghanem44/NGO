import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../UserInterface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public isAdmin : Boolean;
  public signinForm : FormGroup;
  public errorMsg;
  

  constructor(private userService:UserService, private fb :FormBuilder, private router: Router) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
        email: ['',Validators.required],
        password : ['',Validators.required]
    })
  }

  onSubmit(){
      this.userService.singin(this.signinForm.value).subscribe(
        response => {
          if(response.token){
            let token = JSON.stringify(response);
            localStorage.setItem('currentUser',token);
            let payload = atob(token.split('\.')[1]);
            let userinfo = JSON.parse(payload);
            localStorage.setItem('userName', userinfo.firstName +" " +userinfo.lastName);
            localStorage.setItem('isAdmin',response.isAdmin);
            localStorage.setItem('id',userinfo.id);
            // console.log(payload);
            // console.log(userinfo.id);
            this.userService.getUserById(userinfo.id).subscribe(
              data => {
                // console.log(data.lastName);
                this.userService.currentUser = data;
                // console.log(this.userService.currentUser.firstName);
                // this.userService.userExists = true ;            
              },
              error => {
                this.errorMsg = error;
                this.router.navigate(['/error']);
              }
            );
          }
          this.isAdmin = response.isAdmin;
          localStorage.setItem('token', response.token);
          localStorage.setItem('name',response.firstName+" "+response.lastName);
          localStorage.setItem('user', response.user);
          
          // console.log(response);
          
          this.router.navigate(['/homein'])
      },
      error => {
        console.log("Failed to sign in ");
        console.log(error);
        this.router.navigate(['/error'])
      });
  }

  
}