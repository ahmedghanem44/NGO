import { Component, OnInit } from '@angular/core';
import { DonationService } from '../donation.service';
import { Router } from '@angular/router';
//TODO Need to import/create a service for donation management
@Component({
  selector: 'app-donation-mng',
  templateUrl: './donation-mng.component.html',
  styleUrls: ['./donation-mng.component.css']
})
export class DonationMngComponent implements OnInit {

  public donations = [];
  public errorMsg;

  constructor(private donationService : DonationService , private router :Router) { }

  ngOnInit() {
    this.getDonationsList();
    // console.log(this.donations);
  }

  getDonationsList(){
    if (localStorage.getItem('token') != null) {
      this.donationService.getAllDonations().subscribe(
        (donationsList) => {
          this.donations = donationsList
          console.log(this.donations);
        },
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/signin']);
        },
        () => console.log("Donations Loaded Successfully")
      );
    } else {
      this.router.navigate(['/signin']);
    }
  }

}
