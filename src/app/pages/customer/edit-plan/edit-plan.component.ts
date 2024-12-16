import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserPlanRequest } from '../../../shared/models/user-plan-request.model';
import { StorageService } from '../../../core/services/storage.service';
import { UserPlanService } from '../../../core/services/user-plan.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-plan.component.html',
  styleUrl: './edit-plan.component.css'
})
export class EditPlanComponent implements OnInit{
  plan: UserPlanRequest | null = null;
  planId: number | null = null;
  
  private fb = inject(FormBuilder);
  private storageService = inject(StorageService);
  private planService = inject(UserPlanService);
  private location = inject(Location);

  planForm: FormGroup;
  constructor(){
    this.planForm = this.fb.group({
      planName: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  ngOnInit(): void {
      this.loadPlan();
  }

  loadPlan(){
    this.planId = this.storageService.getPlanId()
    if(this.planId !== null){
      this.planService.getPlanById(this.planId).subscribe(
        (response) =>{
          this.plan = response
          this.planForm.patchValue({ 
            planName: this.plan.planName,
            description: this.plan.description
          })
        },
        (error) =>{
          console.error('Error al obtener detalles del plan: ', error);
        }
      )
    }
  }

  onSubmit(){
    if(this.planForm.invalid){
      return;
    }
    const planData = this.planForm.value;
    if(this.planId !== null){
      this.planService.updatePlan(this.planId, planData).subscribe({
        next: () =>{
          this.location.back();
        },
        error: (err) =>{
          console.error('Error al editar plan', err);
        } 
      })
    }
  }
}
