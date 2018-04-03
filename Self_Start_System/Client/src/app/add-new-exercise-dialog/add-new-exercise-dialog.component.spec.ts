import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExerciseDialogComponent } from './add-new-exercise-dialog.component';

describe('AddNewExerciseDialogComponent', () => {
  let component: AddNewExerciseDialogComponent;
  let fixture: ComponentFixture<AddNewExerciseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewExerciseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
