import { Component, OnInit} from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { UserAccountListService } from '../user-account-list.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-physio-patient-list',
  templateUrl: './physio-patient-list.component.html',
  styleUrls: ['./physio-patient-list.component.scss'],
	providers: [ManagePatientProfileService, UserAccountListService],
})
export class PhysioPatientListComponent implements OnInit {

	userAccountListService;
	router;
	patients = [];
	myPatients = [];
	isMyPatient;
	displayedColumns = ['givenName', 'familyName', 'email'];
	patientDataSource;
	displayedColumnsMyPatients = ['givenName', 'familyName', 'email'];
	myPatientsDataSource;
	loading = false;
	activeUser;

	constructor(userAccountListService: UserAccountListService, router: Router) {
		this.userAccountListService = userAccountListService;
		this.router = router;
	}

  ngOnInit() {
		this.getPatientAccounts();
		this.isMyPatient = 0;
  }

	//Filters between all patients and my patients
	setUserType(type) {
		this.isMyPatient = type;
		console.log(this.isMyPatient);
	}

	//Get all user patient accounts
	getPatientAccounts() {
		this.userAccountListService.getAllPatients().
		subscribe(
			user => {
				this.patients = user;
				console.log("This is what was returned" + JSON.stringify(user));
				this.setUpDataSource(user);
			},
			error => {
				console.log("Error");
			});
	}

	//Gets all the physios patients
/*
	getMyPatients() {
		for(var i=0; i<this.patients.length; i++) {
		}
}
*/

	//Setup the datasource for the patient
	setUpDataSource = patients => {
		this.patientDataSource = new MatTableDataSource(patients);
	};

	//Setup the datasource for my patients
	setUpMyPatientsDataSource = myPatients => {
		this.myPatientsDataSource = new MatTableDataSource(myPatients);
	};

	//View the users profile
	selectRow = row => {
		console.log("Account id" + row.account);
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

	//View the users full profile
	viewProfile(user) {
		//Store the users information in local storage
		console.log("Putting this in store for the user" + user);
		localStorage.setItem('selectedPatient', JSON.stringify(user));
		console.log("Putting this in store for the account" + this.activeUser);
		localStorage.setItem('selectedAccount', JSON.stringify(this.activeUser));
		this.router.navigate(['physio/patients/' + user.givenName.toLowerCase() + "-" + user.familyName.toLowerCase()]);
	}

	//Filter search results
	filterItem(value: string) {
		value = value.trim();
		value = value.toLowerCase();
		this.patientDataSource.filter = value;
		this.myPatientsDataSource.filter = value;
	}

}
