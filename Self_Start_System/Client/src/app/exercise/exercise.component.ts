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
  objectiveValue;
  actionStepsValue;

  allExercises;



  constructor(private exerciseService :ExerciseService) { }

  ngOnInit() {
    this.getAllExercises();
  }

  addExercise(){
    console.log(this.exerciseNameValue,this.authorNameValue,this.targetDateValue);

    var exercise = {
      exerciseNameValue: this.exerciseNameValue,
      authorNameValue: this.authorNameValue,
      locationValue: this.locationValue,
      URLValue: this.URLValue,
      frequencyValue: this.frequencyValue,
      durationValue: this.durationValue,
      targetDateValue: this.targetDateValue,
      descriptionValue: this.descriptionValue,
      objectiveValue: this.objectiveValue,
      actionStepsValue: this.actionStepsValue
    };

    this.exerciseService.addExercise(exercise).subscribe(
      data=> {},
      error => console.log(error)
    );
  }

  getAllExercises(){
    console.log("getting all exercises");
    this.exerciseService.getAllExercises().subscribe(
      data => {
        console.log(data.exercises)
      },
      error => console.log(error)
    );
  }



}
