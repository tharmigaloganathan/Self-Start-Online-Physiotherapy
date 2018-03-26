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
	physiotherapists = {};
	isPhysio;
	displayedColumns = ['givenName', 'familyName', 'DOB', 'email'];
	patientDataSource;

	//@ViewChild(MatSort) sort: MatSort;

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
			},
			error => {
				console.log("Error");
			});
	}


	//View the users full profile
	viewProfile(user) {
		//Store the users information in local storage
		console.log("Putting this in store for the user" + user);
		localStorage.setItem('selectedPatient', JSON.stringify(user);
		console.log("Putting this in store for the account" + this.activeUser);
		localStorage.setItem('userAccount', JSON.stringify(this.activeUser));
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
		this.patientDataSource.sort = this.sort;
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
				this.viewProfile(row);
			},
			error => {
				console.log("Error");
			});
	};

}
