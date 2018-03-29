import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountListService } from '../user-account-list.service';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-manage-patient-profile',
  templateUrl: './manage-patient-profile.component.html',
  styleUrls: ['./manage-patient-profile.component.scss'],
  providers: [UserAccountListService, AuthenticationService]
})
export class ManagePatientProfileComponent implements OnInit {

	router;
	userAccountListService;
	authenticationService;
	loading = false;
	isChanged = false;
	user;
	account;
	today = new Date();
	age: any;
	genders;
	provinces;
	countries;
	appointments;

	constructor(router: Router, userAccountListService: UserAccountListService, authenticationService: AuthenticationService) {
		this.router = router;
		this.userAccountListService = userAccountListService;
		this.authenticationService = authenticationService;
}

  ngOnInit() {
		this.account = JSON.parse(localStorage.getItem('selectedAccount'));
		this.populatePopulatePatient(this.account.patientProfile);
		this.populateAppointments(this.account.patientProfile);
		this.populateGenders();
		this.populateProvinces();
		this.populateCountries();
	}

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/physio/patients']);
	}

	//Make information editable
	editPatientInfo() {
		this.isChanged = true;
	}

	//Reset the patient info
	cancelEdit() {
		this.user = JSON.parse(localStorage.getItem('selectedPatient'));
		this.isChanged = false;
	}

	//Update the patients information
	savePatientInfo() {
		const patientProfile = {
			familyName: this.user.familyName,
			givenName: this.user.givenName,
			email: this.user.email,
			DOB: this.user.DOB,
			postalCode: this.user.postalCode,
			phone: this.user.phone,
			address: this.user.address,
			account: this.user.account,
			treatments: this.user.treatments,
			payments: this.user.payments,
			country: this.user.country,
			province:  this.user.province,
			city:  this.user.city,
			gender: this.user.gender,
			appointments: this.user.appointments
		}
		console.log(patientProfile);
		this.userAccountListService.updatePatient(this.user._id, patientProfile).
		subscribe(
			user => {
				this.user = user;
				console.log("This was returned for the patient" + JSON.stringify(user));
				this.snackBar.open("Information updated sucessfully!", "", {
					duration: 1500
				});
				this.isChanged = false;
			},
			error => {
				console.log("Error");
				this.snackBar.open("Error!" + error, "", {
					duration: 1500
				});
			});
		}

		//Get all the genders
		populateGenders() {
			this.userAccountListService.getGenders().
			subscribe(
				data => {
					this.genders = data;
					console.log("This is what was returned" + JSON.stringify(data));
				},
				error => {
					console.log("Error");
				});
				console.log(this.genders);
	}

		//Get all provinces
		populateProvinces() {
		this.userAccountListService.getProvinces().
		subscribe(
			data => {
				this.provinces = data;
				console.log("This is what was returned" + JSON.stringify(data));
			},
			error => {
				console.log("Error");
			});
			console.log(this.provinces);
	}

		//Get all countries
		populateCountries() {
			this.userAccountListService.getCountries().
			subscribe(
				data => {
					this.countries = data;
					console.log("This is what was returned" + JSON.stringify(data));
				},
				error => {
					console.log("Error");
				});
				console.log(this.provinces);
		}

		//Get the users account
		populatePopulatePatient(id) {
			this.userAccountListService.getPatientProfile(id).subscribe(
				data => {
					this.user = data;
					//this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
					//this.age = this.age.toFixed(0) + " years";
					console.log(this.user);
					console.log("Patient profile" + JSON.stringify(this.user));
				});
		 }



}
