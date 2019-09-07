import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDonationComponent } from './make-donation.component';

describe('MakeDonationComponent', () => {
  let component: MakeDonationComponent;
  let fixture: ComponentFixture<MakeDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
