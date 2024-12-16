import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserPlanService } from '../../../core/services/user-plan.service';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private planService = inject(UserPlanService);

  planForm: FormGroup;
  minDate: string;  

  constructor(){
    this.planForm = this.fb.group({
      planName: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().slice(0, 16); 
  }
  controlHasError(control: string, error: string) {
    return this.planForm.controls[control].hasError(error);
  }

  onSubmit() {
    if(this.planForm.invalid){
      return;
    }

    const planData = this.planForm.value;
    this.planService.createPlan(planData).subscribe({
      next: () =>{
        this.router.navigate(['customer/home']);
      },
      error: (err) => {
        console.error('Error al crear plan', err);
      }
    })
  }
}
