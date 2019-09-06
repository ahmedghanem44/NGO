import { Component, OnInit } from '@angular/core';
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

  public profileForm: FormGroup;
  public user: IUser;
  public errorMsg;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {  
  }


}
