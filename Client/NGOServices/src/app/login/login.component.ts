import { Component, OnInit } from '@angular/core';
// import { AuthService} from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(private Auth: AuthService) { }

  ngOnInit() {
  }
  loginUser(event)
  {
    event.preventDefault();
    
    const target = event.target;
    const userN = target.querySelector('#email').value;
    const passw = target.querySelector('#password').value;
    
    // this.Auth.getUser(userN, passw)
    console.log(userN, passw);
  }

}
