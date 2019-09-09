import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges{
  // export class AppComponent {
  title = 'NGOServices';

  // public userName: string = localStorage.getItem('name'); 
  // public errorMsg: string;
  public userName : string ;
  public admin = localStorage.getItem('isAdmin');


  constructor(
  private userService: UserService,
  private router : Router){}

  ngOnInit(){
    this.userName = localStorage.getItem('userName');
    console.log(this.userName);
    // this.userService.getUserName().subscribe(
    //   (data) => this.userName = data,
    //   (err) => this.errorMsg = err,
    //   ()=>console.log("Got the Name")
    // )
  }

  ngOnChanges(){
    this.userName = localStorage.getItem('userName');
    console.log(this.userName);
    // this.userService.getUserName().subscribe(
    //   (data) => this.userName = data,
    //   (err) => this.errorMsg = err,
    //   ()=>console.log("Got the Name")
    // )
  }


  logout(){
    this.userService.signout();
    this.router.navigate(['/signin']);
  }

}
