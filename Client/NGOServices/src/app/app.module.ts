import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Component } from '@angular/core';
import { UserService } from './user.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { EventService } from './event.service';
import { SignupFromComponent } from './signup-from/signup-from.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DonationService } from './donation.service';
import { EventsForDonationComponent } from './events-for-donation/events-for-donation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { AddEventComponent } from './add-event/add-event.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { CartComponent } from './cart/cart.component';
import { DonationMngComponent } from './donation-mng/donation-mng.component';
import { EventMngComponent } from './event-mng/event-mng.component';
import { HomeComponent } from './home/home.component';

import { MakeDonationComponent } from './make-donation/make-donation.component';

import { UserMngComponent } from './user-mng/user-mng.component';
import { HomeInComponent } from './home-in/home-in.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ErrorComponent } from './error/error.component';
import { AdminGuardService } from './admin-guard.service';
import { NavBarUserComponent } from './nav-bar-user/nav-bar-user.component';
import { SignupFormAdminComponent } from './signup-form-admin/signup-form-admin.component';
import { NavBarHomeComponent } from './nav-bar-home/nav-bar-home.component';
import { CartService } from './cart.service';






@NgModule({
  declarations: [
    AppComponent,

    SignupFromComponent,
    EventsForDonationComponent,
    UserProfileComponent,
    SigninComponent,
    NavBarComponent,

    HomeComponent,
    UserMngComponent,
    DonationMngComponent,
    MakeDonationComponent,
    CartComponent,

    AddEventComponent,
    EventMngComponent,
    AdminUserEditComponent,
 
    HomeInComponent,
    EditEventComponent,
    ErrorComponent,
    NavBarUserComponent,
    SignupFormAdminComponent,
    NavBarHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    // FormBuilder
    RouterModule.forRoot([

      {
        path: 'signin', // nemo
        component:HomeComponent
      },
      {
        path: 'home', // nemo
        component:HomeComponent
      },
      {
        path: 'homein', // nemo
        component:HomeInComponent
      },
      {
        path: 'editevent', // nemo
        component:EditEventComponent,
        canActivate : [AdminGuardService]
      },
      {
        path: 'error', // nemo
        component:ErrorComponent
      },
      {
        path: 'startdonation', // nemo
        component:EventsForDonationComponent
      },
      {
        path: 'makedonation', // nemo
        component:MakeDonationComponent
      },
      {
        path: 'signupadmin', // nemo
        component: SignupFormAdminComponent,
        canActivate : [AdminGuardService]
      },
      {
        path: 'profile', // nemo
        component: UserProfileComponent
      },
      {
        path: 'user_mng',
        component: UserMngComponent,
        canActivate : [AdminGuardService]
      },

      {
        path: 'donation_mng',
        component: DonationMngComponent,
        canActivate : [AdminGuardService]
      },
      {
        path: 'make_donation',
        component: MakeDonationComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },

      {
        path: 'add_event',
        component: AddEventComponent,
        canActivate : [AdminGuardService]
      },
      {
        path: 'signup',
        component: SignupFromComponent
      },
      {
        path: 'event_mng',
        component: EventMngComponent,
        canActivate : [AdminGuardService]
      },
      {
        path: 'admin-user-edit',
        component: AdminUserEditComponent,
        canActivate : [AdminGuardService]
      },
      {
        path: '',
        component: HomeComponent
      }

    ])
  ],
  providers: [UserService,EventService,DonationService,AdminGuardService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
