import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarHomeComponent } from '../../../shared/components/navbar-home/navbar-home.component';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [NavbarHomeComponent, FooterComponent, RouterOutlet],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
