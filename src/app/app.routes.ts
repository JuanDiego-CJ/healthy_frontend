import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { PolicyComponent } from './shared/components/policy/policy.component';

export const routes: Routes = [
 {
  path: '',
  component: HomeComponent,
 },
 {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes)
  },
  {
    path: 'customer', 
    loadChildren: () => import('./pages/customer/customer.routes').then(c => c.customerRoutes),
    canActivate: [authGuard]
  },
  { path: 'policy', component:PolicyComponent},
  {
    path: '**',
    redirectTo: '',
  },
];