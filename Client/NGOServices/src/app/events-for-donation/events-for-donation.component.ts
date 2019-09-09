import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-events-for-donation',
  templateUrl: './events-for-donation.component.html',
  styleUrls: ['./events-for-donation.component.css']
})
export class EventsForDonationComponent implements OnInit {

  public events = [];
  public errorMsg : string ;
  public admin = localStorage.getItem('isAdmin');

  constructor(private eventService : EventService, private userService: UserService,
                private router : Router){ }

  ngOnInit() {
    if(this.userService.isSignedIn()){
      this.eventService.getAllEvents().subscribe(
        (events) => this.events = events,
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
          },
        () => console.log("list of events loaded successfully")
      );
    }else{
      this.router.navigate(['/signin']);
    }
  }

}
