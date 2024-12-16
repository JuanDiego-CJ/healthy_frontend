import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UserPlanRequest } from '../../shared/models/user-plan-request.model';
import { Observable } from 'rxjs';
import { UserPlanResponse } from '../../shared/models/user-plan-response.model';
import { Page } from '../../shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UserPlanService {

  private baseURL = `${environment.baseURL}/admin/plans`;
  private http = inject(HttpClient);

  createPlan(planData: UserPlanRequest): Observable<any> {
    return this.http.post<UserPlanRequest>(`${this.baseURL}`, planData);
  }

  getActivePlans(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.baseURL}/page`, { params });
  }
  getPlanById(planId: number): Observable<UserPlanResponse> {
    return this.http.get<UserPlanResponse>(`${this.baseURL}/${planId}`);
  }
  updatePlan(planId: number, planData: UserPlanResponse): Observable<UserPlanResponse>{
    return this.http.put<UserPlanResponse>(`${this.baseURL}/${planId}`, planData);
  }
}
