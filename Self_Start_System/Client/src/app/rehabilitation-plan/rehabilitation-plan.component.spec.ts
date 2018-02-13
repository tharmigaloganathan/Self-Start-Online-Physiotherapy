import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationPlanComponent } from './rehabilitation-plan.component';

describe('RehabilitationPlanComponent', () => {
  let component: RehabilitationPlanComponent;
  let fixture: ComponentFixture<RehabilitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
