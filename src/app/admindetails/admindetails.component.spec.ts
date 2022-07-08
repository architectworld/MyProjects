import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindetailsComponent } from './admindetails.component';

describe('AdmindetailsComponent', () => {
  let component: AdmindetailsComponent;
  let fixture: ComponentFixture<AdmindetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
