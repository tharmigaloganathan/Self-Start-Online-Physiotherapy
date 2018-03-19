import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomRehabilitationPlanComponent } from './edit-custom-rehabilitation-plan.component';

describe('EditCustomRehabilitationPlanComponent', () => {
  let component: EditCustomRehabilitationPlanComponent;
  let fixture: ComponentFixture<EditCustomRehabilitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomRehabilitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomRehabilitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
