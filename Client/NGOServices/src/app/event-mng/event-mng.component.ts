import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges } from '@angular/core';
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
  public eventToActivate;
  public admin = localStorage.getItem('isAdmin');

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
          this.router.navigate(['/error']);
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
  // ngOnChanges() {
  //   this.loadPage();
  // }

  onSelect(id){
    this.eventService.removeEvent(id).subscribe(
      (data) =>{
        console.log("Event Deleted: " + data);
        this.loadPage();
      }, 
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
        },
        () => console.log("DELETED")
      );
  }

  setStatus(id){
    this.eventService.getEventById(id).subscribe(
      (data)=> this.eventToActivate = data,
      // console.log("updated: " + data.isActive);
      (error) => {
        this.errorMsg = error;
        this.router.navigate(['/error']);
      },
      () => console.log("GOT : " + this.eventToActivate.eventName)
    );
    setTimeout(() => {
      let setvalue:boolean = true;
      if(this.eventToActivate.isActive){
        setvalue = false;
      }else{
        setvalue = true;
      }
      this.eventService.updateEvent(id,{
        eventName: this.eventToActivate.eventName,
        isActive: setvalue
      }).subscribe(
        (data)=> this.eventToActivate = data,
      // console.log("updated: " + data.isActive);
      (error) => {
        this.errorMsg = error;
        this.router.navigate(['/error']);
      },
      () => console.log("GOT : " + this.eventToActivate)
      )
    },100);
    this.loadPage();   
  }
}
