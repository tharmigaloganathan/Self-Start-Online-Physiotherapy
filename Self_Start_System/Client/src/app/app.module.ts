import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { NavbarPhysioComponent } from './navbar-physio/navbar-physio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { MatAutocompleteModule } from "@angular/material";
import { PatientListComponent } from './patient-list/patient-list.component';

import { RehabilitationPlanComponent } from './rehabilitation-plan/rehabilitation-plan.component';
import { NewRehabilitationPlanComponent } from './new-rehabilitation-plan/new-rehabilitation-plan.component';
import { HttpModule } from '@angular/http';
import { EditRehabilitationPlanComponent } from './edit-rehabilitation-plan/edit-rehabilitation-plan.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from "@angular/material";
import { MatIconModule} from "@angular/material";
import { ExerciseComponent } from './exercise/exercise.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExerciseService} from "./services/exercise.service";
import { FormService} from "./form.service";

import { AuthenticationService} from "./authentication.service";

import { AssessmentTestService } from "./assessment-test.service";



import { HttpClientModule} from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';

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
import { SetFreeTimeComponent } from './set-free-time/set-free-time.component';
import { CreateNewEventComponent } from './set-free-time/create-new-event/create-new-event.component';
import { BookAppointmentFormComponent } from './book-appointment/book-appointment-form/book-appointment-form.component';

import { LoginComponent } from './login/login.component';

import { EditAssessmentTestDialogComponent } from './edit-assessment-test-dialog/edit-assessment-test-dialog.component';
import { PatientMessagesComponent } from './patient-messages/patient-messages.component';
import { MessagesService} from "./messages.service";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import {MatMenuModule} from "@angular/material";
import { ViewRehabilitationPlanComponent } from './view-rehabilitation-plan/view-rehabilitation-plan.component';
import { PatientCompleteAssessmentTestComponent } from "./patient-complete-assessment-test/patient-complete-assessment-test.component";

import { FlashMessagesModule } from "angular2-flash-messages";
import { EditExerciseDialogComponent } from './edit-exercise-dialog/edit-exercise-dialog.component';
import { PatientRehabilitationPlansComponent } from './patient-rehabilitation-plans/patient-rehabilitation-plans.component';
import { PatientPlanListComponent } from './patient-plan-list/patient-plan-list.component';
import { EditPatientPlanListComponent } from './edit-patient-plan-list/edit-patient-plan-list.component';
import { EditCustomRehabilitationPlanComponent } from './edit-custom-rehabilitation-plan/edit-custom-rehabilitation-plan.component';
import { EditRecommendationDialogComponent } from './edit-recommendation-dialog/edit-recommendation-dialog.component';
import { AuthGuard} from "./guards/auth.guard";
import { NotAuthGuard} from "./guards/not-auth.guard";
import { PatientGuard} from "./guards/patient.guard";
import { PhysioGuard} from "./guards/physio.guard";
import { AdminGuard} from "./guards/admin.guard";
import {RecommendationService} from "./recommendation.service";
import { ConfirmDeleteDialogBoxComponent } from './confirm-delete-dialog-box/confirm-delete-dialog-box.component';
import { PhysiotherapistMessagesComponent } from './physiotherapist-messages/physiotherapist-messages.component';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PhysioPatientListComponent } from './physio-patient-list/physio-patient-list.component';
import { AddNewExerciseDialogComponent } from './add-new-exercise-dialog/add-new-exercise-dialog.component';



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
		SetFreeTimeComponent,
		CreateNewEventComponent,
		BookAppointmentFormComponent,
		LoginComponent,
		EditAssessmentTestDialogComponent,
		PatientMessagesComponent,
		PatientCompleteAssessmentTestComponent,
		PatientPlanListComponent,
		EditPatientPlanListComponent,
		EditExerciseDialogComponent,
		EditCustomRehabilitationPlanComponent,
		EditRecommendationDialogComponent,
		PatientRehabilitationPlansComponent,
		ConfirmDeleteDialogBoxComponent,
		PhysiotherapistMessagesComponent,
		PhysioPatientListComponent,
		AddNewExerciseDialogComponent,
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
    MatMenuModule,
    DndModule.forRoot(),
	  MatStepperModule,
    MatSnackBarModule,
		MatDialogModule,
		LoadingModule,
    MatRadioModule,
    ToastModule.forRoot(),
    FlashMessagesModule.forRoot(),
    MatAutocompleteModule,
  ],
  providers: [ExerciseService,
  FormService, AuthenticationService, AssessmentTestService, RecommendationService, AuthGuard, NotAuthGuard, AdminGuard, PhysioGuard, PatientGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditQuestionDialogComponent,
    EditAssessmentTestDialogComponent,
    EditExerciseDialogComponent,
    EditRecommendationDialogComponent,
    ConfirmDeleteDialogBoxComponent
  ]
})
export class AppModule { }
