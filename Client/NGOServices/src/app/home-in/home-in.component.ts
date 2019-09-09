import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-in',
  templateUrl: './home-in.component.html',
  styleUrls: ['./home-in.component.css']
})
export class HomeInComponent implements OnInit {

  public admin = localStorage.getItem('isAdmin');

  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['/home']);
    }
  }

}
