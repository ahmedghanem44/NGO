import { Component, OnInit } from '@angular/core';
//TODO Need to import/create a service for donation management
@Component({
  selector: 'app-donation-mng',
  templateUrl: './donation-mng.component.html',
  styleUrls: ['./donation-mng.component.css']
})
export class DonationMngComponent implements OnInit {

  public donations = [];
  public errorMsg;

  constructor() { }

  ngOnInit() {
    //this.displayDonations();
  }

  displayDonations()
  {
    //TODO populate donations array from service.
  }

}
