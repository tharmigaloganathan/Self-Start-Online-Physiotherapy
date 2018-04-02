import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeTreatmentDialogComponent } from './visualize-treatment-dialog.component';

describe('VisualizeTreatmentDialogComponent', () => {
  let component: VisualizeTreatmentDialogComponent;
  let fixture: ComponentFixture<VisualizeTreatmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeTreatmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeTreatmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
