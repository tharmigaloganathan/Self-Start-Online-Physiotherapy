import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageUserAccountsComponent } from './admin-manage-user-accounts.component';

describe('AdminManageUserAccountsComponent', () => {
  let component: AdminManageUserAccountsComponent;
  let fixture: ComponentFixture<AdminManageUserAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageUserAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
