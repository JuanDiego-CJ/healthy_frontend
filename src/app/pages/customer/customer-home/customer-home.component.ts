import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../../shared/models/user-profile.model';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { UserPlanService } from '../../../core/services/user-plan.service';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { StorageService } from '../../../core/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanStatusPipe } from '../../../core/pipes/plan-status.pipe';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [PlanStatusPipe, CommonModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent{
  profile!: UserProfile; 
  activePlans: any[] = [];
  pages: number[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  private router = inject(Router);
  private planService = inject(UserPlanService);
  private profileService = inject(UserProfileService);
  private storageService = inject(StorageService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadActivePlans();
  }


  loadActivePlans(): void {
    this.planService.getActivePlans(this.currentPage - 1, 4).subscribe((data) => {
      console.log('Datos de planes:', data);
      this.activePlans = data.content;
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
    this.profileService.getUserProfile().subscribe({
      next: (profileData: UserProfile) => {
        this.profile = profileData;
      },
      error: (err) => {
        this.showSnackBar('Error al obtener el perfil');
      }
    });
  }
  
  updatePlansForCurrentPage(): void {
    const start = (this.currentPage - 1) * 4;
    const end = start + 4;
    this.activePlans = this.activePlans.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadActivePlans();
    }
  }

  createNewPlan(){
    this.router.navigate(['/customer/plan/create-plan']);
  }

  goToPlanDetails(planId: number){
    this.storageService.setPlanId(planId);
    this.router.navigate(['/customer/plan']);
  }

  showSnackBar(message:string) {
    this.snackBar.open(message, 'Cerrar', {
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
