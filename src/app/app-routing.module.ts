import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { guard } from './services/guard.service';

const routes: Routes = [
  {path: '', component: AuthorizationComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'done-tasks', component: DoneTasksComponent , canActivate: [guard]},
  {path: 'home', component: HomeComponent, canActivate: [guard]},
  {path: 'task', component: TaskPageComponent, canActivate: [guard]},
  {path: 'task/:id', component: TaskPageComponent, canActivate: [guard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
