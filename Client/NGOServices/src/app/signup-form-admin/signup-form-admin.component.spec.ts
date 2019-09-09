import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormAdminComponent } from './signup-form-admin.component';

describe('SignupFormAdminComponent', () => {
  let component: SignupFormAdminComponent;
  let fixture: ComponentFixture<SignupFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
