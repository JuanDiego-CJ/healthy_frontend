import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.css'
})
export class NavbarHomeComponent {
  private authService = inject(AuthService);

  isAuthenticated: boolean = false;

  ngOnInit(): void{
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
