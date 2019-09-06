import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserService } from './user.service'

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

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    SignupFromComponent,
    EventsForDonationComponent,
    UserProfileComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // FormBuilder
  ],
  providers: [UserService,EventService,DonationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
