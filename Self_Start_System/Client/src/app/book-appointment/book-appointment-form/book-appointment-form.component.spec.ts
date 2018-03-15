import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentFormComponent } from './book-appointment-form.component';

describe('BookAppointmentFormComponent', () => {
  let component: BookAppointmentFormComponent;
  let fixture: ComponentFixture<BookAppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAppointmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
