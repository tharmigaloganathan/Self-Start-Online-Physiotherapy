import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioManagePatientsComponent } from './physio-manage-patients.component';

describe('PhysioManagePatientsComponent', () => {
  let component: PhysioManagePatientsComponent;
  let fixture: ComponentFixture<PhysioManagePatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioManagePatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioManagePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
