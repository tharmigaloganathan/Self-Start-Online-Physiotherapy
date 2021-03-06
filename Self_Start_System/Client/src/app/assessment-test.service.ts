import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AssessmentTestService {

  domain = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAllAssessmentTests(){
    return this.http.get(this.domain+'/assessmentTests')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addAssessmentTest(assessmentTest){
    return this.http.post(this.domain+'/assessmentTests', assessmentTest)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  editAssessmentTest(assessmentTest){
    return this.http.put(this.domain+'/assessmentTests/'+assessmentTest._id, assessmentTest)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteAssessmentTest(assessmentTest){
    return this.http.delete(this.domain+'/assessmentTests/'+assessmentTest._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getTestResultsByAssessmentTestID(test){
    return this.http.get(this.domain+'/TestResults/assessmentTest/' + test._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  //=========================================================================
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
