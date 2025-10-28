import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TimelineModule } from 'primeng/timeline';
import { DividerModule } from 'primeng/divider';
import { Observable } from 'rxjs';

import { PortfolioService } from '../../services/portfolio.service';
import { ContactInfoService, ContactInfo } from '../../services/contact-info.service';
import { PersonalInfo, Education, Achievement } from '../../models/portfolio.model';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChipModule,
    TimelineModule,
    DividerModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  personalInfo$: Observable<PersonalInfo>;
  education$: Observable<Education[]>;
  achievements$: Observable<Achievement[]>;
  contactInfo: ContactInfo | null = null;

  constructor(
    private portfolioService: PortfolioService,
    private contactInfoService: ContactInfoService
  ) {
    this.personalInfo$ = this.portfolioService.getPersonalInfo();
    this.education$ = this.portfolioService.getEducation();
    this.achievements$ = this.portfolioService.getAchievements();
  }

  ngOnInit() {
    // Load contact information
    this.contactInfoService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }

  // Track by functions for performance
  trackByEducation(index: number, education: any): string {
    return education.id || index.toString();
  }

  trackByAchievement(index: number, achievement: any): string {
    return achievement.id || index.toString();
  }

  downloadResume(): void {
    // Implementation for resume download
    console.log('Downloading resume...');
  }

  // Helper methods for contact information
  getEmail(): string {
    return this.contactInfoService.getEmail();
  }

  getPhone(): string {
    return this.contactInfoService.getPhone();
  }

  getLocation(): string {
    return this.contactInfoService.getLocation();
  }

  getLinkedInUrl(): string {
    return this.contactInfo?.socialMedia.linkedin || '';
  }
}