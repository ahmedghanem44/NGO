import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private userService : UserService, private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.userService.signout();
    this.router.navigate(['/signin']);
  }

}
