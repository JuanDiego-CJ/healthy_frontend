import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { UserPlanService } from '../../../core/services/user-plan.service';
import { UserPlanResponse } from '../../../shared/models/user-plan-response.model';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GoalStatusPipe } from '../../../core/pipes/goal-status.pipe';
import { PlanStatusPipe } from '../../../core/pipes/plan-status.pipe';
import { UserGoalService } from '../../../core/services/user-goal.service';
import { HabitTypePipe } from '../../../core/pipes/habit-type.pipe';

@Component({
  selector: 'app-customer-plan',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, GoalStatusPipe, PlanStatusPipe, HabitTypePipe],
  templateUrl: './customer-plan.component.html',
  styleUrl: './customer-plan.component.css'
})
export class CustomerPlanComponent implements OnInit{

  planId: number |null = null;
  plan: UserPlanResponse | null = null;
  private storageService = inject(StorageService);
  private planService = inject(UserPlanService);
  private router = inject(Router);
  private goalService = inject(UserGoalService);

  ngOnInit(){
    this.loadPlan();
  }

  loadPlan(){
    this.planId = this.storageService.getPlanId();
    console.log(this.planId);
    if (this.planId !== null) {
      this.planService.getPlanById(this.planId).subscribe(
        (planDetails) => {
          console.log('Detalles del Plan:', planDetails);
          this.plan = planDetails;
        },
        (error) => {
          console.error('Error al obtener detalles del plan:', error);
        }
      );
    }
  }

  createNewGoal(){
    this.router.navigate(['customer/plan/goal']);
  }

  goToEditPlan(){
    this.router.navigate(['/customer/plan/edit']);
  }

  deleteGoal(goalId: number){
    this.goalService.deleteGoal(goalId).subscribe({
      next: () => {
        this.loadPlan();
      },
      error: (err) =>{
        console.error('Error al eliminar meta, ', err);
      }
    })
  }
  editGoal(goalId: number){
    this.storageService.setGoalId(goalId);
    this.router.navigate(['customer/plan/goal/edit']);
  }
}
