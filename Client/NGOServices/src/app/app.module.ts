import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Component } from '@angular/core';
import { UserService } from './user.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { EventService } from './event.service';
import { SignupFromComponent } from './signup-from/signup-from.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DonationService } from './donation.service';
import { EventsForDonationComponent } from './events-for-donation/events-for-donation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { CartComponent } from './cart/cart.component';
import { DonationMngComponent } from './donation-mng/donation-mng.component';
import { EventMngComponent } from './event-mng/event-mng.component';
import { HomeComponent } from './home/home.component';
import { ListOfEventsComponent } from './list-of-events/list-of-events.component';
import { MakeDonationComponent } from './make-donation/make-donation.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMngComponent } from './user-mng/user-mng.component';
import { HomeInComponent } from './home-in/home-in.component';
import { EditEventComponent } from './edit-event/edit-event.component';






@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    SignupFromComponent,
    EventsForDonationComponent,
    UserProfileComponent,
    SigninComponent,
    NavBarComponent,
    AdminComponent,
    HomeComponent,
    UserMngComponent,
    DonationMngComponent,
    MakeDonationComponent,
    CartComponent,
    UserInfoComponent,
    AddEventComponent,
    EventMngComponent,
    AdminUserEditComponent,
    UserHomeComponent,
    ListOfEventsComponent,
    LoginComponent,
    HomeInComponent,
    EditEventComponent
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
        path: 'login',
        component:LoginComponent
      },
      {
        path: 'signin', // nemo
        component:HomeComponent
      },
      {
        path: 'home', // nemo
        component:LoginComponent
      },
      {
        path: 'homein', // nemo
        component:HomeInComponent
      },
      {
        path: 'user_mng',
        component: UserMngComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'donation_mng',
        component: DonationMngComponent
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
        path: 'user_info',
        component: UserInfoComponent
      },
      {
        path: 'add_event',
        component: AddEventComponent
      },
      {
        path: 'signup',
        component: SignupFromComponent
      },
      {
        path: 'event_mng',
        component: EventMngComponent
      },
      {
        path: 'admin-user-edit',
        component: AdminUserEditComponent
      },
      {
        path: '',
        component: HomeComponent
      }

    ])
  ],
  providers: [UserService,EventService,DonationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
