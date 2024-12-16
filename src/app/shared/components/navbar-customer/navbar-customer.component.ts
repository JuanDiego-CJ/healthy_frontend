import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-customer',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './navbar-customer.component.html',
  styleUrl: './navbar-customer.component.css'
})
export class NavbarCustomerComponent {
  private authService = inject(AuthService);
  isAuthenticated: boolean = true;
  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
