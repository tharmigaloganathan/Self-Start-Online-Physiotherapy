import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecommendationDialogComponent } from './edit-recommendation-dialog.component';

describe('EditRecommendationDialogComponent', () => {
  let component: EditRecommendationDialogComponent;
  let fixture: ComponentFixture<EditRecommendationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecommendationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecommendationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
