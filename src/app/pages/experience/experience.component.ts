import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience, SkillEvolution } from '../../models/portfolio.model';

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
  }

  ngOnInit(): void {
    // Component initialization
  }
  
  // Track by function for performance
  trackByExperienceId(index: number, experience: Experience): string {
    return experience.id;
  }

  // Calculate duration between dates
  calculateDuration(startDate: string, endDate?: string | null): string {
    return this.portfolioService.calculateExperienceDuration(startDate, endDate);
  }
}