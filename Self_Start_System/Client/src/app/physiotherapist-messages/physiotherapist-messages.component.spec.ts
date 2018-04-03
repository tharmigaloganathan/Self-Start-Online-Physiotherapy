import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistMessagesComponent } from './physiotherapist-messages.component';

describe('PhysiotherapistMessagesComponent', () => {
  let component: PhysiotherapistMessagesComponent;
  let fixture: ComponentFixture<PhysiotherapistMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
