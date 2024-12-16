import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router= inject(Router);

  constructor() {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error) && this.registerForm.controls[control].touched;
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: () => {
          this.showSnackBar('Usuario creado correctamente');
          this.router.navigate(['/auth/create-profile']);
        },
        error: (error) =>{
          this.showSnackBar(error.error.message);
        }
      });
    }
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}