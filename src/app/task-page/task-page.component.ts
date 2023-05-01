import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  newText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, private httpService: HttpServiceService, 
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getCurrentTask();
  }

  getCurrentTask() {
    this.httpService.getAllTasks().pipe(map(item => {
      let result = item.find((task: any) => task.id === this.currentTaskId);
      console.log(result)
      return result
    })).subscribe((data: any) => this.currentTask.push(data))
  }

  editTask(){
    this.httpService.changeTask(this.currentTaskId, {title: this.newText}).subscribe(d => this.goToHomeComponent( ));
  }

  goToHomeComponent(){
    this.router.navigate(['home']);
  }






}
