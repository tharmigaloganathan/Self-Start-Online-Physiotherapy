import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { NavbarPhysioComponent } from './navbar-physio/navbar-physio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';

import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ManageFormComponent } from './manage-form/manage-form.component';
import { ManagePatientProfileComponent } from './manage-patient-profile/manage-patient-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PatientListComponent } from './patient-list/patient-list.component';

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

import { SidebarPhysioComponent } from './sidebar-physio/sidebar-physio.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarGeneralComponent } from './navbar-general/navbar-general.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';
import { NavbarPatientComponent } from './navbar-patient/navbar-patient.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { CreateUserAccountComponent } from './create-user-account/create-user-account.component';
import { UserAccountListComponent } from './user-account-list/user-account-list.component';
import { AdminManageUserAccountsComponent } from './admin-manage-user-accounts/admin-manage-user-accounts.component';
import { ImageUploadTestComponent } from './image-upload-test/image-upload-test.component';

import { DndModule } from 'ng2-dnd';
import { FormsComponent } from './forms/forms.component';
import { CreateFormComponent } from './create-form/create-form.component';

// Image uploading
import { FileSelectDirective } from 'ng2-file-upload';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { EditQuestionDialogComponent } from './edit-question-dialog/edit-question-dialog.component';

// Calendar
import { FullCalendarModule } from 'ng-fullcalendar';
import { CreateNewAccountComponent } from './create-new-account/create-new-account.component';
import { PatientMessagesComponent } from './patient-messages/patient-messages.component';
import { MessagesService} from "./messages.service";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    NavbarPhysioComponent,
    DashboardPhysioComponent,
    NotFoundPageComponent,
    ManageFormComponent,
    ManagePatientProfileComponent,
    PatientListComponent,
    RehabilitationPlanComponent,
    NewRehabilitationPlanComponent,
    EditRehabilitationPlanComponent,
    ExerciseComponent,
    SidebarPhysioComponent,
    HomePageComponent,
    NavbarGeneralComponent,
    DashboardAdminComponent,
    DashboardPatientComponent,
    NavbarPatientComponent,
    NavbarAdminComponent,
    CreateUserAccountComponent,
    UserAccountListComponent,
    FormsComponent,
    CreateFormComponent,
    ImageUploadTestComponent,
    FileSelectDirective,
    BookAppointmentComponent,
    EditQuestionDialogComponent,
		AdminManageUserAccountsComponent,
		CreateNewAccountComponent,
		PatientMessagesComponent
  ],
  imports: [
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    FullCalendarModule,
    DndModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
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
    MatSortModule,
    DndModule.forRoot(),
	  MatStepperModule,
    MatSnackBarModule,
  ],
  providers: [ExerciseService,
  FormService],
  bootstrap: [AppComponent],
  entryComponents: [EditQuestionDialogComponent]
})
export class AppModule { }
