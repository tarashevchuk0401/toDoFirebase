import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../shared/Task';
import { HttpServiceService } from '../services/http-service.service';
import { map, takeUntil } from 'rxjs';
import { UnsubscribingService } from '../services/unsubscribing.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent extends UnsubscribingService implements OnInit {

  currentTaskId: string = this.activatedRoute.snapshot.params['id'];
  currentTask: Task[] = [];
  newText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, private httpService: HttpServiceService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCurrentTask();
  }

  getCurrentTask(): void {
    this.httpService.getAllTasks().pipe(
      map(item => {
        let result = item.find((task: any) => task.id === this.currentTaskId);
        return result
      }),
      takeUntil(this.unsubscribe$))
      .subscribe((data: any) => this.currentTask.push(data))
  }

  editTask(): void {
    if(this.newText.trim())
    this.httpService.changeTask(this.currentTaskId, { title: this.newText }).pipe(takeUntil(this.unsubscribe$))
    .subscribe(d => this.goToHomeComponent());
   
  }

  goToHomeComponent(): void {
    this.router.navigate(['home']);
  }

}
