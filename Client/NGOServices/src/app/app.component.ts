import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit{
  export class AppComponent {
  title = 'NGOServices';

  public userName: string = localStorage.getItem('name'); 
  // public errorMsg: string;

  constructor(
  private userService: UserService,
  private router : Router){}

  // ngOnInit(){
  //   this.userService.getUserName().subscribe(
  //     (data) => this.userName = data,
  //     (err) => this.errorMsg = err,
  //     ()=>console.log("Got the Name")
  //   )
  // }


  logout(){
    this.userService.signout();
    this.router.navigate(['/signin']);
  }

}
