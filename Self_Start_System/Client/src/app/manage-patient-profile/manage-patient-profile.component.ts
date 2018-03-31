import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountListService } from '../user-account-list.service';
import { AuthenticationService } from "../authentication.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
	appointments;
	payments;
	today = new Date();
	age: any;
	genders;
	provinces;
	countries;
	showPlan = false;
	physiotherapist;
	activeTreatmentIndex;
	activeTreatment;
	activeRehabPlan;
	activeRehabPlanExercises = [];
	activeRehabPlanAssessmentTests = [];
	treatments;

	constructor(router: Router,
							userAccountListService: UserAccountListService,
							authenticationService: AuthenticationService,
							public toastr: ToastsManager,
             	vcr: ViewContainerRef) {
		this.router = router;
		this.userAccountListService = userAccountListService;
		this.authenticationService = authenticationService;
		this.toastr.setRootViewContainerRef(vcr);
}

  ngOnInit() {
		/* This is not working right now because User Accounts get by id is not working */
		//this.account = JSON.parse(localStorage.getItem('selectedAccount'));
		//this.populatePopulatePatient(this.account.patientProfile);
		//this.populateAppointments(this.account.patientProfile);
		this.account = JSON.parse(localStorage.getItem('selectedPatient'));
		this.populatePopulatePatient(this.account._id);
		this.populateAppointments(this.account._id);
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

	//Show the rehab plan details
	showRehabPlan(index) {
		this.showPlan = true;
		this.activeTreatmentIndex = index;
		this.activeTreatment = this.user.treatments[this.activeTreatmentIndex];
		//Tempory fix until rehab plans is an array
		this.activeRehabPlan = this.user.treatments[this.activeTreatmentIndex].rehabilitationPlan;
		/* Doesn't work right now b/c rehab plan isn't an array
		this.activeRehabPlan = this.user.treatments[this.activeTreatment].rehabilitationPlan.length - 1;
		console.log(this.user.treatments[this.activeTreatment].rehabilitationPlan.length);
		console.log("Active rehabPlan index" + this.activeRehabPlan);
		console.log(this.user.treatments[this.activeTreatment]);
		*/
		this.getRehabPlanExercises();
		this.getRehabPlanAssessmentTests();
}

	//View the list of all treatments
	viewTreatmentList() {
		this.showPlan = false;
}

	//Edit the selected rehab plan
	editRehabPlan() {
	localStorage.setItem('edit_rehabilitation_id', this.user.treatments[this.activeTreatmentIndex].rehabilitationPlan._id);
	this.router.navigate(['physio/rehabilitation-plans/edit-custom']);
}

	//Renew treatment
	renewTreatment() {
	this.activeTreatment.dateStart = new Date();
	console.log(this.activeTreatment);
	/*
	this.managePatientProfileService.updateTreatment(this.activeTreatment, this.activeTreatmen._id).
	subscribe( data => {
		this.toastr.success("Treatment has been renewed!");
	});
	*/
}

	//Close treatment
	closeTreatment() {
	this.activeTreatment.active = false;
	console.log(this.activeTreatment);
	/*
	this.managePatientProfileService.updateTreatment(this.activeTreatment, this.activeTreatmen._id).
	subscribe( data => {
		this.toastr.success("Treatment has been renewed!");
	});
	*/
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
				this.isChanged = false;
				localStorage.setItem('selectedPatient', JSON.stringify(user));
				this.toastr.success("Information updated sucessfully!");
			},
			error => {
				console.log("Error");
				this.toastr.error("Failed to update information! Please try again.");
			});
	}

		//Get all the genders
		populateGenders() {
			this.userAccountListService.getGenders().
			subscribe(
				data => {
					this.genders = data;
				},
				error => {
					console.log("Error");
				});
	}

		//Get all provinces
		populateProvinces() {
		this.userAccountListService.getProvinces().
		subscribe(
			data => {
				this.provinces = data;
			},
			error => {
				console.log("Error");
			});
	}

		//Get all countries
		populateCountries() {
			this.userAccountListService.getCountries().
			subscribe(
				data => {
					this.countries = data;
				},
				error => {
					console.log("Error");
				});
		}

		//Get the users account
		populatePopulatePatient(id) {
			this.userAccountListService.getPatientProfile(id).subscribe(
				data => {
					this.user = data;
					this.treatments = this.user.treatments;
					console.log(JSON.stringify(this.treatments));
					//this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
					//this.age = this.age[0] + " years";
					console.log("Patient profile" + JSON.stringify(this.user));
				});
		 }

		 //Get the users appointments
		 populateAppointments(id) {
		 this.userAccountListService.getAppointments(id).subscribe(
			 data => {
				 this.appointments = data;
			 });
			}

			//Get the users payments
			populatePayments(id) {
			//To be written after payments is made
		}

			//Get exercsies for the selected rehab plan
			getRehabPlanExercises() {
				for(var i=0; i<this.activeRehabPlan.exerciseOrders.length; i++) {
					this.userAccountListService.getExercise(this.activeRehabPlan.exerciseOrders[i]).subscribe(
						data => {
							this.activeRehabPlanExercises.push(data);
							console.log(this.activeRehabPlanExercises);
						});
					}
				}

			//Get Assessment Test for the selected rehab plan
			getRehabPlanAssessmentTests() {
			for(var i=0; i<this.activeRehabPlan.assessmentTests.length; i++) {
				this.userAccountListService.getAssessmentTest(this.activeRehabPlan.assessmentTests[i]).subscribe(
					data => {
						this.activeRehabPlanAssessmentTests.push(data);
						console.log(this.activeRehabPlanAssessmentTests);
					});
				}
			}

}
