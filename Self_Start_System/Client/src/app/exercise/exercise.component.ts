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

  allExercises;



  constructor(private exerciseService :ExerciseService) { }

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
  }

  getAllExercises(){
    console.log("getting all exercises");
    this.exerciseService.getAllExercises().subscribe(
      data => {
        console.log(data)
      },
      error => console.log(error)
    );
  }



}
