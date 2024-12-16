import { Component, inject, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { P } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { SubPlanResponse } from '../../../shared/models/sub-plan-response.model';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { SubscriptionRequest } from '../../../shared/models/subscription-request.model';
import { UserProfile } from '../../../shared/models/user-profile.model';
import { CheckoutService } from '../../../core/services/checkout.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {
  private subService = inject(SubscriptionService);
  private profileService = inject(UserProfileService);
  private checkoutService = inject(CheckoutService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  isSubs: boolean = false;

  plans: SubPlanResponse[] = [];
  subData: SubscriptionRequest | null = null;
  profile: UserProfile | null = null;

  ngOnInit(): void {

    this.alreadySub();

    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');
  
    if (token && payerId) {
      this.checkoutService.capturePaypalOrder(token)
        .subscribe(response => {
          if (response.completed) {
            this.router.navigate(['/customer/profile']);
          }
        });
    }
  }

  alreadySub(){
    this.profileService.getUserProfile().subscribe(
      response=>{
        this.profile = response;
        if(this.profile){
          this.subService.getSubStatus(this.profile.id).subscribe(
            response => {
              this.isSubs = response;
              console.log(response);
              if(this.isSubs === false){
                this.loadSubs();
              }
            }
          )
        }
      }
    )
  }
  loadSubs() {
    this.subService.getSubPlans().subscribe(
      (response) => {
        this.plans = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }
  goToPurchase(id: number) {
    this.profileService.getUserProfile().subscribe(
      (response) => {
        this.profile = response;
        if (this.profile !== null) {
          this.subData = { profileId: this.profile.id, subPlanId: id };
          this.subService.createSubscription(this.subData).subscribe(
            (purchase) => {
              this.checkoutService.createPaypalOrder(purchase.id).subscribe(
                (response) => {
                  console.log(response);
                  window.location.href = response.paypalUrl;
              });
            }
          );
        }
      });
  }

  navigateToResource(){
    this.router.navigate(['/customer/resources']);
  }
}
