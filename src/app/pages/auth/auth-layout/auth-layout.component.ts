import { Component } from '@angular/core';
import { NavbarHomeComponent } from '../../../shared/components/navbar-home/navbar-home.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarHomeComponent, FooterComponent, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
