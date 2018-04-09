import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { UserAccountListService } from '../user-account-list.service';

@Component({
  selector: 'app-physiotherapist-messages',
  templateUrl: './physiotherapist-messages.component.html',
  styleUrls: ['./physiotherapist-messages.component.scss'],
  providers: [ AuthenticationService, MessagesService, UserAccountListService, ManagePatientProfileService ]
})
export class PhysiotherapistMessagesComponent implements OnInit {
    selectedIndex;
    filteredPatients: any[] = [];
    activePatient: any;
    user;
    profileSubscription;
    treatments = [];
    appointments = [];
    patients: any[] = [];
    patientList: Array<{
      patientID: string,
      patientGivenName: string,
      patientSurname: string,
      messages: string[]
    }> = [];
    patientsWithMessages: any[] = [];

  constructor(private messagesService: MessagesService,
      private authService: AuthenticationService,
      private router: Router,
      private userAccountListService: UserAccountListService,
      private managePatientProfileService: ManagePatientProfileService)
       { this.authService = authService;}

  ngOnInit() {
      this.profileSubscription = this.authService.profileOb$.subscribe((profile) => {
        this.user = profile; console.log("subscription to auth service set profile returned: ", this.user);
        // this.getData();
        this.getTreatments();
        });
  }

  assignCopy(){
   this.filteredPatients = Object.assign([], this.patients);
    }
    filterItem(value){
       if(!value) this.assignCopy(); //when nothing has typed
       this.filteredPatients = Object.assign([], this.patients).filter(
          item => item.givenName.toLowerCase().indexOf(value.toLowerCase()) > -1
       )
    }

  getData() {
      this.selectedIndex = localStorage.getItem("messageSelected"); //grab selected patient from localStorage
      this.patients = JSON.parse(localStorage.getItem("messages"));
      this.activePatient = this.patients[this.selectedIndex];
  }

  sendNewMessage(newMessage: String) {
      let myMessage = {
          patientID: this.activePatient._id,
          physioID: this.user._id,
          message: newMessage,
          seenByPhysio: true,
          seenByPatient: false,
          sender: this.user._id
      }
      this.activePatient.messages.push(myMessage);
      this.messagesService.postMessage(myMessage).subscribe(data =>
      {
          console.log(data);
      });
  }

  openMessages(index) {
      this.selectedIndex = index;
      this.activePatient = this.filteredPatients[index];
      console.log(this.activePatient);
      console.log(this.selectedIndex);
  }

  getTreatments() {
      //get physiotherapist ID
      console.log(this.user._id);
      this.managePatientProfileService.getTreatments().subscribe(res => {
          console.log("TREATMENTS", res);
          this.treatments = [];
          for(var i = 0 ; i < res.treatment.length; i++) {
              if(res.treatment[i].physiotherapist == this.user._id)
                  this.treatments.push(res.treatment[i]);
          }
          console.log(this.treatments);
          this.getPatients();
      });
  }

  getPatients() {
      let requestCounter = 0;
      this.patients = [];
      for(var i = 0; i < this.treatments.length ; i++){
          this.userAccountListService.getPatientProfile(this.treatments[i].patientProfile).subscribe(
        data => {
              data.messages = [];
              this.patients.push(data);
              requestCounter++;
              if(requestCounter == (this.treatments.length - 1)) {
                  console.log(this.patients);
                  this.getMessages();
              }
        });
      }
  }

  formatDate(date) {
      var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  getMessages() {
      this.messagesService.getMessages().subscribe(data =>
          {
              //LOOPS THROUGH ALL MESSAGES AND ASSIGNS ANY MESSAGES TO THE CORRECT PATIENT
              let allMessages = data.message;
              console.log(this.patients[10]);
              for(var i = 0; i < allMessages.length; i++) {
                  console.log(allMessages[i].message);
                  for(var j = 0; j < this.patients.length; j++){
                      if(allMessages[i].physioID == this.user._id && allMessages[i].patientID == this.patients[j]._id){
                          allMessages[i].time = this.formatDate(new Date(allMessages[i].time));
                          this.patients[j].messages.push(allMessages[i]);
                      }
                  }
              }
              for(var i = 0; i< this.patients.length; i ++) {
                  if(this.patients[i].messages.length > 0)
                      this.patientsWithMessages.push(this.patients[i]);
              }
              // this.findNumberOfMessagesUnread();
              console.log(this.patientsWithMessages);
              console.log("FINAL PATIENTS",this.patients);
              this.assignCopy();
          }
      );
  }


}
