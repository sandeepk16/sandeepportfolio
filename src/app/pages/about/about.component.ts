import { Component, OnInit, inject } from '@angular/core';
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
import { SEOService } from '../../services/seo.service';
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

  private seoService = inject(SEOService);

  principles = [
    {
      icon: 'pi-users',
      title: 'Ethical Inclusivity',
      description: 'Ensuring accessibility is woven into the architecture, not added as a checkbox.',
      bg: '#fff',
      color: '#0D0D0D',
      iconColor: '#1B56C7'
    },
    {
      icon: 'pi-sparkles',
      title: 'The AI Frontier',
      description: 'Leveraging generative intelligence to augment human creativity, not replace it.',
      bg: '#F05213',
      color: '#fff',
      iconColor: '#fff'
    },
    {
      icon: 'pi-eye',
      title: 'Vision',
      description: 'Seeing the end-to-end journey before the first line of code is ever written. Strategic foresight for long-term product health.',
      bg: '#1B56C7',
      color: '#fff',
      iconColor: '#fff'
    },
    {
      icon: 'pi-sitemap',
      title: 'Systems',
      description: 'Building scalable design languages and modular frontend frameworks.',
      bg: '#FAF8F5',
      color: '#0D0D0D',
      iconColor: '#F05213'
    },
    {
      icon: 'pi-graduation-cap',
      title: 'Mentorship',
      description: 'Fostering the next generation of designers through radical candor and technical empathy.',
      bg: '#fff',
      color: '#0D0D0D',
      iconColor: '#1B56C7'
    }
  ];

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
    // Update SEO metadata for about page
    this.seoService.updatePageMetadata({
      title: 'About Sandeep Kandula - UI/UX Designer & Developer',
      description: 'Learn about Sandeep Kandula, a passionate UI/UX Designer and Developer with 16+ years of experience creating exceptional digital experiences. Background, skills, education, and achievements.',
      keywords: 'About Sandeep Kandula, UI/UX Designer Bio, Web Developer Background, Designer Portfolio, Professional Experience, Education, Achievements',
      ogTitle: 'About Sandeep Kandula - Professional Designer & Developer',
      ogDescription: '16+ years of experience in UI/UX design and development. Specialized in creating innovative digital solutions.',
      ogImage: 'https://sandeepkandula.com/assets/images/og-about.jpg',
      ogUrl: 'https://sandeepkandula.com/about',
      canonicalUrl: '/about'
    });

    // Add breadcrumb
    this.seoService.addStructuredData(
      this.seoService.getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' }
      ])
    );

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