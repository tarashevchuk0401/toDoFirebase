import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { HttpServiceService } from './services/http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { LogoComponent } from './logo/logo.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HomeComponent,
    TaskPageComponent,
    DoneTasksComponent,
    LogoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
