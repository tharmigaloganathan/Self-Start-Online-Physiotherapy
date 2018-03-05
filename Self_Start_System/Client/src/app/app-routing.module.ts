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
import { CreateUserAccountComponent } from "./create-user-account/create-user-account.component.ts";
import { UserAccountListComponent } from "./user-account-list/user-account-list.component.ts";
import { AdminManageUserAccountsComponent } from "./admin-manage-user-accounts/admin-manage-user-accounts.component.ts";

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent // The Default Route, TEMPORARY
  },
  {
    path: 'physio',
    component: DashboardPhysioComponent, // The Dashboard Route
  },
  {
    path : 'exercise',
    component: ExerciseComponent // The Exercise route
  },
  {
    path: 'rehabilitation-plan',
    component: RehabilitationPlanComponent // The Dashboard Route
  },
  {
    path: 'new-rehabilitation-plan',
    component: NewRehabilitationPlanComponent // The Dashboard Route
  },
  {
    path: 'edit-rehabilitation-plan',
    component: EditRehabilitationPlanComponent // The Dashboard Route
  },
  {
    path: 'admin/introform',
    component: IntroductionFormComponent // The Admin/IntroductionForm Route
  },
  {
		path: 'admin/user-accounts',
		component: UserAccountListComponent // The Admin/UserAccountsList Route
  },
	{
		path: 'admin/user-accounts/manage',
		component: AdminManageUserAccountsComponent// The Admin/UserAccountsList Route
	},
  {
    path: 'dashboard/manage-patient-profile',
    component: ManagePatientProfileComponent
  },
  {
  	path: 'dashboard/patients',
  	component: PatientListComponent
  },
  {
	  path: 'create-account',
	  component: CreateUserAccountComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent // The "Catch-All" Route
  } // The "Catch-All" Route

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
