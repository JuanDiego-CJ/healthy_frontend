import { Routes } from '@angular/router'
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component'
import { CreateProfileComponent } from './create-profile/create-profile.component'
import { CustomerProfileComponent } from './customer-profile/customer-profile.component'
import { CreatePlanComponent } from './create-plan/create-plan.component'
import { CustomerHomeComponent } from './customer-home/customer-home.component'
import { CustomerPlanComponent } from './customer-plan/customer-plan.component'
import { CreateGoalComponent } from './create-goal/create-goal.component'
import { profileGuard } from '../../core/guards/profile.guard'
import { profileReverseGuard } from '../../core/guards/profile-reverse.guard'
import { EditPlanComponent } from './edit-plan/edit-plan.component'
import { EditGoalComponent } from './edit-goal/edit-goal.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SubscriptionsComponent } from './subscriptions/subscriptions.component'
import { ResourcesComponent } from './resources/resources.component'

export const customerRoutes: Routes = [
    {
        path: '',
        component: CustomerLayoutComponent,
        children: [
            {path: 'profile', component:CustomerProfileComponent},
            {path: 'create-profile', component:CreateProfileComponent, canActivate: [profileGuard]},
            {path: 'plan/create-plan', component: CreatePlanComponent},
            {path: 'home', component: CustomerHomeComponent, canActivate: [profileReverseGuard]},
            {path: 'plan', component: CustomerPlanComponent},
            {path: 'plan/goal', component: CreateGoalComponent},
            {path: 'plan/edit', component: EditPlanComponent},
            {path: 'plan/goal/edit', component: EditGoalComponent},
            {path: 'profile/edit', component:EditProfileComponent},
            {path: 'subscription', component:SubscriptionsComponent},
            {path: 'resources', component:ResourcesComponent}
        ]
    }
]