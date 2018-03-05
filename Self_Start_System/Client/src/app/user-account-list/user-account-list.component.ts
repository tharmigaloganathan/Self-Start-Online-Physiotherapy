import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { CreateUserAccountService } from '../create-user-account.service';
import { UserAccountListService } from '../user-account-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account-list',
  templateUrl: './user-account-list.component.html',
  styleUrls: ['./user-account-list.component.scss'],
	providers: [ManagePatientProfileService, CreateUserAccountService, UserAccountListService],
})
export class UserAccountListComponent implements OnInit {
	userAccountListService;
	router;
	users = {};
	physiotherapists = {};
	activeUser;
	activeIndex;

	constructor(userAccountListService: UserAccountListService, router: Router) {
		this.userAccountListService = userAccountListService;
		this.router = router;
  }

  ngOnInit() {
		this.getPatientAccounts();
		this.getPhysiotherapistAccounts();
  }

	//Route to create account page
	createAccount() {
		this.router.navigate(['/create-account']);
	}

	//Get all user patient accounts
	getPatientAccounts() {
		this.users = this.userAccountListService.getAllPatients().
		subscribe(
			user => {
				this.users = user;
				console.log("This is what was returned" + JSON.stringify(user);
			},
			error => {
				console.log("Error");
			});
	}

	//Get a physiotherapist accounts
	getPhysiotherapistAccounts() {
		this.physiotherapists = this.userAccountListService.getAllPhysiotherapists().
		subscribe(
			user => {
				this.physiotherapists = user;
				console.log("This is what was returned" + JSON.stringify(user);
			},
			error => {
				console.log("Error");
			});
	}

	//View the selected patients account
	viewAccount(index) {
		this.activeIndex = index;
		console.log(this.users[index].account);
		this.userAccountListService.getUserAccount(this.users[index].account).
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
