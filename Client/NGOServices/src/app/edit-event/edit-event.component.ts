import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  public eventForm = new FormGroup({
    eventName : new FormControl(''),
    isActive : new FormControl('')
  });
public event;

  public errorMsg;
  
  constructor(private eventService: EventService, private fb :FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
    this.getTheEvent();
    setTimeout (() => {
      this.eventForm = this.fb.group({
        eventName : [this.user.firstName, Validators.required],
        isAdmin : [this.admin]
  
      },{
        validator: PasswordValidation.MatchPassword // validation method
      })
   }, 0);
  }else{
    this.router.navigate(['/signin']);
  }

  }

  getTheEvent(){
    this.id = this.activatedRoute.snapshot.queryParams["id"]||0;
    console.log(this.id);
    this.userService.getUserById(this.id).subscribe(
      data => {
       this.user = data ;
       if(this.user.isAdmin){
         this.admin = true;
       }else{
         this.admin = false;
       }
       console.log(this.user.cma);
     },
     error => this.errorMsg = error,
     ()=> console.log("DONE")
   )
  }

  onSubmit(){
    this.userService.updateUser(this.id,this.profileForm.value).subscribe(
      response => console.log("Editing user profile succeed"),
      error => console.log("Failed to edit the user profile")
    );
    this.router.navigate(['/user_mng']);
  }


}
