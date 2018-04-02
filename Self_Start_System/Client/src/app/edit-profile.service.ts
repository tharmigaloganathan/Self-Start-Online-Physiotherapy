import { Injectable } from '@angular/core';

@Injectable()
export class EditProfileService {

  profile;
  profileType;

  constructor() { }

  passProfile(profile, type){
    this.profile = profile;
    this.profileType = type;
  }

  getProfile(){
    return this.profile;
  }

  getProfileType(){
    return this.profileType;
  }

}
