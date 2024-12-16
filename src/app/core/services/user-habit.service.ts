import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHabitService {
  private baseURL = `${environment.baseURL}/admin/habits`;
  private http = inject(HttpClient);

  getHabits(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}`);
  }

}
