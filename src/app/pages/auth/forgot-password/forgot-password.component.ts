import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  token: string = '';
  authService = inject(AuthService);
  isTokenValid: boolean = false;
  newPassword: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    console.log('Token recibido:', this.token);

    if (this.token) {
      this.verifyToken(this.token);
    }
  }

  verifyToken(token: string): void {
    this.authService.checkToken(token).subscribe(
      (response)=>{
        if(response === false){
          this.router.navigate(['/auth/login']);
          alert('Token expirado');
        }
        else{
          this.isTokenValid = true;
        }
      },
      (error) => {
        alert('Error al verificar el token');
        this.router.navigate(['/auth/login'])
      }
    )
  }
  submitNewPassword(): void {
    if (!this.newPassword) {
      alert('Por favor ingresa una nueva contraseña.');
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      (response) => {
        alert('Contraseña restablecida con éxito.');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        alert('Error al restablecer la contraseña');
      }
    );
  }
}
