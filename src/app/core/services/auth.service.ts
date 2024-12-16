import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';
import { CreateProfileRequest } from '../../shared/models/createProfile-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  constructor() { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest)
      .pipe(
        tap(response => this.storageService.setAuthData(response))
      )
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/register`, registerRequest);
  }

  logout(): void {
    this.storageService.clearAuthData();
  }

  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }
  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.role : null;
  }
  checkToken(token: string): Observable<any>{
    return this.http.get(`${environment.baseURL}/mail/reset/check/${token}`);
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/mail/reset/${token}`,  newPassword);
  }
}
