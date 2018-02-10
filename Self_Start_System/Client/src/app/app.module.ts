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
import { MatIconModule } from '@angular/material/icon';

import { DashboardPhysioComponent } from './dashboard-physio/dashboard-physio.component';
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RehabilitationPlanComponent } from './rehabilitation-plan/rehabilitation-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarPhysioComponent,
    DashboardPhysioComponent,
    NotFoundPageComponent,
    RehabilitationPlanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
