import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBelieveComponent } from './home-page-believe.component';

describe('HomePageBelieveComponent', () => {
  let component: HomePageBelieveComponent;
  let fixture: ComponentFixture<HomePageBelieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageBelieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageBelieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
