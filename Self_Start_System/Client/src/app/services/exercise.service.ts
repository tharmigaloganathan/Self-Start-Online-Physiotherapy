import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class ExerciseService {
  domain = 'http://localhost:3700';

  constructor(private http: HttpClient) { }

  addExercise (exercise) : Observable<{}> {
    console.log("within exercise service", exercise);
    return this.http.post(this.domain+'/exercises', exercise)
      .pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  getAllExercises(){
    return this.http.get(this.domain+'/exercises')
      .pipe(
      retry(3),
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
