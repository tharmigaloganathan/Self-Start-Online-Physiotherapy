import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssessmentTestDialogComponent } from './edit-assessment-test-dialog.component';

describe('EditAssessmentTestDialogComponent', () => {
  let component: EditAssessmentTestDialogComponent;
  let fixture: ComponentFixture<EditAssessmentTestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssessmentTestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssessmentTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
