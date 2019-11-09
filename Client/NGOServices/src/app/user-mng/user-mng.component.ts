import { Component, OnInit, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-mng',
  templateUrl: './user-mng.component.html',
  styleUrls: ['./user-mng.component.css']
})
export class UserMngComponent implements OnInit,AfterViewInit {

  private users = [];
  private errorMsg;
  public admin = localStorage.getItem('isAdmin');

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    setTimeout(()=>this.loadPage(),300);
    

  }

  loadPage(){
    if (localStorage.getItem('token') != null) {
      this.userService.getAllUsers().subscribe(
        (userList) => this.users = userList,
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
        },
        () => console.log("COMPLETED")
      );
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onSelect(id){
    // if(window.confirm("Are you sure you want to remove this user?")){ // same as window.confirm("")
    if(window.confirm("Are you sure you want to remove this user?")){
      
    this.userService.removeUser(id).subscribe(
      (data) =>{
        alert("User has been successfully removed")
        console.log("User Deleted: " + data);
        this.loadPage();
      }, 
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
        },
        () => console.log("DELETED")
      );
  }
  }

  ngAfterViewInit() {
    this.loadPage();
  }

}

