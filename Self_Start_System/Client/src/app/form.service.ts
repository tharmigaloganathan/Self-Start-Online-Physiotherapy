import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable()
export class FormService {
  domain = environment.apiURL;

  constructor(private http: HttpClient) { }

  //======FORM ROUTES=======
  getAllForms(){
    return this.http.get(this.domain+'/forms')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getForm(_id: string){
    return this.http.get(this.domain+'/forms/'+_id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  saveForm(form){
    console.log("this is the form: ", form);
    return this.http.put(this.domain+'/forms/'+form._id, form)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  //======END OF FORM ROUTES=========

  //======QUESTION ROUTES==========
  deleteQuestion(id: string){
    return this.http.delete(this.domain+'/questions/'+id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  editQuestion(question){
    console.log("this is the question: ", question);
    return this.http.put(this.domain+'/questions/'+question._id, question)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addQuestion (question): Observable<any> {
    return this.http.post(this.domain+'/questions', question)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getAllQuestions(){
    return this.http.get(this.domain+'/questions')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  //=======END OF QUESTION ROUTES=========

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
