import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Task } from '../shared/Task';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allTasks: Task[] = [];
  statusDone  = {
    isDone: true
  };
  statusNotDone = {
    isDone: false
  };

  constructor(private httpService: HttpServiceService, private router: Router){}

  ngOnInit(): void {
    this.getAllTasks();
  }

  addNewTask(newTaskForm : NgForm): void{
    if(newTaskForm.value.title.trim())
    this.httpService.addTask(newTaskForm.value.title).subscribe((task:any) => this.getAllTasks());
    newTaskForm.reset();
  }

  getAllTasks(): void{
    this.httpService.getAllTasks().subscribe((task: any ) => this.allTasks = task);
 }

 delete(id: string): void{
  this.httpService.deleteTask(id).subscribe((task: any) => this.getAllTasks())
 }

 changeSatus(taskId: string, taskIsDone: boolean): void{
  if(taskIsDone === false){
    this.httpService.changeTask(taskId, this.statusDone).subscribe((task:any) => this.getAllTasks())
  }
  else this.httpService.changeTask(taskId, this.statusNotDone).subscribe((task:any) => this.getAllTasks())
 }



}
