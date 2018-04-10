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

	isDataLoaded;
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
	selected = [];
	activeExercise;
	patientProfile;
	name;
	activeTreatment;
	activeRehabPlan;
	selectedIndex;

  constructor(rehabilitationPlansService: PatientRehabilitationPlansService, router: Router, authenticationService: AuthenticationService) {
		this.router = router;
		this.authenticationService = authenticationService;
		this.rehabilitationPlansService = rehabilitationPlansService;
		this.isDataLoaded = true;
	}

  ngOnInit() {
		this.authenticationService.getUserAccount().subscribe(
			data => {
				this.account = data;
				console.log("Account" + JSON.stringify(this.account));
				this.populatePatientProfile();
		});
  }

	//Get patient profile
	populatePatientProfile() {
	this.rehabilitationPlansService.getPatientProfile(this.account.patientProfile).subscribe(
		data => {
			this.patientProfile = data;
			console.log("This is the patient", this.patientProfile);
			this.treatments = this.patientProfile.treatments;
			var treatmentsLength = this.treatments.length;
			this.selectedIndex = treatmentsLength-1;
			this.activeTreatment = this.treatments[treatmentsLength-1];
			var length = this.activeTreatment.rehabilitationPlan.length;
			this.activeRehabPlan = this.activeTreatment.rehabilitationPlan[length-1];
		});
}

	//Show the treatment and rehab plan details
	showTreatment(index) {
		console.log(index);
		this.selectedIndex = index;
		this.activeTreatment = this.treatments[index];
		var length = this.activeTreatment.rehabilitationPlan.length;
		this.activeRehabPlan = this.activeTreatment.rehabilitationPlan[length-1];
		console.log("Active Rehab Plan", this.activeRehabPlan);
}

	//Populate Rehab Plan
	populateRehabPlans() {
	/*
		for(var i=0; i<this.treatments.length; i++) {
			for(var j=0; j<this.treatments.rehabilitationPlan.length; j++) {
				var length = this.treatments.rehabilitationPlan.length;
				this.rehabilitationPlans.push(this.treatments[i].rehabilitationPlan[length -1]);
			}
		}
		*/

		//console.log(this.rehabilitationPlans);
		console.log(JSON.stringify(this.rehabilitationPlans));
		console.log("Rehab plans length " + this.rehabilitationPlans.length);
		this.selected = this.rehabilitationPlans[0];
		//this.getExercises();
		//this.getAssessmentTests();
		this.isDataLoaded = true;
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
		this.exercises = [];
		this.exercises = this.activeRehabPlan.exerciseOrders;
		console.log("Exercises" + JSON.stringify(this.exercises));
		this.showAssessmentTests = 0;
		this.showDetails = 0;
		this.showExercises = 1;
		this.viewExerciseDetails = 0;
	}

	viewAssessmentTests() {
		this.assessmentTests = [];
		this.checkAssessmentTests();
		//this.assessmentTests = this.activeRehabPlan.assessmentTests;
		console.log("Assessment Tests" + JSON.stringify(this.assessmentTests));
		this.showAssessmentTests = 1;
		this.showDetails = 0;
		this.showExercises = 0;
		this.viewExerciseDetails = 0;
	}

	//Only include assesment test that have not been Completed
	checkAssessmentTests() {
		for(var i=0; i<this.activeRehabPlan.assessmentTests.length; i++) {
			//console.log("Time", this.activeRehabPlan.assessmentTests[i].openDate.parse());
			//console.log("Now", Date.now());
			if(this.activeRehabPlan.assessmentTests[i].dateCompleted == null /* && this.activeRehabPlan.assessmentTests[i].openDate <= Date.now() */) {
				this.assessmentTests.push(this.activeRehabPlan.assessmentTests[i]);
			}
		}
}

	//Get selected rehab plan data
	getExercises() {
		/*
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
		*/
		}

		//Get the selected rehab plan assessment tests
		getAssessmentTests() {
			/*
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
			*/
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
