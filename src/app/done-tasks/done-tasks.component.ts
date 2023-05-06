import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/Task';
import { HttpServiceService } from '../services/http-service.service';
import { Observable, filter, interval, map, takeUntil } from 'rxjs';
import { UnsubscribingService } from '../services/unsubscribing.service';

@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.component.html',
  styleUrls: ['./done-tasks.component.scss']
})
export class DoneTasksComponent extends UnsubscribingService implements OnInit {
  doneTasks: Task[] = [];

  src$ = interval(1000);

  constructor(private httpService: HttpServiceService) {
    super();
  }

  ngOnInit(): void {
    this.getDone();
    this.src$.pipe(takeUntil(this.unsubscribe$)).subscribe(d => console.log(d))
  }

  getDone(): void {
    this.httpService.getAllTasks().pipe(map((item: any) => {
      item.forEach(task => {
        if (task.isDone) this.doneTasks.push(task)
      },
        (takeUntil(this.unsubscribe$))
      )
    })).subscribe();
  }

}
