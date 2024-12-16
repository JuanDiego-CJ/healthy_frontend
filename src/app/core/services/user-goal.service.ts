import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UserGoalsRequest } from '../../shared/models/user-goals-request.model';
import { Observable } from 'rxjs';
import { UserGoalsResponse } from '../../shared/models/user-goals-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserGoalService {

  private baseURL = `${environment.baseURL}/admin/goals`;
  private http = inject(HttpClient);

  createGoal(goalData: UserGoalsRequest): Observable<any>{
    return this.http.post<UserGoalsRequest>(`${this.baseURL}`, goalData);
  }
  deleteGoal(goalId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${goalId}`);
  }
  getGoalById(goalId: number): Observable<any>{
    return this.http.get<UserGoalsResponse>(`${this.baseURL}/${goalId}`);
  }
  updateGoal(goalId: number, goalData: UserGoalsResponse): Observable<UserGoalsResponse>{
    return this.http.put<UserGoalsResponse>(`${this.baseURL}/${goalId}`, goalData);
  }
}
