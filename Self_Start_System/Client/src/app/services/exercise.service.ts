import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class ExerciseService {
  domain = environment.apiURL;

  constructor(private http: HttpClient) { }

  // Exercise api calls

  addExercise (exercise) : Observable<Response> {
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

  getOneExercise(id){
    return this.http.get(this.domain+'/exercises/' + id)
      .pipe(
        retry (3),
        catchError(this.handleError)
      );
  }

  // End of exercise api calls

  // Patient api calls

  getAllPatients(){
    return this.http.get(this.domain+'/PatientProfiles')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }



  // End of patient api calls

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
