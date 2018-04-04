import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  private baseUrl = 'http://localhost:3700/Messages/';
  private basicURL = 'http://localhost:3700/';

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

  putMessage(id:String, message: Object){
      return this.http.put(this.baseUrl+id, message)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAppointments(physioID){
    return this.http.get(this.basicURL+"Appointments/by-physio/"+physioID)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
