import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPhysioComponent } from './dashboard-physio.component';

describe('DashboardPhysioComponent', () => {
  let component: DashboardPhysioComponent;
  let fixture: ComponentFixture<DashboardPhysioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPhysioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPhysioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
