import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { UserProfile } from '../../../shared/models/user-profile.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule, RouterLink, MatSelectModule, MatFormFieldModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  profileForm: FormGroup

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private profileService = inject(UserProfileService);
  private router = inject(Router)
  constructor() {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required]],
      height: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: ['', [Validators.required]],
      healthConditions: ['']
    });
  }

  ngOnInit(){
    this.loadProfile();
  }
  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const profileData = this.profileForm.value;
    this.profileService.updateProfile(profileData).subscribe({
      next: () => {
        this.router.navigate(['/customer/profile']);
      },
      error: (err) => {
        console.error('Error al actualizar el perfil ', err);
      }
    });
  }


  loadProfile() {
    this.profileService.getUserProfile().subscribe(
      (response: UserProfile) => {
        console.log(response);
        this.profileForm.patchValue({
          userName: response.name,
          height: response.height,
          weight: response.weight,
          age: response.age,
          gender: response.gender,
          healthConditions: response.healthConditions
        });
      },
      (error) => {
        console.error('Error al cargar el perfil ', error);
      }
    );
  }

  controlHasError(control: string, error: string) {
    return this.profileForm.controls[control].hasError(error);
  }
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
