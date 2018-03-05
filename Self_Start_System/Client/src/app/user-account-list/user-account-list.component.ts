import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { CreateUserAccountService } from '../create-user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account-list',
  templateUrl: './user-account-list.component.html',
  styleUrls: ['./user-account-list.component.scss'],
	providers: [ManagePatientProfileService, CreateUserAccountService],
})
export class UserAccountListComponent implements OnInit {
	patientProfileService;
	userAccountService;
	router;
	userAccounts = ["Andrew", "Sooruj", "Nick"];
	users = {};
	physiotherapists = {};
	activeUser;
	activeIndex;

	constructor(patientProfileService: ManagePatientProfileService, userAccountService: CreateUserAccountService, router: Router) {
		this.patientProfileService = patientProfileService
		this.userAccountService = userAccountService;
		this.router = router;
  }

  ngOnInit() {
		this.getPatientAccounts();
  }

	//Route to the create account
	createAccount() {
		console.log("Create Account clicked");
		this.router.navigate(['/create-account']);
	}

	create() {
		concole.log("Create Account clicked");
	}

	//Get all user patient accounts
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
