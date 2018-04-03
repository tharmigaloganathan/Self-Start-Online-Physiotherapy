import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { CreateUserAccountService } from '../create-user-account.service';
import { UserAccountListService } from '../user-account-list.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

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
	filteredUsers = {};
	physiotherapists = {};
	isPhysio;
	displayedColumns = ['givenName', 'familyName', 'email'];
	patientDataSource;
	displayedColumnsPhysio = ['givenName', 'familyName', 'email'];
	physioDataSource;
	loading = false;
	activeUser;
	activePhysio

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
				//console.log("This is what was returned" + JSON.stringify(user));
				this.setUpDataSource(user);
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
				this.setUpPhysioDataSource(user);
			},
			error => {
				console.log("Error");
			});
	}

	//View the users full profile
	viewProfile(user) {
		//Store the users information in local storage
		console.log("Putting this in store for the user" + user);
		localStorage.setItem('selectedPatient', JSON.stringify(user));
		console.log("Putting this in store for the account" + this.activeUser);
		localStorage.setItem('selectedAccount', JSON.stringify(this.activeUser));
		this.router.navigate(['admin/user-accounts/manage']);
	}

	//View the physios full profile
	viewPhysio(physio) {
		console.log("Putting this in store for the physio" + physio);
		localStorage.setItem('selectedPhysio', JSON.stringify(physio));
		console.log("Putting this in store for the account" + this.activePhysio);
		localStorage.setItem('selectedAccount', JSON.stringify(this.activePhysio));
		this.router.navigate(['admin/user-accounts/manage']);
}

	//Set the user type to display the corresponding user list
	setUserType(type) {
		this.isPhysio = type;
		console.log(this.isPhysio);
	}

	//Setup the datasource for the patient
	setUpDataSource = users => {
		this.patientDataSource = new MatTableDataSource(users);
	};

	//Setup the datasource for physio
	setUpPhysioDataSource = physiotherapists => {
		this.physioDataSource = new MatTableDataSource(physiotherapists);
	};

	//View the users profile
	selectRow = row => {
		console.log("Account id" + row.accont);
		this.userAccountListService.getUserAccount(row.account).
		subscribe(
			user => {
				this.activeUser = user;
				console.log(this.activeUser);
				//Redirect to users profile
				this.loading = true;
				setTimeout(() => {
					this.viewProfile(row);
					this.loading = false;
				}, 500);
			},
			error => {
				console.log("Error");
			});
	};

	//View the physio's profile
	selectRowPhysio = row=> {
		console.log("Physio row" + JSON.stringify(row));
		this.userAccountListService.getUserAccount(row.userAccount).
		subscribe(
			user => {
				this.activePhysio = user;
				console.log(this.activePhysio);
				//Redirect to physios profile
				this.loading = true;
				setTimeout(() => {
					this.viewPhysio(row);
					this.loading = false;
				}, 500);
			},
			error => {
				console.log("Error");
			});
	};

	//Filter search results
	filterItem(value: string) {
		value = value.trim();
		value = value.toLowerCase();
		this.patientDataSource.filter = value;
		this.physioDataSource.filter = value;
	}

}
