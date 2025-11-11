import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/portfolio.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    ChipModule,
    DividerModule,
    SkeletonModule,
    ProjectCardComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  
  // Signals for reactive state
  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('');
  selectedTechnology = signal<string>('');
  isLoading = signal<boolean>(true);
  
  // Filter options computed from projects
  categories = computed(() => {
    const cats = [...new Set(this.projects().map(p => p.category))];
    return [
      { label: 'All Categories', value: '' },
      ...cats.map(cat => ({ label: cat, value: cat }))
    ];
  });
  
  technologies = computed(() => {
    const techs = [...new Set(this.projects().flatMap(p => p.tools))];
    return [
      { label: 'All Tools', value: '' },
      ...techs.map(tech => ({ label: tech, value: tech }))
    ];
  });
  
  // Statistics computed from filtered projects
  portfolioStats = computed(() => {
    const filtered = this.filteredProjects();
    const totalProjects = filtered.length;
    const featuredProjects = filtered.filter(p => p.featured).length;
    const uniqueCategories = [...new Set(filtered.map(p => p.category))].length;
    const uniqueTechnologies = [...new Set(filtered.flatMap(p => p.tools))].length;
    
    return {
      totalProjects,
      featuredProjects,
      uniqueCategories,
      uniqueTechnologies
    };
  });

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    this.portfolioService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.filteredProjects.set(projects);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.selectedCategory.set(event.value || '');
    this.applyFilters();
  }

  onTechnologyChange(event: any) {
    this.selectedTechnology.set(event.value || '');
    this.applyFilters();
  }

  clearAllFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.selectedTechnology.set('');
    this.filteredProjects.set(this.projects());
  }

  applyFilters() {
    let filtered = this.projects();

    // Search filter
    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tools.some((tech: string) => tech.toLowerCase().includes(search))
      );
    }

    // Category filter
    const category = this.selectedCategory();
    if (category) {
      filtered = filtered.filter(project => project.category === category);
    }

    // Technology filter
    const technology = this.selectedTechnology();
    if (technology) {
      filtered = filtered.filter(project => 
        project.tools.includes(technology)
      );
    }

    this.filteredProjects.set(filtered);
  }

  // Track by function for performance
  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  getSeverityForCategory(category: string): string {
    const severityMap: { [key: string]: string } = {
      'Web Design': 'success',
      'Mobile App': 'info',
      'Dashboard': 'warning',
      'E-commerce': 'danger',
      'Healthcare': 'help',
      'Education': 'secondary'
    };
    return severityMap[category] || 'info';
  }
}