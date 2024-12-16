import { Routes } from '@angular/router'
import { AuthLayoutComponent } from './auth-layout/auth-layout.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { RecoveryComponent } from './recovery/recovery.component'
import { authInverseGuard } from '../../core/guards/auth-inverse.guard'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
export const authRoutes: Routes = [

    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path:'login', component:LoginComponent,  canActivate: [authInverseGuard]},
            {path:'register', component:RegisterComponent, canActivate: [authInverseGuard]},
            {path: 'recovery', component:RecoveryComponent},
            {path: 'forgot/:token', component: ForgotPasswordComponent}
        ]
    }

]