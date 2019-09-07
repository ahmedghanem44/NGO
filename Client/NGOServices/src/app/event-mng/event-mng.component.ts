import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-mng',
  templateUrl: './event-mng.component.html',
  styleUrls: ['./event-mng.component.css']
})
export class EventMngComponent implements OnInit,AfterViewInit {

  public events = [];
  public errorMsg;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage(){
    if (localStorage.getItem('token') != null) {
      this.eventService.getAllEvents().subscribe(
        (eventsList) => this.events = eventsList,
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

  ngAfterViewInit() {
    this.loadPage();
  }

  onSelect(id){
    this.eventService.removeEvent(id).subscribe(
      (data) =>{
        console.log("Event Deleted: " + data);
        this.loadPage();
      }, 
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/signin']);
        },
        () => console.log("DELETED")
      );
  }

}
