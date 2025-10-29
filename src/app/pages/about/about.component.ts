import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    RouterModule,
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
  portfolioStats$: Observable<{
    totalProjects: number;
    yearsOfExperience: number;
    totalSkills: number;
    clientsSatisfied: number;
    totalCompanies: number;
  }>;
  contactInfo: ContactInfo | null = null;

  constructor(
    private portfolioService: PortfolioService,
    private contactInfoService: ContactInfoService
  ) {
    this.personalInfo$ = this.portfolioService.getPersonalInfo();
    this.education$ = this.portfolioService.getEducation();
    this.achievements$ = this.portfolioService.getAchievements();
    this.portfolioStats$ = this.portfolioService.getPortfolioStats();
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
    this.personalInfo$.subscribe(personalInfo => {
      if (personalInfo.resumeUrl) {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = personalInfo.resumeUrl;
        link.download = 'Sandeep-K-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.warn('Resume URL not found');
      }
    });
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