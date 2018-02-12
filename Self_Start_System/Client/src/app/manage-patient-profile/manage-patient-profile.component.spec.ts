import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatientProfileComponent } from './manage-patient-profile.component';

describe('ManagePatientProfileComponent', () => {
  let component: ManagePatientProfileComponent;
  let fixture: ComponentFixture<ManagePatientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePatientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
