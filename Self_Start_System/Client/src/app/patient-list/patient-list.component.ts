import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { Router } from '@angular/router';
import { ExerciseService} from "../services/exercise.service";
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [ManagePatientProfileService, ExerciseService],
})
export class PatientListComponent implements OnInit {
	router;
	patientProfileService;
	patientList = {};
	selectedPatient;

  displayedColumns = ['givenName', 'familyName', 'email', 'phone', 'maritalStatus'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

	constructor(private exerciseService :ExerciseService, patientProfileService: ManagePatientProfileService, router: Router) {
	  this.patientProfileService = patientProfileService;
	  this.router = router;
	}

	ngOnInit() {
  	  this.getPatientList();
      this.exerciseService.getAllPatients().subscribe(
        data => {
        this.setUpDataSource(data.patientProfile);
      },
      error => console.log(error)
    );
    }

    //Get all patients
    getPatientList() {
      this.patientProfileService.getPatients()
      .subscribe(
        data => {
          console.log(data);
          this.patientList = data;
        },
        error => {
        });
    }

	//View the selected patients profile
	viewProfile(i) {
		console.log(this.patientList[i]);
		this.patientProfileService.setSelectedPatient(this.patientList[i]);
		this.router.navigate(['/dashboard/manage-patient-profile']);
	}


  setUpDataSource = patientProfile => {
    this.dataSource = new MatTableDataSource(patientProfile);
    this.dataSource.sort = this.sort;
  };

  selectRow = row => {
    console.log(row);
    this.patientProfileService.setSelectedPatient(row);
    this.router.navigate(['/physio/patients/'+ row.givenName + row.familyName]);
  };
}
