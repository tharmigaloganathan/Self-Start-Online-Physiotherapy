import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPhysioComponent } from './navbar-physio.component';

describe('NavbarPhysioComponent', () => {
  let component: NavbarPhysioComponent;
  let fixture: ComponentFixture<NavbarPhysioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarPhysioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPhysioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
