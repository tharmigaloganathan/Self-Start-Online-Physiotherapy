import { Component, OnInit } from '@angular/core';
import { ExerciseService} from "../services/exercise.service";
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort } from '@angular/material';



@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  exerciseNameValue;
  authorNameValue;
  locationValue;
  URLValue;
  frequencyValue;
  durationValue;
  targetDateValue;
  descriptionValue;
  objectivesValue;
  actionStepsValue;
  openEditModal;
  editEnabled = false;
  allExercises: any[];
  currentExercise: {
    name: null,
    description: null,
    objectives: null,
    authorName: null,
    actionSteps: null,
    location: null,
    frequency: null,
    duration: null,
    targetDate: null,
    multimediaURL: null,
    _id: null
  };
  dataSource;
  filteredExercises;
  displayedColumns = ['name', 'authorName', 'description'];


  constructor(private exerciseService :ExerciseService) {
    this.openEditModal=false;
  }

  assignCopy(){
      this.filteredExercises = Object.assign([], this.allExercises);
  }

  filterItem(value: string) {
      value = value.trim();
      value = value.toLowerCase();
      this.dataSource.filter = value;
  }

  ngOnInit() {
    this.getAllExercises();
  }

  registerExercise(){
    console.log(this.exerciseNameValue);

    var exercise = {
      name: this.exerciseNameValue,
      description: this.descriptionValue,
      objectives: this.objectivesValue,
      authorName: this.authorNameValue,
      actionSteps: this.actionStepsValue,
      location: this.locationValue,
      frequency: this.frequencyValue,
      duration: this.durationValue,
      targetDate: this.targetDateValue,
      multimediaURL: this.URLValue,
    };

    this.exerciseService.registerExercise(exercise).subscribe(
      res=> {console.log("response received: ", res), this.getAllExercises()},
      error => {console.log(error)}
    );
  }

  editExercise(){
    if (this.currentExercise) {
      console.log("making a new exercise object based on: ", this.currentExercise);
      var exercise = {
        name: this.currentExercise.name,
        description: this.currentExercise.description,
        objectives: this.currentExercise.objectives,
        authorName: this.currentExercise.authorName,
        actionSteps: this.currentExercise.actionSteps,
        location: this.currentExercise.location,
        frequency: this.currentExercise.frequency,
        duration: this.currentExercise.duration,
        targetDate: this.currentExercise.targetDate,
        multimediaURL: this.currentExercise.multimediaURL,
      }
    }

    this.exerciseService.editExercise(this.currentExercise._id, exercise).subscribe(
      res=> {console.log("response received: ", res), this.getAllExercises()},
      error => {console.log(error)}
    );

    this.editEnabled = false;
  }

  enableEdit(){
    this.editEnabled = true;
  }

  cancelEdit(){
    this.editEnabled = false;
    this.getOneExercise(this.currentExercise._id);
  }

  getAllExercises(){
    console.log("getting all exercises");
    this.exerciseService.getAllExercises().subscribe(
      data => {
        console.log("all exercises retrieved! ",data.exercise);
        console.log(data);
        this.allExercises = [];
        //only display exercises with standard flag set to true!
        for(var i = 0; i < data.exercise.length; i++) {
            if(data.exercise[i].standard == true) {
                this.allExercises.push(data.exercise[i]);
            }
        }
        this.assignCopy();
        this.dataSource = new MatTableDataSource(this.filteredExercises);
      },
      error => console.log(error)
    );
  }

  getOneExercise(id){
    console.log("getting one exercise");
    this.exerciseService.getOneExercise(id).subscribe(
      data => {
        console.log("single exercise retrieved! ", data.exercise);
        this.currentExercise = data.exercise;
        console.log ("current exercise selected is ", this.currentExercise.name);
      }
    )
    this.openEditModal=true;
  }

  closeEditModal(){
    this.openEditModal=false;
  }

  deleteExercise(){
    if (this.currentExercise){
      this.exerciseService.deleteExercise(this.currentExercise._id).subscribe(
        res=> {console.log("response received: ", res), this.getAllExercises()},
        error => {console.log(error)}
      );
    }
  }
}
