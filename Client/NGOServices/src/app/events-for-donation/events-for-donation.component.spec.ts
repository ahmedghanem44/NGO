import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsForDonationComponent } from './events-for-donation.component';

describe('EventsForDonationComponent', () => {
  let component: EventsForDonationComponent;
  let fixture: ComponentFixture<EventsForDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsForDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsForDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
