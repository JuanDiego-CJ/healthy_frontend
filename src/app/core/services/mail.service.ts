import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  private baseURL = `${environment.baseURL}/mail`;
  private http = inject(HttpClient);
  constructor() { }

  recovery(gmail:string): Observable<void>{
    return this.http.post<void>(`${this.baseURL}/sendMail`, gmail);
  }
}
