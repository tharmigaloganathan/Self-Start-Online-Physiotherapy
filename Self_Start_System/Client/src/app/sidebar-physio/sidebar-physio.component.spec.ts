import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPhysioComponent } from './sidebar-physio.component';

describe('SidebarPhysioComponent', () => {
  let component: SidebarPhysioComponent;
  let fixture: ComponentFixture<SidebarPhysioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPhysioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPhysioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
