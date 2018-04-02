import { Component, OnInit, Directive, ViewContainerRef,ComponentFactoryResolver, Injectable, ReflectiveInjector, Inject } from '@angular/core';
import {NavbarPatientComponent} from "./navbar-patient/navbar-patient.component";
import {NavbarPhysioComponent} from "./navbar-physio/navbar-physio.component";

@Injectable()
export class EditProfileService {

  profile;
  profileType;
  rootViewContainer;

  constructor(public factoryResolver : ComponentFactoryResolver) { }



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
