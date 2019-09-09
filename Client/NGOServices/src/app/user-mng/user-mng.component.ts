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
    this.loadPage();

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
    this.userService.removeUser(id).subscribe(
      (data) =>{
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

  ngAfterViewInit() {
    this.loadPage();
  }

}

