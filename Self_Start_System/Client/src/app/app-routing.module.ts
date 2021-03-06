import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ManageFormComponent} from "./manage-form/manage-form.component";
import { ManagePatientProfileComponent } from './manage-patient-profile/manage-patient-profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ExerciseComponent} from "./exercise/exercise.component";
import { RehabilitationPlanComponent} from "./rehabilitation-plan/rehabilitation-plan.component";
import { EditRehabilitationPlanComponent} from "./edit-rehabilitation-plan/edit-rehabilitation-plan.component";
import { NewRehabilitationPlanComponent} from "./new-rehabilitation-plan/new-rehabilitation-plan.component";
import { EditCustomRehabilitationPlanComponent } from "./edit-custom-rehabilitation-plan/edit-custom-rehabilitation-plan.component";


import { CreateUserAccountComponent } from "./create-user-account/create-user-account.component";
import { UserAccountListComponent } from "./user-account-list/user-account-list.component";
import { FormsComponent } from "./forms/forms.component";
import { CreateFormComponent} from "./create-form/create-form.component";


import { HomePageComponent} from "./home-page/home-page.component";
import { HomePageAboutComponent} from "./home-page-about/home-page-about.component";
import { HomePageBelieveComponent} from "./home-page-believe/home-page-believe.component";
import { HomePageServicesComponent} from "./home-page-services/home-page-services.component";
import { HomePageHowItWorksComponent} from "./home-page-how-it-works/home-page-how-it-works.component";
import { DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";
import { DashboardPatientComponent} from "./dashboard-patient/dashboard-patient.component";
import { ImageUploadTestComponent } from "./image-upload-test/image-upload-test.component";
import { BookAppointmentComponent } from "./book-appointment/book-appointment.component";
import { AdminManageUserAccountsComponent } from "./admin-manage-user-accounts/admin-manage-user-accounts.component";
import {LoginComponent} from "./login/login.component";
import { CreateNewAccountComponent } from "./create-new-account/create-new-account.component";

import { CreateNewEventComponent } from "./set-free-time/create-new-event/create-new-event.component";
import { SetFreeTimeComponent } from "./set-free-time/set-free-time.component";

import { PatientMessagesComponent } from './patient-messages/patient-messages.component';
import { PhysiotherapistMessagesComponent } from './physiotherapist-messages/physiotherapist-messages.component';
import {PatientPlanListComponent} from './patient-plan-list/patient-plan-list.component';
import {EditPatientPlanListComponent} from './edit-patient-plan-list/edit-patient-plan-list.component';

import { PatientCompleteAssessmentTestComponent } from "./patient-complete-assessment-test/patient-complete-assessment-test.component";
import { PatientRehabilitationPlansComponent } from "./patient-rehabilitation-plans/patient-rehabilitation-plans.component";
import { PhysioPatientListComponent } from './physio-patient-list/physio-patient-list.component';
import {AdminLocationsComponent} from './admin-locations/admin-locations.component';
import { BookAppointmentFormComponent } from "./book-appointment/book-appointment-form/book-appointment-form.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotAuthGuard} from "./guards/not-auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {PatientGuard} from "./guards/patient.guard";
import {PhysioGuard} from "./guards/physio.guard";
import {ProfileSettingsComponent} from "./profile-settings/profile-settings.component";
import { PatientResourcesComponent } from "./patient-resources/patient-resources.component";
// Our Array of Angular 2 Routes
const appRoutes: Routes = [

  {
    path: 'home',
    component: HomePageComponent, // what a general user sees
    canActivate:[NotAuthGuard]
  },
  {
    path: 'about',
    component: HomePageAboutComponent, // what a general user sees
    canActivate:[NotAuthGuard]
  },
  {
    path: 'believe',
    component: HomePageBelieveComponent, // what a general user sees
    canActivate:[NotAuthGuard]
  },
  {
    path: 'services',
    component: HomePageServicesComponent, // what a general user sees
    canActivate:[NotAuthGuard]
  },
  {
    path: 'how-it-works',
    component: HomePageHowItWorksComponent, // what a general user sees
    canActivate:[NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },

  {
    path: 'register',
    component: CreateNewAccountComponent,
    canActivate: [NotAuthGuard]
  },

  {
    path: 'new-account',
    component: CreateNewAccountComponent,
    canActivate: [NotAuthGuard]
  },

  {
    path: 'image-test',
    component: ImageUploadTestComponent
  },

  {
    path: 'create-account',
    component: CreateUserAccountComponent
  },

  {
    path: 'settings',
    component: ProfileSettingsComponent,
    canActivate: [AuthGuard]
  },

  //end of routes that don't need login
  {
    path: 'admin/home',
    component: DashboardAdminComponent, // Home page for a logged in admin
    canActivate: [AdminGuard]
  },
  {
	  path: 'admin/user-accounts',
	  component: UserAccountListComponent,
    canActivate: [AdminGuard]// The Admin/IntroductionForm Route
  },
	{
		path: 'admin/user-accounts/manage',
		component: AdminManageUserAccountsComponent,// The Admin/UserAccountsList Route
    canActivate: [AdminGuard]

  },

  {
    path: 'admin/forms',
    component: FormsComponent, // The Form Route
    canActivate: [AdminGuard]

  },
  {
    path: 'admin/edit-form',
    component: ManageFormComponent,
    canActivate: [AdminGuard] //The Edit/Manage Form Route
  },
  {
    path: 'admin/create-form',
    component: CreateFormComponent, //The Create Form Route
    canActivate: [AdminGuard]

  },
  {
    path: 'admin/locations',
    component: AdminLocationsComponent, //The AdminLocationsComponent Route
    canActivate: [AdminGuard]

  },
  {
    path: 'admin',
    redirectTo: '/admin/home',

  }, //the last admin route

  //end of all admin routes

  {
    path: 'patient/home',
    component: DashboardPatientComponent,
    canActivate: [PatientGuard]

  },

  {
    path: 'patient/messages',
    component: PatientMessagesComponent,
    canActivate: [PatientGuard]
  },
  {
    path: 'patient/book-appointment',
    component: BookAppointmentComponent,
    canActivate: [PatientGuard]
  },
	{
		path: 'patient/assessment-test',
		component: PatientCompleteAssessmentTestComponent,
    canActivate: [PatientGuard]
	},
	{
		path: 'patient/rehabilitation-plans',
		component: PatientRehabilitationPlansComponent,
    canActivate: [PatientGuard]
	},
  {
    path: 'patient/book-appointment/form',
    component: BookAppointmentFormComponent,
    canActivate: [PatientGuard]
  },
  {
    path: 'patient/resources',
    component: PatientResourcesComponent,
    canActivate: [PatientGuard]
  },
  {
    path: 'patient',
    redirectTo: '/patient/home'
  }, //the last patient route
  //end of all patient routes

  // Home page  for a logged in physiotherapist Route
  {
    path: 'physio/home',
    component: DashboardPhysioComponent,
    canActivate: [PhysioGuard]
    // Home page  for a logged in physiotherapist Route
  },


  {
    path: 'physio/patients/:name',
    component: ManagePatientProfileComponent,
    canActivate: [PhysioGuard]

  },

  {
    path: 'physio/patients',
    component: PhysioPatientListComponent,
    canActivate: [PhysioGuard]

  },

  {
    path : 'physio/exercises',
    component: ExerciseComponent,
    canActivate: [PhysioGuard] // The Exercise route
  },
  {

    path: 'physio/rehabilitation-plans',
    component: RehabilitationPlanComponent,
    canActivate: [PhysioGuard]
//
  },
  {
    path: 'physio/rehabilitation-plans/new',
    component: NewRehabilitationPlanComponent,
    canActivate: [PhysioGuard]
//
  },
  {
    path: 'physio/rehabilitation-plans/edit-custom',
    component: EditCustomRehabilitationPlanComponent,
    canActivate: [PhysioGuard]
//
  },
  {
    path: 'physio/rehabilitation-plans/:name',
    component: EditRehabilitationPlanComponent,
    canActivate: [PhysioGuard]
//
  },
  {
    path: 'physio/set-free-time',
    component: SetFreeTimeComponent,
    canActivate: [PhysioGuard]
//
  },
  {
    path: 'physio/set-free-time/create-new-free-time',
    component: CreateNewEventComponent,
    canActivate: [PhysioGuard]
//
  },

  {
    path: 'physio/patient-plan-list',
    component: PatientPlanListComponent,
    canActivate: [PhysioGuard]
//
  },
  {
    path: 'physio/patient-plan-list/:id', // This ID field will be an auto-incremented ID
    component: EditPatientPlanListComponent,
    canActivate: [PhysioGuard]

},
    {
        path: 'physio/messages',
        component: PhysiotherapistMessagesComponent
    },
    {
        path: 'physio/rehabilitation-plans/:name',
        component: EditRehabilitationPlanComponent //
    },
    {
        path: 'physio',
        redirectTo: '/physio/home'
    }, //the last physio route
    {
        path: '**',
        redirectTo: '/home'
    }// The "Catch-All" Route

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }
