import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountListService } from '../user-account-list.service';
import { AuthenticationService } from "../authentication.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import {EditCustomRehabilitationPlanComponent} from "../edit-custom-rehabilitation-plan/edit-custom-rehabilitation-plan.component";
import {VisualizeTreatmentDialogComponent} from "../visualize-treatment-dialog/visualize-treatment-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as exporting from 'highcharts/modules/exporting.src';
import {SetFreeTimeService} from "../set-free-time.service";

import * as moment from 'moment';

@Component({
  selector: 'app-manage-patient-profile',
  templateUrl: './manage-patient-profile.component.html',
  styleUrls: ['./manage-patient-profile.component.scss'],
  providers: [UserAccountListService, AuthenticationService, ManagePatientProfileService, SetFreeTimeService ],
  encapsulation: ViewEncapsulation.None
})
export class ManagePatientProfileComponent implements OnInit {

	showPrintPage = false;
	isDataLoaded;
	isRehabPlanLoaded;
	router;
	userAccountListService;
	authenticationService;
	managePatientProfileService;
	loading = false;
	isChanged = false;
	user;
	account;
	appointments;
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
	treatments = [];
	activeExercise;
	activeAssessmentTest;
	rehabPlanHistory;
	selectedRow;
	currentUser;
  intakeFormQandA=[];
	assessmentTests = []; //Holds all assesments test - used for the patient history print form
	graphData = [];

  // Images for front back and sides
  intakeFormImages;

  // Payments
  payments = [];

  visualizeTreatmentDialogRef: MatDialogRef<VisualizeTreatmentDialogComponent>;

	Highcharts = Highcharts; // required
	chartConstructor = 'chart';
	// optional string, defaults to 'chart'
			chartOptions = {
				title: {
					text: 'Treatment Success'
				},
				subtitle: {
					text: 'Effectiveness of the treatment plan at each assessment test, on a scale of 1-10.'
				},
				xAxis: {
					title: {
						text: 'Assessment Number'
					},
					tickInterval: 1
				},
				yAxis: {
					title: {
						text: 'Rating'
					},
					tickInterval: 1
				},
				series: [{
					showInLegend: false,
					data: this.graphData
				}]
			}; // required
			//chartCallback = function (chart) { ... } // optional function, defaults to null
			updateFlag = false; // optional boolean

	constructor(router: Router,
							userAccountListService: UserAccountListService,
							authenticationService: AuthenticationService,
							managePatientProfileService: ManagePatientProfileService,
              private rehabilitationPlanService: RehabilitationPlanService,
							public setFreeTimeService: SetFreeTimeService,
							public toastr: ToastsManager,
             	vcr: ViewContainerRef,
              private dialog: MatDialog) {
		this.router = router;
		this.userAccountListService = userAccountListService;
		this.authenticationService = authenticationService;
		this.managePatientProfileService = managePatientProfileService;
		this.toastr.setRootViewContainerRef(vcr);
		this.isDataLoaded = false;
		this.loading = true;
}

