import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../services/portfolio.service';
import { SEOService } from '../../services/seo.service';
import { PersonalInfo, Project, Skill, Experience, Service } from '../../models/portfolio.model';

interface ServicePreview {
  title: string;
  description: string;
  icon: string;
}

interface RecentExperience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  personalInfo$: Observable<PersonalInfo>;
  featuredProjects$: Observable<Project[]>;
  skills$: Observable<Skill[]>;
  portfolioStats$: Observable<{
    totalProjects: number;
    yearsOfExperience: number;
    totalSkills: number;
    clientsSatisfied: number;
    totalCompanies: number;
  }>;
  totalExperience$: Observable<string>;
  recentExperience$: Observable<Experience[]>;
  servicesPreviews$: Observable<ServicePreview[]>;

  private seoService = inject(SEOService);

  constructor(private portfolioService: PortfolioService) {
    this.personalInfo$ = this.portfolioService.getPersonalInfo();
    this.featuredProjects$ = this.portfolioService.getFeaturedProjects();
    this.skills$ = this.portfolioService.getSkills();
    this.portfolioStats$ = this.portfolioService.getPortfolioStats();
    
    // Create a more robust total experience observable with fallback
    this.totalExperience$ = this.portfolioService.getTotalExperience().pipe(
      map(experience => {
        // If the result contains NaN or is empty, provide fallback
        if (!experience || experience.includes('NaN') || experience.includes('undefined')) {
          const currentYear = new Date().getFullYear();
          const startYear = 2009;
          const years = currentYear - startYear;
          return `${years}+ Years`;
        }
        return experience;
      })
    );
    
    this.recentExperience$ = this.portfolioService.getExperience().pipe(
      map(experiences => experiences.slice(0, 3)) // Get the first 3 most recent experiences
    );
    
    this.servicesPreviews$ = this.portfolioService.getServices().pipe(
      map(services => services.slice(0, 4).map(service => ({
        title: service.title,
        description: service.description,
        icon: service.icon
      })))
    );
  }

  ngOnInit(): void {
    // Update SEO metadata for home page
    this.seoService.updatePageMetadata({
      title: 'Sandeep Kandula - UI/UX Designer & Developer Portfolio',
      description: 'Professional UI/UX Designer and Developer with 16+ years of experience. Specializing in AI-powered design solutions, web applications, and innovative user interfaces in Hyderabad, India.',
      keywords: 'UI/UX Designer, Web Developer, Angular Developer, Frontend Developer, AI Design, Mobile App Design, Hyderabad Designer, Portfolio, React Developer',
      ogTitle: 'Sandeep Kandula - UI/UX Designer & Developer',
      ogDescription: 'Creating exceptional digital experiences with AI-powered design solutions. 16+ years of expertise in UI/UX design and development.',
      ogImage: 'https://sandeepkandula.com/assets/images/og-home.jpg',
      ogUrl: 'https://sandeepkandula.com/',
      twitterCard: 'summary_large_image',
      canonicalUrl: '/'
    });

    // Add structured data
    this.seoService.addStructuredData(this.seoService.getPersonSchema());
    this.seoService.addStructuredData(this.seoService.getWebsiteSchema());
    
    // Add breadcrumb
    this.seoService.addStructuredData(
      this.seoService.getBreadcrumbSchema([
        { name: 'Home', url: '/' }
      ])
    );
  }

  formatExperiencePeriod(startDate: string, endDate?: string | null, current?: boolean): string {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    
    if (current || !endDate) {
      return `${startFormatted} - Present`;
    }
    
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    
    return `${startFormatted} - ${endFormatted}`;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }
}