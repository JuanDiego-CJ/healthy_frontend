import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private baseUrl = `${environment.baseURL}/admin/resources`;
  private http = inject(HttpClient);

  getResources(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