  ngOnInit() {
		this.account = JSON.parse(localStorage.getItem('selectedPatient'));
		this.populatePopulatePatient(this.account._id);
		this.populateAppointments(this.account._id);
		this.populateGenders();
		this.populateProvinces();
		this.populateCountries();
		this.populatePayments(this.account._id);
		// Views the test form
		this.testViewForm(this.account._id);

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
		//this.isRehabPlanLoaded = false;
		this.showPlan = true;
		this.activeTreatmentIndex = index;
		this.activeTreatment = this.user.treatments[this.activeTreatmentIndex];
		var length = this.activeTreatment.rehabilitationPlan.length;
		//console.log("Length" + length);
		this.rehabPlanHistory = this.activeTreatment.rehabilitationPlan;
		console.log("Rehab Plan history", this.rehabPlanHistory);
		this.activeRehabPlan = this.rehabPlanHistory[length-1];
		console.log("Active rehab plan", this.activeRehabPlan);
		console.log("Active rehab plan exercises", this.activeRehabPlan.exerciseOrders);
		//this.activeRehabPlan = this.activeTreatment.rehabilitationPlan[length - 1];
		this.selectedRow = length -1;
		this.activeRehabPlanExercises = [];
		this.activeRehabPlanAssessmentTests = [];
		this.populateGraphData();
		//this.getRehabPlanExercises();
		//this.getRehabPlanAssessmentTests();
		//this.getRehabPlanPhysio();
		//this.activeRehabPlanExercises = this.activeRehabPlan.exercises;
		//console.log("These are the exercises", this.activeRehabPlanExercises);
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
		this.isRehabPlanLoaded = false;
		this.selectedRow = index;
		this.activeRehabPlan = this.activeTreatment.rehabilitationPlan[index];
		console.log("New Active Rehab Plan", this.activeRehabPlan);
		console.log("New Active Exercises", this.activeRehabPlan.exerciseOrders);
		console.log("New Active Assessment Test", this.activeRehabPlan.assessmentTests);
		//this.activeRehabPlanExercises = [];
		//this.activeRehabPlanAssessmentTests = [];
		//this.getRehabPlanExercises();
		//this.getRehabPlanAssessmentTests();
		//this.getRehabPlanPhysio();
		//this.isRehabPlanLoaded = true;
		//console.log(this.isRehabPlanLoaded);
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
			appointments: this.user.appointments,
			intakeFormAnswers: this.intakeFormQandA;
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
					this.populateAllAssessmentTests();
          //console.log("TREATMENTS",this.treatments);
					this.isDataLoaded = true;
					this.loading = false;
					//this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
					//this.age = this.age[0] + " years";
					console.log("This is the patient", this.user);
				});
		 }

		 //For getting test form
    testViewForm = patientProfileId => {
      this.setFreeTimeService.viewIntakeForm(patientProfileId)
        .subscribe(result=>{
          // The intake form Q and A
          let intakeFormQandA = [];
          let intakeFormImages = [];

          console.log("result ", result);
          for (let object of result.intakeFormQuestionsAndAnswers){
            if (object.answer.toLowerCase().includes("http")){
              intakeFormImages.push(object);
            } else {
              intakeFormQandA.push(object);
            }
          }

          console.log('intakeFormQandA', intakeFormQandA);
          console.log('intakeFormImages', intakeFormImages);
          this.intakeFormQandA = intakeFormQandA;
          this.intakeFormImages = intakeFormImages;
        }, err=>{
          console.log(err);
        });
    };

		//Populate all users assessment tests for the print form
		populateAllAssessmentTests() {
		for(var i=0; i<this.user.treatments.length; i++) {
			for var j=0; j<this.user.treatments[i].rehabilitationPlan.length; j++) {
				for var k=0; k<this.user.treatments[i].rehabilitationPlan[j].assessmentTests.length; k++) {
					this.assessmentTests.push(this.user.treatments[i].rehabilitationPlan[j].assessmentTests[k]);
				}
			}
		}
		console.log("All the users assessment tests", this.assessmentTests);
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
		    console.log('in populatePayments');
		    this.managePatientProfileService.getAllPayments(id).subscribe(
		      data=>{
		        console.log('in managePatientProfileService', data);
		        this.payments = data.payment;
		      }, err=>{
		        console.log(err);
		      }
		    );
		  }

			//Get exercsies for the selected rehab plan
			getRehabPlanExercises() {
				/*
				for(var i=0; i<this.activeRehabPlan.exercises.length; i++) {
					this.activeRehabPlanExercises
				}
				*/
				/*
				for(var i=0; i<this.activeRehabPlan.exercises.length; i++) {
					this.userAccountListService.getExercise(this.activeRehabPlan.exercises[i]).subscribe(
						data => {
							this.activeRehabPlanExercises.push(data);
							console.log(this.activeRehabPlanExercises);
						});
					}
					this.isRehabPlanLoaded = true;
					console.log("Data Loaded" + this.isRehabPlanLoaded);
					*/
				}

			//Get Assessment Test for the selected rehab plan
			getRehabPlanAssessmentTests() {
			/*
			for(var i=0; i<this.activeRehabPlan.assessmentTests.length; i++) {
				this.userAccountListService.getAssessmentTest(this.activeRehabPlan.assessmentTests[i]).subscribe(
					data => {
						this.activeRehabPlanAssessmentTests.push(data);
						console.log(this.activeRehabPlanAssessmentTests);
					});
				}
				*/
			}

			//Get the physio assoicated with the rehab plan
			getRehabPlanPhysio() {
				/*
				this.userAccountListService.getPhysio(this.activeTreatment.physiotherapist).subscribe(
					data => {
						this.physiotherapist = data;
						console.log(this.physiotherapist);
					});
					*/
			}

			//Sets the active exercise for the exercise modal
			setActiveExercise(index) {
				this.activeExercise = this.activeRehabPlan.exerciseOrders[index];
			}

			//Sets the active assessment test for the assessment test modal
			setActiveAssessmentTest(index) {
				this.activeAssessmentTest = this.activeRehabPlan.assessmentTests[index];
			}

    // newTreatment(){
    //   let rehabPlan = {
    //     dateStart: null,
    //     dateEnd: null,
    //     name: ' ',
    //     description: ' ',
    //     authorName: ' ',
    //     goal: ' ',
    //     timeFrameToComplete: ' ',
    //     exerciseOrders: [],
    //     assessmentTests: [],
    //     treatments: [],
    //   };
    //   console.log("User= "+this.user._id+" Physio= "+this.currentUser[1].physiotherapist._id);
    //   this.rehabilitationPlanService.addRehabilitationPlan(rehabPlan).subscribe( data => {
    //     console.log(data);
    //       let treatment = { // dateAssign and active fields are populated by default
    //         patientProfile: this.user._id,
    //         physiotherapist: this.currentUser[1].physiotherapist._id,
    //         rehabilitationPlan: data.rehabilitationPlan._id,
    //         recommendations: [],
    //       };
    //     localStorage.setItem('edit_rehabilitation_id',data.rehabilitationPlan._id);
    //     localStorage.setItem('new_treatment','TRUE');
    //     console.log(treatment);
    //       this.managePatientProfileService.addTreatment(treatment).subscribe( treatmentData => {
    //         console.log(treatmentData);
    //         this.router.navigate(['physio/rehabilitation-plans/edit-custom']);
    //       });
    //     }
    //   );
    // }

  newTreatment(){
      let treatment = { // dateAssign and active fields are populated by default
        patientProfile: this.user._id,
        physiotherapist: this.currentUser[1].physiotherapist._id,
        rehabilitationPlan: [],
        recommendations: [],
      };
      this.managePatientProfileService.addTreatment(treatment).subscribe( treatmentData => {
        localStorage.setItem('treatment_id',treatmentData.treatment._id);
        localStorage.setItem('new_treatment','TRUE');
        console.log(treatmentData.treatment);
        this.user.treatments.push(treatmentData.treatment._id);
        console.log(this.user);
        this.managePatientProfileService.updatePatient(this.user, this.user._id).subscribe(patientProfile =>{
          this.router.navigate(['physio/rehabilitation-plans/edit-custom']);
        });
      });
  }
			openVisualizeTreatmentDialogBox(){
        this.visualizeTreatmentDialogRef = this.dialog.open(VisualizeTreatmentDialogComponent, {
          height: '250px',
          width: '250px',
          data: {

          }
        });

        this.visualizeTreatmentDialogRef.afterClosed().subscribe(result => {
              console.log(result);
            },
            error => console.log(error)
          );
      }

		//Print a summary of the treatment details
		printTreatment() {
		this.showPrintPage = true;
	}

		//Return from the print page
		showProfile() {
		this.showPrintPage = false;
	}

	populateGraphData() {
		//Populate graph data
		var length = this.rehabPlanHistory.length;
		console.log(length);
		for(var i=0; i<this.rehabPlanHistory[length-1].assessmentTests.length; i++) {
			if(this.rehabPlanHistory[length-1].assessmentTests[i].recommendationEvaluation != null) {
				this.graphData.push(this.rehabPlanHistory[length-1].assessmentTests[i].recommendationEvaluation);
			}
		}
		// optional string, defaults to 'chart'
				this.chartOptions = {
					title: {
						text: 'Treatment Success'
					},
					subtitle: {
						text: 'Effectiveness of the treatment plan at each assessment test, on a scale of 1-10.'
					},
					xAxis: {
						title: {
							text: 'Assessment Number'
						},
						tickInterval: 1
					},
					yAxis: {
						title: {
							text: 'Rating'
						},
						tickInterval: 1
					},
					series: [{
						showInLegend: false,
						data: this.graphData
					}]
				}; // required
				console.log("Chart ", this.chartOptions);
}

}
