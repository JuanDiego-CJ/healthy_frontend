import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';
import { UserGoalService } from '../../../core/services/user-goal.service';
import { CommonModule, Location } from '@angular/common';
import { HabitTypePipe } from '../../../core/pipes/habit-type.pipe';
import { UserGoalsResponse } from '../../../shared/models/user-goals-response.model';
import { UserHabitResponse } from '../../../shared/models/user-habits-response.model';
import { UserHabitService } from '../../../core/services/user-habit.service';
import { UserGoalsRequest } from '../../../shared/models/user-goals-request.model';

@Component({
  selector: 'app-edit-goal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HabitTypePipe],
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.css'
})
export class EditGoalComponent implements OnInit{
  private fb = inject(FormBuilder);
  private storageService = inject(StorageService);
  private goalService = inject(UserGoalService);
  private goalId: number | null = null;
  private goal: UserGoalsRequest | null = null;
  private location = inject(Location)
  private habitService = inject(UserHabitService);

  goalForm: FormGroup;
  habits: UserHabitResponse[] = [];
  minDate: string;
  selectedHabit: string = '';
  showHabits: boolean = false;
  planId: number | null = null;

  constructor(){
    this.goalForm = this.fb.group({
      targetValue: ['', [Validators.required]],
      currentValue: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      habitId: ['', [Validators.required]],
    })
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().slice(0, 16); 
  }

  ngOnInit() {
    this.habitService.getHabits().subscribe(
      (data: UserHabitResponse[]) => {
        this.habits = data;
      },
      error => {
        console.error('Error al cargar los hábitos:', error);
      }
    );
    this.loadGoal();
  }

  loadGoal() {
    this.goalId = this.storageService.getGoalId();
    if (this.goalId !== null) {
      this.goalService.getGoalById(this.goalId).subscribe(
        (response: UserGoalsRequest[]) => {
          this.goal = response[0];
          this.goal.planId
          this.goalForm.patchValue({
            targetValue: this.goal?.targetValue,
            currentValue: this.goal?.currentValue,
            endDate: this.goal?.endDate,
          });
        },
        (error) => {
          console.error('Error al cargar la meta:', error);
        }
      );
    }
  }

  onSubmitGoal(){
    if(this.goalForm.invalid){
      return;
    }
    const goalData = this.goalForm.value;
    this.planId = this.storageService.getPlanId();
    goalData.planId = this.planId
    console.log(this.goalId);
    if(this.goalId !== null){
      this.goalService.updateGoal(this.goalId, goalData).subscribe({
        next: () =>{
          this.location.back()
        },
        error: (err) =>{
          console.error('Eror al actualiza meta ',err);
        }
      })
    }
  }
  toggleHabits() {
    this.showHabits = !this.showHabits;
  }
  onHabitChange(habitName: string) {
    this.selectedHabit = habitName;
  }
}
