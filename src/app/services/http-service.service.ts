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

  addTask(newTitle: string){
   return this.httpClient.post(this.pathUrl, { title: newTitle, isDone: false});
    console.log('ser')
  }

  getAllTasks(): Observable<any> {
    return this.httpClient.get(this.pathUrl).pipe(map(response => {
      let post = [];
      for (const key in response) {

        if(response.hasOwnProperty(key)){
          
          post.push({...response[key], id: key});

        }
      }
      return post
    }));
  }

  deleteTask(id: string): Observable<any>{
    return this.httpClient.delete('https://todofirebase-8a121-default-rtdb.europe-west1.firebasedatabase.app/tasks/' + id + '.json')
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
