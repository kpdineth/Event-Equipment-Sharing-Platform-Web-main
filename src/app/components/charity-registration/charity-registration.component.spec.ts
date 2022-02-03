import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityRegistrationComponent } from './charity-registration.component';

describe('CharityRegistrationComponent', () => {
  let component: CharityRegistrationComponent;
  let fixture: ComponentFixture<CharityRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharityRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
