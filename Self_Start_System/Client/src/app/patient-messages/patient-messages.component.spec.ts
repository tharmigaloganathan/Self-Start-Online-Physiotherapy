import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMessagesComponent } from './patient-messages.component';

describe('PatientMessagesComponent', () => {
  let component: PatientMessagesComponent;
  let fixture: ComponentFixture<PatientMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
