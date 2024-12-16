import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { CreateProfileRequest } from '../../shared/models/createProfile-request.model';
import { UserProfile } from '../../shared/models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private baseURL = `${environment.baseURL}/admin/profiles`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  existsProfile(): Observable<boolean> {
    const authData = this.storageService.getAuthData();
    if (!authData) {
      return new Observable(observer => observer.next(false));
    }

    const { username } = authData; 
        const params = new HttpParams().set('username', username);

    return this.http.get<boolean>(`${this.baseURL}/exists`, { params });
  }

  createProfile(profileData: CreateProfileRequest): Observable<CreateProfileRequest>{
    return this.http.post<CreateProfileRequest>(`${this.baseURL}`, profileData);
  }

  getUserProfile(): Observable<UserProfile>{

    const authData = this.storageService.getAuthData();
    if (!authData) {
      throw new Error('No se encontró información de autenticación');
    }
    const { username } = authData; 
    return this.http.get<UserProfile>(`${this.baseURL}/${username}`);
  }

  updateProfile(profileData: CreateProfileRequest): Observable<CreateProfileRequest>{
    return this.http.put<CreateProfileRequest>(`${this.baseURL}/update`, profileData);
  }

}
