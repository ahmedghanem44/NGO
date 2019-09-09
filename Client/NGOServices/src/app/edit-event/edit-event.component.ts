import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  public eventForm = new FormGroup({
    eventName : new FormControl(),
    isActive : new FormControl()
  });
  public event;
  public id;
  public errorMsg;
  public active;
  public admin = localStorage.getItem('isAdmin');
  
  constructor(private eventService: EventService, private fb :FormBuilder, private router: Router,
                private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.getTheEvent();
  }

  getTheEvent() {
    if (localStorage.getItem('token') != null) {
      this.id = this.activatedRoute.snapshot.queryParams["id"] || 0;
      console.log(this.id);
      this.eventService.getEventById(this.id).subscribe(
        data => {
          this.event = data;
          console.log(data);
          if (this.event.isActive) {
            this.active = true;
          } else {
            this.active = false;
          }
        },
        error => {
          this.errorMsg = error;
          this.router.navigate(['/error'])
        },
        () => console.log("DONE")
      )
      setTimeout(() => {
        this.eventForm = this.fb.group({
          eventName: [this.event.eventName, Validators.required],
          isActive: [this.active]
        })
      }, 100);
    } else {
      this.router.navigate(['/signin']);
    }
  }


  onSubmit(){
    this.eventService.updateEvent(this.id,this.eventForm.value).subscribe(
      response => console.log("Editing event succeed"),
      error => {
        console.log("Failed to edit the event");
        this.router.navigate(['/error']);
      }
    );
    this.router.navigate(['/event_mng']);
  }


}
