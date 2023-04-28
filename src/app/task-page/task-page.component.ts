import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../shared/Task';
import { HttpServiceService } from '../services/http-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  currentTaskId: string = this.activatedRoute.snapshot.params['id'];
  currentTask: Task[] = [];

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.httpService.getAllTasks().pipe(map(item => {
      let result = item.find((task: any) => task.id === this.currentTaskId);
      console.log(result)
      return result
    })).subscribe((data: any) => this.currentTask.push(data))
  }






}
