import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioPatientListComponent } from './physio-patient-list.component';

describe('PhysioPatientListComponent', () => {
  let component: PhysioPatientListComponent;
  let fixture: ComponentFixture<PhysioPatientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioPatientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
