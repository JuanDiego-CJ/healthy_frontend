import { Injectable } from "@angular/core";
import { AuthResponse } from "../../shared/models/auth-response.model";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private authKey = 'healthy_auth'
  private planId: number | null = null;
  private goalId: number | null = null;
  constructor() { }

  setAuthData(data: AuthResponse): void {
    localStorage.setItem(this.authKey, JSON.stringify(data))
  }

  getAuthData(): AuthResponse | null {
    const data = localStorage.getItem(this.authKey);
    return data ? JSON.parse(data) as AuthResponse : null;
  }

  clearAuthData(): void {
    localStorage.removeItem(this.authKey);
  }
  setPlanId(id: number) {
    this.planId = id;
  }
  getPlanId(): number | null {
    return this.planId;
  }
  setGoalId(id: number) {
    this.goalId = id;
  }
  getGoalId(): number | null{
    return this.goalId;
  }
}