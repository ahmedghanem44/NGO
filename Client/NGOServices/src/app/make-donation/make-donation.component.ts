import { Component, OnInit } from '@angular/core';
import { DonationService } from '../donation.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ICart } from '../CartInterface';
import { IUser } from '../UserInterface';
import { UserService } from '../user.service';
import { IEvent } from '../EventInterface';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';


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
  private amount ;
  private isRecurring ;          

  constructor(private cartService : CartService, private fb:FormBuilder,private userService:UserService,
    private eventService:EventService,private activatedRoute : ActivatedRoute,private router:Router) { }

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
    // this.getDonator();
    // this.getEvent();
    this.amount = this.donationForm.get('amount').value;
    this.isRecurring = this.donationForm.get('isRecurring').value;

    let donation : ICart = {
      user: this.id,
      event: this.activatedRoute.snapshot.queryParams["id"],
      amount: this.amount,
      dateOfDonation: new Date(),
      isRecurring: this.isRecurring
    };

    this.cartService.addDonation(donation).subscribe(
      data => {
        console.log("Donation added"),
        this.router.navigate(['/startdonation'])
      },
      error => {
        this.errorMsg = error,
        this.router.navigate(['/error'])
      },
      ()=> console.log("Adding donation completed")
    )
  }
   // getDonator(){
  //     this.userService.getUserById(this.id).subscribe(
  //     data => this.user = data,
  //     error => this.errorMsg = error,
  //     ()=>console.log("got the user")
  //   );
  // }

  // getEvent(){
  //   this.eventId = this.activatedRoute.snapshot.queryParams["id"];
  //   this.eventService.getEventById(this.eventId).subscribe(
  //     data => this.event = data,
  //     error => this.errorMsg = error,
  //     ()=>console.log("got the event")
  //   );
  // }

}
