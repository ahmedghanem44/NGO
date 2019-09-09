import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css']
})
export class NavBarUserComponent implements OnInit {

  constructor(private userService : UserService, private router:Router) { }


  public userName = localStorage.getItem('userName');
  public admin = localStorage.getItem('isAdmin');

  ngOnInit() {
    console.log(this.userName);
    // console.log(typeof this.admin);
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   const previousValue = changes['userName'].previousValue;
  //   const currentValue = changes['userName'].previousValue;
  //   // Your Logic!
  // }

  logout(){
    this.userService.signout();
    this.router.navigate(['/signin']);
  }
  

}
