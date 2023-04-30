import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/Task';
import { HttpServiceService } from '../services/http-service.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.component.html',
  styleUrls: ['./done-tasks.component.css']
})
export class DoneTasksComponent implements OnInit {
  doneTasks: Task[] = [];

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.getDone();
  }

  getDone() {
    this.httpService.getAllTasks().pipe(map((item: any) => {
      item.forEach(task => {
        if (task.isDone) this.doneTasks.push(task)
      })
    })).subscribe((task: any) => {
      console.log(this.doneTasks)
    })

  }

}
