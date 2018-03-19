import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountListService } from '../user-account-list.service';

@Component({
  selector: 'app-admin-manage-user-accounts',
  templateUrl: './admin-manage-user-accounts.component.html',
  styleUrls: ['./admin-manage-user-accounts.component.scss'],
	providers: [UserAccountListService]
})
export class AdminManageUserAccountsComponent implements OnInit {
	router;
	userAccountListService;
	user = {};
	account = {};
	loading = false;
	isChanged = false;
	today = new Date();
	age;

  constructor(router: Router, userAccountListService: UserAccountListService) {
		this.router = router;
		this.userAccountListService = userAccountListService;
	}

  ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('selectedPatient'));
		this.account = JSON.parse(localStorage.getItem('selectedAccount'));
		this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
		this.age = this.age.toFixed(0) + " years";
  }

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/admin/user-accounts']);
	}

	//Make information editable
	editPatientInfo() {
		this.isChanged = true;
	}

	cancelEdit() {
		this.user = JSON.parse(localStorage.getItem('selectedPatient'));
		this.isChanged = false;
	}

	//Reset the users Password
	resetPassword() {
		console.log("Reset password clicked");
		this.loading = true;
		const patientAccount = {
			_id: this.account._id,
			userAccountName: this.account.userAccountName,
			encryptedPassword: "passwordreset",
			patientProfile: this.user._id
		}
		console.log(patientAccount);
		this.userAccountListService.updateUserAccount(this.user._id, patientAccount).
		subscribe(
			user => {
				this.account = user;
				console.log("This was returned for reset password" + JSON.stringify(user));
				this.loading = false;
			},
			error => {
				console.log("Error");
				this.loading = false;
			});
	}

	//Delete the users account
	deleteAccount() {
		console.log("Delete account clicked");
		this.loading = true;
		sleep(2000);
		this.loading = false;
	}


}
