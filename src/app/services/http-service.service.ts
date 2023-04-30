import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  pathUrl: string = 'https://todofirebase-8a121-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'

  constructor(private httpClient: HttpClient) { }


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


  addTask(newTitle: string) {
    return this.httpClient.post(this.pathUrl, { title: newTitle, isDone: false });
    console.log('ser')
  }

  deleteTask(id: string): Observable<any> {
    return this.httpClient.delete('https://todofirebase-8a121-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + id + '.json')
  }

  changeStatus(taskId: string, newStatus: any): Observable<any> {
    return this.httpClient.patch(('https://todofirebase-8a121-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + taskId + '.json'), newStatus)
  }

  getDone() {
    let doneTasks = [];
    this.getAllTasks().subscribe((task: any) => {
      task.map(item => {
        if (item.isDone) {
          doneTasks.push(item)
        }
      })
    })
    return doneTasks;
  }

  // getById(): Observable<any> {
  //   return this.httpClient.get(this.pathUrl).pipe(map(response => {
  //     let post = [];
  //     for (const key in response) {

  //       if(response.hasOwnProperty(key)){

  //         post.push({...response[key], id: key});

  //       }
  //     }
  //     return post
  //   }));
  // }




}
