import { Component, OnInit, OnChanges, ɵɵNgOnChangesFeature, DoCheck, AfterViewInit, AfterContentChecked, AfterViewChecked, AfterContentInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
// import { UserMngService } from './../user-mng.service'
// import { UserA }  from '../user-a';
@Component({
  selector: 'app-user-mng',
  templateUrl: './user-mng.component.html',
  styleUrls: ['./user-mng.component.css']
})
export class UserMngComponent implements OnInit,AfterViewInit {

  public users = [];
  public errorMsg;
  //public andres;
  // private andres = new UserA();

  // constructor(private _UserServ: UserMngService ) { }
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
          this.router.navigate(['/signin']);
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
          this.router.navigate(['/signin']);
        },
        () => console.log("DELETED")
      );
  }

  ngAfterViewInit() {
    this.loadPage();
  }

  // ngAfterContentInit() {
  //   this.loadPage();
  // }
  // ngDoCheck() {
  //   if (localStorage.getItem('token') != null) {
  //     this.userService.getAllUsers().subscribe(
  //       (userList) => this.users = userList,
  //       (error) => {
  //         this.errorMsg = error;
  //         this.router.navigate(['/signin']);
  //       },
  //       () => console.log("COMPLETED")
  //     );
  //   } else {
  //     this.router.navigate(['/signin']);
  //   }

  // }
}

