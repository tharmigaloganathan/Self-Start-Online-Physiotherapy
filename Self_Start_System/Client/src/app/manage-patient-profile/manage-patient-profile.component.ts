import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountListService } from '../user-account-list.service';
import { AuthenticationService } from "../authentication.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import {EditCustomRehabilitationPlanComponent} from "../edit-custom-rehabilitation-plan/edit-custom-rehabilitation-plan.component";

@Component({
  selector: 'app-manage-patient-profile',
  templateUrl: './manage-patient-profile.component.html',
  styleUrls: ['./manage-patient-profile.component.scss'],
  providers: [UserAccountListService, AuthenticationService, ManagePatientProfileService ]
})
export class ManagePatientProfileComponent implements OnInit {

	router;
	userAccountListService;
	authenticationService;
	managePatientProfileService;
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
	activeExercise;
	activeAssessmentTest;
	rehabPlanHistory;
	selectedRow;
	currentUser;

	constructor(router: Router,
							userAccountListService: UserAccountListService,
							authenticationService: AuthenticationService,
							managePatientProfileService: ManagePatientProfileService,
              private rehabilitationPlanService: RehabilitationPlanService,
							public toastr: ToastsManager,
             	vcr: ViewContainerRef) {
		this.router = router;
		this.userAccountListService = userAccountListService;
		this.authenticationService = authenticationService;
		this.managePatientProfileService = managePatientProfileService;
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

    this.authenticationService.getProfile().subscribe(data => {
      this.currentUser = data;
    });
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
		var length = this.activeTreatment.rehabilitationPlan.length;
		this.rehabPlanHistory = this.activeTreatment.rehabilitationPlan;
		this.activeRehabPlan = this.rehabPlanHistory[length-4];
		console.log("Active rehab plan" + JSON.stringify(this.activeRehabPlan));
		//this.activeRehabPlan = this.activeTreatment.rehabilitationPlan[length - 1];
		this.selectedRow = length -1;
		this.activeRehabPlanExercises = [];
		this.activeRehabPlanAssessmentTests = [];
		this.getRehabPlanExercises();
		this.getRehabPlanAssessmentTests();
		this.getRehabPlanPhysio();
}

	//View the list of all treatments
	viewTreatmentList() {
		this.showPlan = false;
}

	//Edit the selected rehab plan
	editRehabPlan() {
	localStorage.setItem('edit_rehabilitation_id', this.activeRehabPlan._id);
	this.router.navigate(['physio/rehabilitation-plans/edit-custom']);
}

	//Renew treatment
	renewTreatment() {
	this.activeTreatment.dateStart = new Date();
	console.log(this.activeTreatment);
	this.managePatientProfileService.updateTreatment(this.activeTreatment, this.activeTreatment._id).
	subscribe( data => {
		this.toastr.success("Treatment has been renewed!");
	});
}

	//Close treatment
	closeTreatment() {
	this.activeTreatment.active = false;
	console.log(this.activeTreatment);
	this.managePatientProfileService.updateTreatment(this.activeTreatment, this.activeTreatment._id).
	subscribe( data => {
		this.toastr.success("Treatment has been closed!");
	});
}

	//Update the view when a new rehab plan is clicked on
	setActiveRehabPlan(index) {
		this.selectedRow = index;
		this.activeRehabPlan = this.activeTreatment.rehabilitationPlan[index];
		this.activeRehabPlanExercises = [];
		this.activeRehabPlanAssessmentTests = [];
		this.getRehabPlanExercises();
		this.getRehabPlanAssessmentTests();
		this.getRehabPlanPhysio();
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
                    console.log("TREATMENTS",this.treatments);
					//this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
					//this.age = this.age[0] + " years";
					console.log(this.user);
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
				for(var i=0; i<this.activeRehabPlan.exercises.length; i++) {
					this.userAccountListService.getExercise(this.activeRehabPlan.exercises[i]).subscribe(
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

			//Get the physio assoicated with the rehab plan
			getRehabPlanPhysio() {
				this.userAccountListService.getPhysio(this.activeTreatment.physiotherapist).subscribe(
					data => {
						this.physiotherapist = data;
						console.log(this.physiotherapist);
					});
			}

			//Sets the active exercise for the exercise modal
			setActiveExercise(index) {
				console.log(index);
				this.activeExercise = this.activeRehabPlanExercises[index];
				console.log(this.activeExercise);
			}

			//Sets the active assessment test for the assessment test modal
			setActiveAssessmentTest(index) {

			}

    newTreatment(){
      let rehabPlan = {
        dateStart: null,
        dateEnd: null,
        name: ' ',
        description: ' ',
        authorName: ' ',
        goal: ' ',
        timeFrameToComplete: ' ',
        exerciseOrders: [],
        assessmentTests: [],
        treatments: [],
      };
      console.log("User= "+this.user._id+" Physio= "+this.currentUser[1].physiotherapist._id);
      this.rehabilitationPlanService.addRehabilitationPlan(rehabPlan).subscribe( data => {
        console.log(data);
          let treatment = { // dateAssign and active fields are populated by default
            patientProfile: this.user._id,
            physiotherapist: this.currentUser[1].physiotherapist._id,
            rehabilitationPlan: data.rehabilitationPlan._id,
            recommendations: [],
          };
        localStorage.setItem('edit_rehabilitation_id',data.rehabilitationPlan._id);
        localStorage.setItem('new_treatment','TRUE');
        console.log(treatment);
          this.managePatientProfileService.addTreatment(treatment).subscribe( treatmentData => {
            console.log(treatmentData);
            this.router.navigate(['physio/rehabilitation-plans/edit-custom']);
          });
        }
      );
    }

}
