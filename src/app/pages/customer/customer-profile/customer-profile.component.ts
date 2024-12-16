import { Component, inject, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { UserProfile } from '../../../shared/models/user-profile.model';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent implements OnInit{
  profileExists: boolean = false;
  profile: UserProfile | null = null;
  private profileService =  inject(UserProfileService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.checkProfile();
    this.showProfile();
  }

  checkProfile(): void {
    this.profileService.existsProfile().subscribe((exists: boolean) => {
      this.profileExists = exists;
      if (exists === false) {
        this.router.navigate(['/customer/create-profile']);
      }
      else{
        this.showProfile();
      }
    });
  }

  showProfile(): void{
    this.profileService.getUserProfile().subscribe({
      next: (profileData: UserProfile) => {
        this.profile = profileData;
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
      }
    })
  }

  goToEdit(){
    this.router.navigate(['/customer/profile/edit']);
  }
}
