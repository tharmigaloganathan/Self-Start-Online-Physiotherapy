import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ExerciseService} from "../services/exercise.service";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-physio-manage-patients',
  templateUrl: './physio-manage-patients.component.html',
  styleUrls: ['./physio-manage-patients.component.scss']
})
export class PhysioManagePatientsComponent implements OnInit {

  displayedColumns = ['givenName', 'familyName', 'email', 'phone', 'maritalStatus'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private exerciseService :ExerciseService) { }

  setUpDataSource = patientProfile => {
    this.dataSource = new MatTableDataSource(patientProfile);
    this.dataSource.sort = this.sort;
  };

  selectRow = row => {
    console.log(row._id);
  };

  ngOnInit() {
    this.exerciseService.getAllPatients().subscribe(
      data => {
        this.setUpDataSource(data.patientProfile);
      },
      error => console.log(error)
    );
  }
}
