import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRehabilitationPlansComponent } from './patient-rehabilitation-plans.component';

describe('PatientRehabilitationPlansComponent', () => {
  let component: PatientRehabilitationPlansComponent;
  let fixture: ComponentFixture<PatientRehabilitationPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRehabilitationPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRehabilitationPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
