import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { CreateUserAccountService } from '../create-user-account.service';

@Component({
  selector: 'app-user-account-list',
  templateUrl: './user-account-list.component.html',
  styleUrls: ['./user-account-list.component.scss'],
	providers: [ManagePatientProfileService, CreateUserAccountService],
})
export class UserAccountListComponent implements OnInit {
	patientProfileService;
	userAccountService;
	userAccounts = ["Andrew", "Sooruj", "Nick"];
	users = {};
	physiotherapists = {};
	activeUser;
	activeIndex;

	constructor(patientProfileService: ManagePatientProfileService, userAccountService: CreateUserAccountService) {
		this.patientProfileService = patientProfileService
		this.userAccountService = userAccountService;
  }

  ngOnInit() {
		this.getPatientAccounts();
  }

	//Get all user account
	getPatientAccounts() {
		this.users = this.userAccountService.getAllUserAccounts().
		subscribe(
			user => {
				this.users = user;
				console.log("This is what was returned" + JSON.stringify(user);
			},
			error => {
				console.log("Error");
			});
	}

	//View the selected patients account
	viewAccount(index) {
		this.activeIndex = index;
		console.log(index);
		console.log(this.users[index].account);
		this.userAccountService.getuserAccount(this.users[index].account).
		subscribe(
			user => {
				this.activeUser = user;
				console.log(this.activeUser);
			},
			error => {
				console.log("Error");
			});
	}

}
