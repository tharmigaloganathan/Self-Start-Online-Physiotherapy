import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  private baseUrl = 'http://localhost:3700/Messages';

  getMessages() {
      return this.http.get(this.baseUrl)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  postMessage(message: Object) {
      return this.http.post(this.baseUrl, message)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
