import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { PhysioManagePatientsComponent } from "./physio-manage-patients/physio-manage-patients.component";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ExerciseComponent} from "./exercise/exercise.component";

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
    path: 'physio-manage-patients',
    component: PhysioManagePatientsComponent // The Dashboard Route
  },
  {
    path : 'exercise',
    component: ExerciseComponent // The Exercise route
  },
  {
    path: '**',
    component: NotFoundPageComponent
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
