import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageHowItWorksComponent } from './home-page-how-it-works.component';

describe('HomePageHowItWorksComponent', () => {
  let component: HomePageHowItWorksComponent;
  let fixture: ComponentFixture<HomePageHowItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageHowItWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
