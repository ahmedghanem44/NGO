import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  public isActive : Boolean;
  public eventForm : FormGroup;
  public errorMsg;

  constructor(private eventService: EventService, private fb :FormBuilder, private router: Router) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      eventName: ['',Validators.required],
      isActive : []
  })
  }

  onSubmit(){
    this.eventService.addEvent(this.eventForm.value).subscribe(
      event => {
        console.log("Event added: " + event),
        this.router.navigate(['/event_mng'])
      },
    error => {
      console.log("Failed to add event");
      console.log(error);
      this.router.navigate(['/error'])
    });
}

}
