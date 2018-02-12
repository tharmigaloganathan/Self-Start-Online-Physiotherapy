import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRehabilitationPlanComponent } from './new-rehabilitation-plan.component';

describe('NewRehabilitationPlanComponent', () => {
  let component: NewRehabilitationPlanComponent;
  let fixture: ComponentFixture<NewRehabilitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRehabilitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRehabilitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
