import { Component, OnInit } from '@angular/core';
import { PatientRehabilitationPlansService } from '../patient-rehabilitation-plans.service';
import { Router } from '@angular/router';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-patient-rehabilitation-plans',
  templateUrl: './patient-rehabilitation-plans.component.html',
  styleUrls: ['./patient-rehabilitation-plans.component.scss'],
	providers: [PatientRehabilitationPlansService, AuthenticationService]
})
export class PatientRehabilitationPlansComponent implements OnInit {

	router;
	authenticationService;
	rehabilitationPlansService;
	showDetails = 1;
	showExercises = 0;
	viewExerciseDetails = 0;
	showAssessmentTests = 0;
	account: any;
	treatments = [];
	plans = [];
	rehabilitationPlans = [];
	exercises = [];
	assessmentTests = [];
	selected: any;
	activeExercise;
	patientProfile;

  constructor(rehabilitationPlansService: PatientRehabilitationPlansService, router: Router, authenticationService: AuthenticationService) {
		this.router = router;
		this.authenticationService = authenticationService;
		this.rehabilitationPlansService = rehabilitationPlansService;
	}

  ngOnInit() {
		this.account = localStorage.getItem("userAccount");
		console.log(this.account);
		this.authenticationService.getProfile().subscribe(
			data => {
				this.patientProfile = data;
				console.log("Patient profile" + this.patientProfile);
				console.log("Inside" + JSON.stringify(this.patientProfile.patientProfile.treatments));
				this.treatments = this.patientProfile.patientProfile.treatments;
				console.log("Treatments length" + this.treatments.length);
				this.populateRehabPlans();
		});
  }

	//Populate Rehab Plan
	populateRehabPlans() {
		for(var i=0; i<this.treatments.length; i++) {
			this.rehabilitationPlans.push(this.treatments[i].rehabilitationPlan);
		}
		console.log(this.rehabilitationPlans);
		console.log(JSON.stringify(this.rehabilitationPlans));
		this.selected = this.rehabilitationPlans[0];
		this.getExercises();
		this.getAssessmentTests();
		console.log("Selected" + JSON.stringify(this.selected));
	}

	//Show the plan details
	viewPlanDetails() {
		this.showAssessmentTests = 0;
		this.showDetails = 1;
		this.showExercises = 0;
		this.viewExerciseDetails = 0;
	}

	viewExercises() {
		this.showAssessmentTests = 0;
		this.showDetails = 0;
		this.showExercises = 1;
		this.viewExerciseDetails = 0;
	}

	viewAssessmentTests() {
		this.showAssessmentTests = 1;
		this.showDetails = 0;
		this.showExercises = 0;
		this.viewExerciseDetails = 0;
	}

	//Get selected rehab plan data
	getExercises() {
		console.log("Get data executing");
		for(var i=0; i<this.selected.exerciseOrders.length; i++) {
			this.rehabilitationPlansService.getExercise(this.selected.exerciseOrders[i]).
			subscribe(
				data => {
					console.log("Exercise: " + JSON.stringify(data));
					this.exercises.push(data);
					console.log(this.exercises);
				},
				error => {
					console.log("Error");
				});
			}
		}

		//Get the selected rehab plan assessment tests
		getAssessmentTests() {
			console.log("Get assessments tests executing");
			for(var i=0; i<this.selected.assessmentTests.length; i++) {
				this.rehabilitationPlansService.getAssessmentTest(this.selected.assessmentTests[i]).
				subscribe(
					data => {
						console.log("Assessment Test: " + JSON.stringify(data));
						//Don't show completed tests
						if(data.dateCompleted == null) {
							this.assessmentTests.push(data);
							console.log(this.assessmentTests);
						}
					},
					error => {
						console.log("Error");
					});
			}
		}

	//Route to complete assessment test component
	viewAssessmentTest(index) {
			console.log("View Assessment test pressed " + index);
			 var test = JSON.stringify(this.assessmentTests[index]);
			 var plan = JSON.stringify(this.selected);
			console.log("Putting this in local storage" + test);
			localStorage.setItem('assessmentTest', test);
			console.log("Putting this in local storage for rehab plan" + test);
			localStorage.setItem('rehabPlan', plan )
			this.router.navigate(['/patient/assessment-test']);
	}

	//Show the exercise details
	showExerciseDetails(index) {
		this.activeExercise = this.exercises[index];
		this.viewExerciseDetails = 1;
		this.showAssessmentTests = 0;
		this.showDetails = 0;
		this.showExercises = 0;
		console.log("Show exercise clicked" + index);
	}

	//Set the active rehab plan
	setActiveRehabPlan(index) {
		console.log("Set active rehab plan clicked" + index);
		this.selected = this.rehabilitationPlans[index];
		this.exercises = [];
		this.assessmentTests = [];
		this.getExercises();
		this.getAssessmentTests();
	}

}
