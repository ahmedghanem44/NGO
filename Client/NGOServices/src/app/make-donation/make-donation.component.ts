import { Component, OnInit } from '@angular/core';
import { DonationService } from '../donation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDonation } from '../DonationInterface';
import { IUser } from '../UserInterface';
import { UserService } from '../user.service';
import { IEvent } from '../EventInterface';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-donation',
  templateUrl: './make-donation.component.html',
  styleUrls: ['./make-donation.component.css']
})
export class MakeDonationComponent implements OnInit {

  public admin = localStorage.getItem('isAdmin');
  private id = localStorage.getItem('id');
  public donationForm : FormGroup;
  private user :IUser;
  private event : IEvent;
  private errorMsg;
  private eventId;
  
            

  constructor(private donationService : DonationService, private fb:FormBuilder,private userService:UserService,
    private eventService:EventService,private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    console.log(this.id);
    if(localStorage.getItem('token') != null){
        this.donationForm = this.fb.group({
          amount: ['',Validators.required],
          isRecurring : [false]
        })
    }
  }

  onSubmit(){
    this.userService.getUserById(this.id).subscribe(
      data => this.user = data,
      error => this.errorMsg = error,
      ()=>console.log("got the user")
    );
    this.eventId = this.activatedRoute.snapshot.queryParams["id"];
    this.eventService.getEventById(this.eventId).subscribe(
      data => this.event = data,
      error => this.errorMsg = error,
      ()=>console.log("got the event")
    );
    let donation : IDonation = {
      user: this.user,
      event: this.event,

    }
    this.donationService.addDonation()
  }

}
