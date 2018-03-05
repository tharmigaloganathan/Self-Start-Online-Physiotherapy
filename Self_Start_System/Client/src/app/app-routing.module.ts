import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { IntroductionFormComponent} from "./introduction-form/introduction-form.component";
import { ManagePatientProfileComponent } from './manage-patient-profile/manage-patient-profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ExerciseComponent} from "./exercise/exercise.component";
import { RehabilitationPlanComponent} from "./rehabilitation-plan/rehabilitation-plan.component";
import { EditRehabilitationPlanComponent} from "./edit-rehabilitation-plan/edit-rehabilitation-plan.component";
import { NewRehabilitationPlanComponent} from "./new-rehabilitation-plan/new-rehabilitation-plan.component";

import { HomePageComponent} from "./home-page/home-page.component";
import { DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";
import { DashboardPatientComponent} from "./dashboard-patient/dashboard-patient.component";
import { CreateUserAccountComponent } from "./create-user-account/create-user-account.component";
import { UserAccountListComponent } from "./user-account-list/user-account-list.component";
import { ImageUploadTestComponent } from "./image-upload-test/image-upload-test.component";


// Our Array of Angular 2 Routes
const appRoutes: Routes = [

  {
    path: 'home',
    component: HomePageComponent // what a general user sees
  },

  {
    path: 'admin/home',
    component: DashboardAdminComponent // Home page for a logged in admin
  },
  {
    path: 'admin/introform',
    component: IntroductionFormComponent // The Admin/IntroductionForm Route
  },
   {
	  path: 'admin/user-accounts',
	  component: UserAccountListComponent // The Admin/IntroductionForm Route
  },
  
  {
    path: 'admin',
    redirectTo: '/admin/home'
  }, //the last admin route

  {
    path: 'patient/home',
    component: DashboardPatientComponent
  },

  {
    path: 'patient',
    redirectTo: '/patient/home'
  }, //the last patient route

  {
    path: 'physio/home',
    component: DashboardPhysioComponent, // Home page  for a logged in physiotherapist Route
  },

  {
    path: 'physio/patients',
    component: PatientListComponent
  },

  {

    path: 'physio/patients/:name',
    component: UserAccountListComponent
  },
  
  {
    path: 'dashboard/manage-patient-profile',
    component: ManagePatientProfileComponent
  },

  {
    path : 'physio/exercises',
    component: ExerciseComponent // The Exercise route
  },
  {

    path: 'physio/rehabilitation-plans',
    component: RehabilitationPlanComponent //
  },
  {
    path: 'physio/rehabilitation-plans/new',
    component: NewRehabilitationPlanComponent //
  },
  {
    path: 'physio/rehabilitation-plans/:name',
    component: EditRehabilitationPlanComponent //
  },

	  path: 'create-account',
	  component: CreateUserAccountComponent
  },
  {
    path: 'image-test',
    component: ImageUploadTestComponent
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
