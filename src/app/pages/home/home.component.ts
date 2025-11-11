import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../services/portfolio.service';
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

  constructor(private portfolioService: PortfolioService, private seo: SeoService) {
    this.personalInfo$ = this.portfolioService.getPersonalInfo();
    this.featuredProjects$ = this.portfolioService.getFeaturedProjects();
    this.skills$ = this.portfolioService.getSkills();
    this.portfolioStats$ = this.portfolioService.getPortfolioStats();
    this.totalExperience$ = this.portfolioService.getTotalExperience().pipe(
      map(experience => {
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
      map(experiences => experiences.slice(0, 3))
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
    this.personalInfo$.subscribe(personalInfo => {
      const title = `${personalInfo.name} | ${personalInfo.title}`;
      const description = personalInfo.bio || `${personalInfo.name} — ${personalInfo.title} portfolio.`;
      const keywords = `${personalInfo.name}, ${personalInfo.title}, Portfolio, UI Developer, Hyderabad`;
      this.seo.setSeoData(title, description, keywords);
      this.seo.addTags([
        { name: 'description', content: description },
        { name: 'keywords', content: keywords }
      ]);
    });
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