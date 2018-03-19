import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRehabilitationPlanComponent } from './view-rehabilitation-plan.component';

describe('ViewRehabilitationPlanComponent', () => {
  let component: ViewRehabilitationPlanComponent;
  let fixture: ComponentFixture<ViewRehabilitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRehabilitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRehabilitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
