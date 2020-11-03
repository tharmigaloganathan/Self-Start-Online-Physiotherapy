import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRehabilitationPlanComponent } from './edit-rehabilitation-plan.component';

describe('EditRehabilitationPlanComponent', () => {
  let component: EditRehabilitationPlanComponent;
  let fixture: ComponentFixture<EditRehabilitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRehabilitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRehabilitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
