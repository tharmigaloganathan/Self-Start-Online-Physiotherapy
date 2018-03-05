import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manage-user-accounts',
  templateUrl: './admin-manage-user-accounts.component.html',
  styleUrls: ['./admin-manage-user-accounts.component.scss']
})
export class AdminManageUserAccountsComponent implements OnInit {
	router;

  constructor(router: Router) {
		this.router = router;
	}

  ngOnInit() {
  }

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/admin/user-accounts']);
	}

}
