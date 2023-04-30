import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';

const routes: Routes = [
  {path: '', component: AuthorizationComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'done-tasks', component: DoneTasksComponent},
  {path: 'home', component: HomeComponent},
  {path: 'task', component: TaskPageComponent},
  {path: 'task/:id', component: TaskPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
