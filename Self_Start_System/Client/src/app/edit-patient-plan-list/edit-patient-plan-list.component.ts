import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';


@Component({
  selector: 'app-edit-patient-plan-list',
  templateUrl: './edit-patient-plan-list.component.html',
  styleUrls: ['./edit-patient-plan-list.component.scss'],
  providers: [ RehabilitationPlanService, ManagePatientProfileService ]
})
export class EditPatientPlanListComponent implements OnInit {
  currentPatient;
  treatments = [];
  filteredRehabPlans = [];
  allRehabPlans = [];

  constructor(private managePatientProfileService: ManagePatientProfileService,
              private rehabilitationPlanService: RehabilitationPlanService) {

  }

  getCurrentPatient() {
    const currentURL = window.location.pathname;
    const patientID = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    this.managePatientProfileService.getPatient(patientID).subscribe(data => {
        this.currentPatient = data;
        this.treatments = data.treatments;
        console.log(data);
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
        this.allRehabPlans = data.rehabilitationPlan;
        console.log(data);
        this.assignCopy();
      }
    );
  }

  // store ID of patient in local storage when clicked
  addTreatment(rehabPlan) {
    console.log('Rehab Plan Name:', rehabPlan.name);

  }

  editTreatment(treatment) {

  }

  listOfExercises(rehabPlan) {

  }

  ngOnInit() {
    this.getCurrentPatient();
    this.listRehabPlans();
  }

}
