import { Component, inject, OnInit } from '@angular/core';
import { ResourcesService } from '../../../core/services/resources.service';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { UserProfile } from '../../../shared/models/user-profile.model';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../shared/models/resources-response.model';
import { ResourceTypePipe } from '../../../core/pipes/resource-type.pipe';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, ResourceTypePipe],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit {
  private resourceService = inject(ResourcesService);
  private profileService = inject(UserProfileService);
  private subService = inject(SubscriptionService);

  isSubs: boolean = false;
  profile: UserProfile | null = null;
  resources: Resource[] = [];

  ngOnInit(): void {
    this.loadResources();
  }
  checkStatus(){
    this.profileService.getUserProfile().subscribe(
      response=>{
        this.profile = response
        if(this.profile){
          this.subService.getSubStatus(this.profile.id).subscribe(
            response => {
              this.isSubs = response;
              if(this.isSubs){
                this.loadResources();
              }
            }
          )
        }
      }
    )
  }

  loadResources(){
    this.resourceService.getResources().subscribe(
      (response)=>{
        this.resources = response
      },
      (error) =>{
        console.error(error);
      }
    )
  }
}
