import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { NavbarPhysioComponent } from './navbar-physio/navbar-physio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ManagePatientProfileComponent } from './manage-patient-profile/manage-patient-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PatientListComponent } from './patient-list/patient-list.component';
import { MdNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavbarPhysioComponent,
    DashboardPhysioComponent,
    NotFoundPageComponent,
    ManagePatientProfileComponent,
    PatientListComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
	MatTabsModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatDatepickerModule,
	MatButtonModule,
	MatExpansionModule,
	MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
