import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PortfolioService } from '../../services/portfolio.service';
import { PersonalInfo, Project, Skill } from '../../models/portfolio.model';

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
  }>;

  servicesPreviews: ServicePreview[] = [
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user experiences',
      icon: 'pi pi-palette'
    },
    {
      title: 'AI Integration',
      description: 'Implementing AI-powered design solutions',
      icon: 'pi pi-cog'
    },
    {
      title: 'Design Systems',
      description: 'Building scalable and consistent design frameworks',
      icon: 'pi pi-th-large'
    },
    {
      title: 'Consultation',
      description: 'Strategic design guidance and optimization',
      icon: 'pi pi-comments'
    }
  ];

  recentExperience: RecentExperience[] = [
    {
      title: 'Sr. UI/UX Designer & Developer',
      company: 'Hitachi',
      startDate: 'Jan 2020',
      current: true,
      technologies: ['React', 'Angular', 'Figma', 'TypeScript', 'SASS', 'Design Systems']
    },
    {
      title: 'Sr. UI/UX Designer & Front-End Developer',
      company: 'HealthiPASS',
      startDate: 'Sep 2018',
      endDate: 'Sep 2019',
      current: false,
      technologies: ['Vue.js', 'Sketch', 'Adobe XD', 'CSS3', 'JavaScript']
    },
    {
      title: 'UI/UX Designer & Front-End Developer',
      company: 'Syook',
      startDate: 'Mar 2017',
      endDate: 'Aug 2018',
      current: false,
      technologies: ['React', 'Figma', 'Material-UI', 'Redux', 'Responsive Design']
    }
  ];

  constructor(private portfolioService: PortfolioService) {
    this.personalInfo$ = this.portfolioService.getPersonalInfo();
    this.featuredProjects$ = this.portfolioService.getFeaturedProjects();
    this.skills$ = this.portfolioService.getSkills();
    this.portfolioStats$ = this.portfolioService.getPortfolioStats();
  }

  ngOnInit(): void {
    // Component initialization logic here
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