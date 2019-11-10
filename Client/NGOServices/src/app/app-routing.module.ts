import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { EventsForDonationComponent } from './events-for-donation/events-for-donation.component';
// import { SignupFromComponent } from './signup-from/signup-from.component';
// import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  // {path:'',redirectTo:'home',pathMatch:'full'},
  // { path: 'home', component: EventsForDonationComponent },
  // { path: 'signup', component: SignupFromComponent },
  // { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
