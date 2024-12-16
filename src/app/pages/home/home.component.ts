import { Component } from '@angular/core';
import { NavbarHomeComponent } from '../../shared/components/navbar-home/navbar-home.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarHomeComponent, FooterComponent, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}