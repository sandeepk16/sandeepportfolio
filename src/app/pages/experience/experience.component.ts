import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience, SkillEvolution, SkillCategory } from '../../models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  totalExperience$: Observable<string>;
  companiesWorked$: Observable<number>;
  workExperience$: Observable<Experience[]>;
  projectsCompleted$: Observable<number>;
  skillEvolution$: Observable<SkillEvolution[]>;
  skillsCategories$: Observable<SkillCategory[]>;
  totalSkillsCount$: Observable<number>;

  constructor(private portfolioService: PortfolioService) {
    this.totalExperience$ = this.portfolioService.getTotalExperience();
    this.companiesWorked$ = this.portfolioService.getPortfolioStats().pipe(
      map(stats => stats.totalCompanies)
    );
    this.workExperience$ = this.portfolioService.getExperience();
    this.projectsCompleted$ = this.portfolioService.getPortfolioStats().pipe(
      map(stats => stats.totalProjects)
    );
    this.skillEvolution$ = this.portfolioService.getSkillEvolution();
    this.skillsCategories$ = this.portfolioService.getSkillsCategories();
    this.totalSkillsCount$ = this.portfolioService.getTotalSkillsCount();
  }

  ngOnInit(): void {
    // Component initialization
  }
  
  // Track by function for performance
  trackByExperienceId(index: number, experience: Experience): string {
    return experience.id;
  }

  // Track by function for skills categories
  trackByCategoryId(index: number, category: SkillCategory): string {
    return category.id;
  }

  // Track by function for skills within a category
  trackBySkillName(index: number, skill: string): string {
    return skill;
  }

  // Calculate duration between dates
  calculateDuration(startDate: string, endDate?: string | null): string {
    return this.portfolioService.calculateExperienceDuration(startDate, endDate);
  }
}