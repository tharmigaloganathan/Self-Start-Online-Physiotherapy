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
	isPhysio;

	constructor(userAccountListService: UserAccountListService, router: Router) {
		this.userAccountListService = userAccountListService;
		this.router = router;

  }

  ngOnInit() {
		this.getPatientAccounts();
		this.getPhysiotherapistAccounts();
		this.isPhysio = 0;
  }

	//Route to create account page
	createAccount() {
		this.router.navigate(['/create-account']);
	}

	//Get all user patient accounts
	getPatientAccounts() {
		this.userAccountListService.getAllPatients().
		subscribe(
			user => {
				this.users = user;
				console.log("This is what was returned" + JSON.stringify(user));
			},
			error => {
				console.log("Error");
			});
	}

	//Get a physiotherapist accounts
	getPhysiotherapistAccounts() {
		this.userAccountListService.getAllPhysiotherapists().
		subscribe(
			user => {
				this.physiotherapists = user;
				console.log("This is what was returned for physio" + JSON.stringify(user));
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
			//Redirect to users profile
			this.viewProfile();
	}

	//Reset patient password
	resetPatientPassword() {
		const patientAccount = {
			_id: this.activeUser._id,
			userAccountName: this.activeUser.userAccountName,
			encryptedPassword: "password",
			patientProfile: this.activeUser.patientProfile
		}
		this.userAccountListService.updateUserAccount(this.activeUser._id, patientAccount).
		subscribe(
			user => {
				this.activeUser = user;
				console.log("This was returned for reset password" + JSON.stringify(user));
			},
			error => {
				console.log("Error");
			});
	}

	//View the users full profile
	viewProfile() {
		//Store the users information in local storage
		console.log("Putting this in store for the user" + this.users[this.activeIndex]);
		localStorage.setItem('selectedPatient', JSON.stringify(this.users[this.activeIndex]));
		console.log("Putting this in store for the user" + this.activeUser);
		localStorage.setItem('selectedAccount', JSON.stringify(this.activeUser));
		this.router.navigate(['admin/user-accounts/manage']);
	}

	//Set the user type to display the corresponding user list
	setUserType(type) {
		this.isPhysio = type;
		console.log(this.isPhysio);
	}

}
