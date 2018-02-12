import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { NavbarPhysioComponent } from './navbar-physio/navbar-physio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { IntroductionFormComponent } from './introduction-form/introduction-form.component';

import { RehabilitationPlanComponent } from './rehabilitation-plan/rehabilitation-plan.component';
import { NewRehabilitationPlanComponent } from './new-rehabilitation-plan/new-rehabilitation-plan.component';
import { HttpModule } from '@angular/http';
import { EditRehabilitationPlanComponent } from './edit-rehabilitation-plan/edit-rehabilitation-plan.component';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from "@angular/material";
import { MatIconModule} from "@angular/material";
import { ExerciseComponent } from './exercise/exercise.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExerciseService} from "./services/exercise.service";
import { FormService} from "./form.service";


import { HttpClientModule} from '@angular/common/http';



import { PhysioManagePatientsComponent } from './physio-manage-patients/physio-manage-patients.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarPhysioComponent,
    DashboardPhysioComponent,
    NotFoundPageComponent,
    IntroductionFormComponent,
    RehabilitationPlanComponent,
    NewRehabilitationPlanComponent,
    EditRehabilitationPlanComponent,
    ExerciseComponent,
    PhysioManagePatientsComponent
  ],
  imports: [
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [ExerciseService,
  FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
