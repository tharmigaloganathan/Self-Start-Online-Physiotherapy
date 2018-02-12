import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class FormService {
  domain = environment.apiURL;

  constructor(private http: HttpClient) { }

  addQuestion (question): Observable<Response> {
    return this.http.post(this.domain+'/questions', question)
  }

}
