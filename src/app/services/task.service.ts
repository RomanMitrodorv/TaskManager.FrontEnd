import { TaskRequest } from './../models/TaskRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { environment } from '../../environments/environment';
import { BaseDict } from '../models/BaseDict';

const API_URL = environment.TaskApiUrl + 'api/v1/Task/';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL + 'tasks', { responseType: 'json' });
  }

  getLabels(): Observable<BaseDict[]> {
    return this.http.get<BaseDict[]>(API_URL + 'tasklabel', {
      responseType: 'json',
    });
  }

  getUserTasksByDate(date: Date): Observable<Task[]> {
    return this.http.get<Task[]>(
      API_URL + 'tasks' + date.toISOString().slice(0, 10),
      {
        responseType: 'json',
      }
    );
  }

  createTask(task: TaskRequest): Observable<any> {
    console.log(task);
    return this.http.post(API_URL + 'tasks', task);
  }

  updateTask(task: TaskRequest): Observable<any> {
    console.log(task);
    return this.http.put(API_URL + 'tasks', task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(API_URL + '' + id);
  }
}
