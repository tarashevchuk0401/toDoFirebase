import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';
import { Observable, map, takeUntil } from 'rxjs';
import { UnsubscribingService } from './unsubscribing.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService extends UnsubscribingService{

  pathUrl: string = 'https://newtodofirebase-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'

  constructor(private httpClient: HttpClient) {
    super();
  }


  getAllTasks(): Observable<any> {
    return this.httpClient.get(this.pathUrl).pipe(map(response => {
      let post = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {

          post.push({ ...response[key], id: key });
        }
      }
      return post
    }));
  }

  addTask(newTitle: string): Observable<Task> {
    return this.httpClient.post<Task>(this.pathUrl, { title: newTitle, isDone: false });
  }

  deleteTask(id: string): Observable<any> {
    return this.httpClient.delete('https://newtodofirebase-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + id + '.json')
  }

  changeTask(taskId: string, newStatus: any): Observable<any> {
    return this.httpClient.patch(('https://newtodofirebase-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + taskId + '.json'), newStatus)
  }

  getDone(): Task[] {
    let doneTasks = [];
    this.getAllTasks().pipe(takeUntil(this.unsubscribe$))
    .subscribe((task: any) => {
      task.map(item => {
        if (item.isDone) {
          doneTasks.push(item)
        }
      })
    })
    return doneTasks;
  }






}
