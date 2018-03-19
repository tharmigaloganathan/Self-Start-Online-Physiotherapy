import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFreeTimeComponent } from './set-free-time.component';

describe('SetFreeTimeComponent', () => {
  let component: SetFreeTimeComponent;
  let fixture: ComponentFixture<SetFreeTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetFreeTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFreeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
