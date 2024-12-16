import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MailService } from '../../../core/services/mail.service';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent {
  recoveryForm: FormGroup;

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private mailService = inject(MailService);

  constructor() {
    this.recoveryForm = this.fb.group({
      user: ['', [Validators.required]]
    });
  }

  controlHasError(control: string, error: string) {
    return this.recoveryForm.controls[control].hasError(error);
  }
  onSubmit() {
    if(this.recoveryForm.invalid){
      return;
    }

    const email = this.recoveryForm.value.user;

    this.mailService.recovery(email).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        this.showSnackBar('Error en las credenciales');
      },
    });

  }
  showSnackBar(message:string) {
    this.snackBar.open(message, 'Cerrar', {
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
