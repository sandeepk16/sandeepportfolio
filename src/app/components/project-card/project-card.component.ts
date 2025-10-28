import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule,
    ChipModule
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() showDetails: boolean = false;

  getCategoryLabel(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'ui-ux': 'UI/UX Design',
      'web-design': 'Web Design',
      'mobile-app': 'Mobile App',
      'branding': 'Branding',
      'graphic-design': 'Graphic Design'
    };
    return categoryMap[category] || category;
  }

  getCategorySeverity(category: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | null {
    const severityMap: { [key: string]: "success" | "secondary" | "info" | "warn" | "danger" | "contrast" } = {
      'ui-ux': 'success',
      'web-design': 'info',
      'mobile-app': 'warn',
      'branding': 'danger',
      'graphic-design': 'secondary'
    };
    return severityMap[category] || null;
  }
}