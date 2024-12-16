import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {
  profileForm: FormGroup;
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private profileService = inject(UserProfileService);
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

  controlHasError(control: string, error: string) {
    return this.profileForm.controls[control].hasError(error);
  }

  onSubmit() {
    if(this.profileForm.invalid){
      return;
    }

    const profileData = this.profileForm.value;
    this.profileService.createProfile(profileData).subscribe({
      next: () => {
        this.router.navigate(['/customer/profile']);
      },
      error: (err) => {
        console.error('Error al crear el perfil', err);
      }
    });
  }
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
