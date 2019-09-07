import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationMngComponent } from './donation-mng.component';

describe('DonationMngComponent', () => {
  let component: DonationMngComponent;
  let fixture: ComponentFixture<DonationMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
