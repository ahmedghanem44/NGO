import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events-for-donation',
  templateUrl: './events-for-donation.component.html',
  styleUrls: ['./events-for-donation.component.css']
})
export class EventsForDonationComponent implements OnInit {

  public events = [];
  public errorMsg : string ;

  constructor(private eventService : EventService) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      (activeEvents) => this.events = activeEvents,
      (error) => this.errorMsg = error,
      () => console.log("list of active events loaded successfully")
    );
  }

}
