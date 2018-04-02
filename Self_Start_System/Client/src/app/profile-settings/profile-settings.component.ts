import { Component, OnInit } from '@angular/core';
import {EditProfileService} from "../edit-profile.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  user;
  profileType;
  isChanged;

  constructor(private editProfileService: EditProfileService) { }

  ngOnInit() {
    this.user = this.editProfileService.getProfile();
    this.profileType = this.editProfileService.getProfileType();
    if (this.editProfileService.getProfileType() =="patient"){
      this.profileType = 0;
    } else if (this.editProfileService.getProfileType() == "physio"){
      this.profileType = 1;
    }
  }

  editPatientInfo(){
    this.isChanged = true;
  }

  savePatientInfo(){

  }

  cancelEdit(){
    this.isChanged = false;
    this.user = this.editProfileService.getProfile();
  }



}
