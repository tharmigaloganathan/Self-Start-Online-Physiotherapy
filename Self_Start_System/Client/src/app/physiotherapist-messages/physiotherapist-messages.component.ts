import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-physiotherapist-messages',
  templateUrl: './physiotherapist-messages.component.html',
  styleUrls: ['./physiotherapist-messages.component.scss'],
  providers: [ MessagesService ]
})
export class PhysiotherapistMessagesComponent implements OnInit {
    selectedIndex;
    patients;
    activePatient: any;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
      this.getData();
  }

  getData() {
      this.selectedIndex = localStorage.getItem("messageSelected");
      this.patients = JSON.parse(localStorage.getItem("messages"));
      this.activePatient = this.patients[this.selectedIndex];
  }

  sendNewMessage(newMessage: String) {
      let myMessage = {
          patientID: this.activePatient._id,
          physioID: this.activePatient.messages[0].physioID,
          message: newMessage,
          seenByPhysio: true,
          seenByPatient: false,
          sender: this.activePatient.messages[0].physioID
      }
      this.messagesService.postMessage(myMessage).subscribe(data =>
      {
          console.log(data);
      });
  }

  openMessages(index) {
      this.selectedIndex = index;
      this.activePatient = this.patients[index];
      console.log(this.activePatient);
      console.log(this.selectedIndex);
  }


}
