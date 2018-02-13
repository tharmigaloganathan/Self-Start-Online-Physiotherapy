import { Component, OnInit } from '@angular/core';
import { ExerciseService} from "../services/exercise.service";
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';




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



  allExercises: any[];
  currentExercise: null;





  constructor(private exerciseService :ExerciseService) {
    this.openEditModal=false;
  }

  ngOnInit() {
    this.getAllExercises();
  }

  addExercise(){
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

    this.exerciseService.addExercise(exercise).subscribe(
      res=> {console.log("response received: ", res)},
      error => {console.log(error)}
    );
    window.location.reload();
  }

  getAllExercises(){
    console.log("getting all exercises");
    this.exerciseService.getAllExercises().subscribe(
      data => {
        console.log("all exercises retrieved! ",data.exercises);
        this.allExercises = data.exercises;
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
        this.openEditModal=true;

      }
    )
  }






}
