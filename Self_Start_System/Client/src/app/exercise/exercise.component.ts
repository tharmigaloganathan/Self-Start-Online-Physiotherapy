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
      name: this.exerciseNameValue,
      authorName: this.authorNameValue,
      location: this.locationValue,
      multimediaURL: this.URLValue,
      frequency: this.frequencyValue,
      duration: this.durationValue,
      targetDate: this.targetDateValue,
      description: this.descriptionValue,
      objective: this.objectiveValue,
      actionSteps: this.actionStepsValue
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
