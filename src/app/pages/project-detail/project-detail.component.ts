import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/portfolio.model';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

interface ProjectMetric {
  value: string;
  label: string;
}

interface CtaContent {
  heading: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ChipModule, TagModule, ButtonModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);
  project: Project | undefined;
  isLoading = true;
  notFound = false;
  leadMetrics: ProjectMetric[] = [];
  ctaContent: CtaContent = {
    heading: 'Ready to start a project?',
    description: "Let's build something that bridges design and engineering.",
    primaryLabel: 'Get in Touch',
    secondaryLabel: 'View Portfolio'
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.portfolioService.getProjectById(id).subscribe({
        next: (proj) => {
          this.isLoading = false;
          if (proj) {
            this.project = proj;
            this.leadMetrics = this.getLeadMetrics(proj.results);
            this.ctaContent = this.buildCtaContent(proj);
          } else {
            this.notFound = true;
          }
        },
        error: () => {
          this.isLoading = false;
          this.notFound = true;
        }
      });
    } else {
      this.isLoading = false;
      this.notFound = true;
    }
  }

  private getLeadMetrics(results?: string[]): ProjectMetric[] {
    if (!results?.length) {
      return [];
    }

    return results
      .slice(0, 4)
      .map((item) => this.extractMetric(item))
      .filter((metric): metric is ProjectMetric => !!metric);
  }

  private extractMetric(item: string): ProjectMetric | null {
    if (!item) {
      return null;
    }

    const numberMatch = item.match(/(\d+\+?%?|\d+\+?[kKmM]?)/);
    if (!numberMatch) {
      return null;
    }

    const value = numberMatch[1].toUpperCase();
    const label = item.replace(numberMatch[1], '').replace(/^[\s:,-]+/, '').trim() || 'Key Result';
    return { value, label };
  }

  private buildCtaContent(project: Project): CtaContent {
    return {
      heading: 'Ready to start a project?',
      description: project.businessThinking?.content || "Let's build something that bridges design and engineering.",
      primaryLabel: 'Get in Touch',
      secondaryLabel: 'View Portfolio'
    };
  }
}

