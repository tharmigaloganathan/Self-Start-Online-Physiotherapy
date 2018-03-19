import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDialogBoxComponent } from './confirm-delete-dialog-box.component';

describe('ConfirmDeleteDialogBoxComponent', () => {
  let component: ConfirmDeleteDialogBoxComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
