import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionRequest } from '../../shared/models/subscription-request.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = `${environment.baseURL}/admin`;
  private http  = inject(HttpClient);

  getSubPlans(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/sub_plans`);
  }
  createSubscription(subData: SubscriptionRequest){
    return this.http.post<any>(`${this.baseUrl}/subscriptions`, subData);
  }
  getSubStatus(profileId: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/subscriptions/has-active-subscription/${profileId}`);
  }
}
