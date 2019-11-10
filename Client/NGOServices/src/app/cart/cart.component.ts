import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { DonationService } from '../donation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,AfterViewInit {

  public admin = localStorage.getItem('isAdmin');
  private userCart =[];
  private userid = localStorage.getItem('id');
  private errorMsg;
  private edit:boolean = false;

  constructor(private cartService:CartService , private router : Router ,private donationService : DonationService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart(){
    if (localStorage.getItem('token') != null) {
      this.cartService.findUserCart(this.userid).subscribe(
        (cart) => this.userCart = cart,
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
        },
        () => console.log("User Cart Loaded")
      );
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onSelect(id){
    this.cartService.removeCartItem(id).subscribe(
      (data) =>{
        console.log("User Deleted: " + data);
        this.loadCart();
      }, 
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
        },
        () => console.log("Cart Item Deleted")
      );
  }

  ngAfterViewInit() {
    this.loadCart();
  }

  onEditClick(){
    this.edit = true;
  }

  emptyCart(){
      this.cartService.removeUserCart(this.userid).subscribe(
        (carts) =>{
          this.userCart = carts,
          this.router.navigate(['/startdonation']);
        }, 
        (error) => {
          this.errorMsg = error;
          this.router.navigate(['/error']);
        },
        () => console.log("User Cart Deleted")
      );
    }

    saveToDonations(){
        this.donationService.saveDonationsBulk(this.userCart).subscribe(
          (carts) => console.log("Donations bulk has been saved from cart"),
          (error) => {
            this.errorMsg = error;
            this.router.navigate(['/error']);
          },
          () => console.log("User Cart has been stored to Donations")
        )
        this.emptyCart();
    }

}
