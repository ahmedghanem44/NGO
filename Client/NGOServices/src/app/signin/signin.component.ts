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
          this.isAdmin = response.isAdmin;
          localStorage.setItem('token', response.token);
          localStorage.setItem('name',response.firstName+" "+response.lastName);
          localStorage.setItem('user', response.user);
          console.log(response);
          this.router.navigate(['/home'])
      },
      error => {
        console.log("Failed to sign in ");
        console.log(error);
        this.router.navigate(['/signup'])
      });
  }
}