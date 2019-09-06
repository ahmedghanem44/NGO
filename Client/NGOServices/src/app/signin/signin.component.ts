import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public isAdmin : Boolean;
  public signinForm : FormGroup

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
          console.log(response);
          this.router.navigate(['/home']);
          // console.log("res isAdmin: "+response.isAdmin);
          // console.log("local: "+this.isAdmin)  
      },
      error => {
        console.log("Failed to sign in ");
        console.log(error);
        this.router.navigate(['/signup'])
      });
  }
}