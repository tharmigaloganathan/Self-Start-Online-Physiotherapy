import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-edit-patient-plan-list',
  templateUrl: './edit-patient-plan-list.component.html',
  styleUrls: ['./edit-patient-plan-list.component.scss'],
  providers: [ RehabilitationPlanService, ManagePatientProfileService ]
})
export class EditPatientPlanListComponent implements OnInit {
  currentPatient;
  currentUser;
  treatments = [];
  filteredRehabPlans = [];
  allRehabPlans = [];

  constructor(private managePatientProfileService: ManagePatientProfileService,
              private rehabilitationPlanService: RehabilitationPlanService,
              private authService: AuthenticationService) {

  }

  getCurrentPatient() {
    const currentURL = window.location.pathname;
    const patientID = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    this.managePatientProfileService.getPatient(patientID).subscribe(data => {
        this.currentPatient = data;
        console.log(data);
        this.treatments = [];
        for (var i = 0; i < data.treatments.length; i++) {
          if (data.treatments[i].active) {
            this.treatments.push(data.treatments[i]);
          }
        }
        console.log(this.treatments[0].rehabilitationPlan);
      }
    );
  }

  assignCopy() {
    this.filteredRehabPlans = Object.assign([], this.allRehabPlans);
  }

  filterItem(value) {
    console.log(value);
    if (!value) { this.assignCopy(); } // when nothing has typed
    this.filteredRehabPlans = Object.assign([], this.allRehabPlans).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

  listRehabPlans() {
    this.rehabilitationPlanService.getRehabilitationPlans().subscribe(data => {
        this.allRehabPlans = [];
        for (let i = 0; i < data.rehabilitationPlan.length; i++) {
          if (!data.rehabilitationPlan[i].custom) {
            this.allRehabPlans.push(data.rehabilitationPlan[i]);
          }
        }
        console.log(this.allRehabPlans);
        this.assignCopy();
      }
    );
  }

  // store ID of patient in local storage when clicked
  addTreatment(rehabPlan) {
    rehabPlan.custom = true;
    delete rehabPlan._id;
    console.log('Rehab Plan Name:', rehabPlan);
    this.rehabilitationPlanService.addRehabilitationPlan(rehabPlan).subscribe( data => {
      let treatment = { // dateAssign and active fields are populated by default
        patientProfile: this.currentPatient._id,
        // physiotherapist: '5a80ad15734d1d0d42e9f9e6',
        physiotherapist: this.currentUser.physiotherapist,
        rehabilitationPlan: data.rehabilitationPlan._id
      };
      console.log(treatment);
      this.managePatientProfileService.addTreatment(treatment).subscribe( treatmentData => {
        console.log(treatmentData);
        this.currentPatient.treatments.push(treatmentData.treatment._id);
        console.log(this.currentPatient);
        this.managePatientProfileService.updatePatient(this.currentPatient, this.currentPatient._id).subscribe(patientData => {
          console.log(patientData);
          this.getCurrentPatient();
        });
      });
    }
    );
  }

  editTreatment(treatment) {
    console.log(treatment);
  }

  renewTreatment(treatment) {
    treatment.dateStart = Date.now;
    this.managePatientProfileService.updateTreatment(treatment, treatment._id).subscribe( data => {
      console.log(data);
      this.getCurrentPatient();
    });
  }

  closeTreatment(treatment) {
    treatment.active = false;
    this.managePatientProfileService.updateTreatment(treatment, treatment._id).subscribe( data => {
      console.log(data);
      this.getCurrentPatient();
    });
  }

  listOfExercises(rehabPlan) {

  }

  ngOnInit() {
    this.getCurrentPatient();
    this.listRehabPlans();
    this.authService.getProfile().subscribe(data => {
      this.currentUser = data;
    });
  }

}
