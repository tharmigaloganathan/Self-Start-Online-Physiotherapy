import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagePatientProfileService } from '../manage-patient-profile.service';


@Component({
  selector: 'app-patient-plan-list',
  templateUrl: './patient-plan-list.component.html',
  styleUrls: ['./patient-plan-list.component.scss'],
  providers: [ManagePatientProfileService]
})
export class PatientPlanListComponent implements OnInit {

  router;
  fullPatientList = [];
  filteredPatientList = [];

  constructor(private managePatientProfileService: ManagePatientProfileService, router: Router) {
    this.router = router;
  }

  assignCopy() {
    this.filteredPatientList = Object.assign([], this.fullPatientList);
  }
  filterItem(value) {
    console.log(value);
    if (!value) { this.assignCopy(); } // when nothing has typed
    this.filteredPatientList = Object.assign([], this.fullPatientList).filter(
      item => item.familyName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.givenName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }


  loadPatients() {
    this.managePatientProfileService.getPatients().subscribe(data => {
        this.fullPatientList = data;
        console.log(data);
        this.assignCopy();
      }
    );
  }

  // store ID of patient in local storage when clicked
  storeID(patient) {
    console.log('ID', patient._id);
    localStorage.setItem('patient_id', patient._id);
    // Try to change to auto-incrementing field after b/c Dan doesn't like this
    this.router.navigate(['physio/patient-plan-list/' + patient._id]);
  }

  numberOfTreatments(patient) {
    if (!patient.treatments) {
      return 0;
    } else {
      return patient.treatments.length;
    }
  }


  ngOnInit() {
    this.loadPatients();
  }

}
