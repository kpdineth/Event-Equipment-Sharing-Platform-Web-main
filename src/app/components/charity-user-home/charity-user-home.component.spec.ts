import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityUserHomeComponent } from './charity-user-home.component';

describe('CharityUserHomeComponent', () => {
  let component: CharityUserHomeComponent;
  let fixture: ComponentFixture<CharityUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharityUserHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
