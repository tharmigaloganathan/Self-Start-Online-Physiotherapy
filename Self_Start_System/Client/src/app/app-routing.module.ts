import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RehabilitationPlanComponent } from './rehabilitation-plan/rehabilitation-plan.component';
import { NewRehabilitationPlanComponent } from './new-rehabilitation-plan/new-rehabilitation-plan.component';
import { EditRehabilitationPlanComponent } from './edit-rehabilitation-plan/edit-rehabilitation-plan.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent // The Default Route, TEMPORARY
  },
  {
    path: 'dashboard',
    component: DashboardPhysioComponent // The Dashboard Route
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
    path: '**',
    component: NotFoundPageComponent // The "Catch-All" Route
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
