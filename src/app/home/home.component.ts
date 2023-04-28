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

  constructor(private httpService: HttpServiceService, private router: Router){}

  ngOnInit(): void {
    this.getAllTasks();
  }

  addNewTask(newTaskForm : NgForm){
    console.log(newTaskForm.value.title)
    this.httpService.addTask(newTaskForm.value.title).subscribe((task:any) => this.getAllTasks())
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((task: any ) => this.allTasks = task);
 }

 delete(id: string){
  this.httpService.deleteTask(id).subscribe((task: any) => this.getAllTasks())
 }

//  edit(){
//   this.router.navigate(['task']);
//  }

}
