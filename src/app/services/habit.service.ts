import { Habit } from './../models/Habit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HabitCreateRequest } from '../models/HabitCreateRequest';

const API_URL = environment.HabbitApiUrl + 'api/v1/habit/';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  constructor(private http: HttpClient) {}

  getUserHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(API_URL + 'habit', { responseType: 'json' });
  }

  createHabit(habit: HabitCreateRequest): Observable<any> {
    return this.http.post<Habit>(API_URL + 'habit', habit, {
      responseType: 'json',
    });
  }

  deleteHabit(id: number): Observable<any> {
    return this.http.delete(API_URL + '' + id);
  }
}
