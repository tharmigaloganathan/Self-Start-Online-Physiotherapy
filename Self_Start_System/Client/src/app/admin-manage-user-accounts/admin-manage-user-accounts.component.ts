import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manage-user-accounts',
  templateUrl: './admin-manage-user-accounts.component.html',
  styleUrls: ['./admin-manage-user-accounts.component.scss']
})
export class AdminManageUserAccountsComponent implements OnInit {
	router;
	user = {};
	account = {}

  constructor(router: Router) {
		this.router = router;
	}

  ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('selectedPatient'));
		this.account = JSON.parse(localStorage.getItem('selectedAccount'));
  }

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/admin/user-accounts']);
	}

	//Reset the users Password
	resetPassword() {
		console.log("Reset password clicked");
	}

	//Delete the users account
	deleteAccount() {
		console.log("Delete account clicked");
	}

}
