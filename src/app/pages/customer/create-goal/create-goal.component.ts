import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';
import { UserGoalService } from '../../../core/services/user-goal.service';
import { Router } from '@angular/router';
import { UserHabitResponse } from '../../../shared/models/user-habits-response.model';
import { UserHabitService } from '../../../core/services/user-habit.service';
import { CommonModule } from '@angular/common';
import { HabitTypePipe } from '../../../core/pipes/habit-type.pipe';

@Component({
  selector: 'app-create-goal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HabitTypePipe],
  templateUrl: './create-goal.component.html',
  styleUrl: './create-goal.component.css'
})
export class CreateGoalComponent{
  private fb = inject(FormBuilder);
  private storageService = inject(StorageService);
  private goalService = inject(UserGoalService);
  private router = inject(Router);
  private habitService = inject(UserHabitService);

  goalForm: FormGroup;
  habits: UserHabitResponse[] = [];
  planId: number = 0;
  selectedHabit: string = '';
  minDate: string;
  showHabits: boolean = false;


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
  }

  onSubmitGoal(){
    if(this.goalForm.invalid){
      return;
    }
    const goalData = this.goalForm.value;
    goalData.planId = this.storageService.getPlanId();
    goalData.trackings = [];

    this.goalService.createGoal(goalData).subscribe({
      next: () =>{
        this.router.navigate(['customer/plan']);
      },
      error: (err) => {
        console.error('Error al crear plan', err);
      }
    })
  }

  toggleHabits() {
    this.showHabits = !this.showHabits;
  }
  onHabitChange(habitName: string) {
    this.selectedHabit = habitName;
  }

}
