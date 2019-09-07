import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInComponent } from './home-in.component';

describe('HomeInComponent', () => {
  let component: HomeInComponent;
  let fixture: ComponentFixture<HomeInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
