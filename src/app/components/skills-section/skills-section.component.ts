import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { Skill } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarModule,
    CardModule
  ],
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss']
})
export class SkillsSectionComponent {
  @Input() skills: Skill[] = [];

  get designSkills(): Skill[] {
    return this.skills.filter(skill => skill.category === 'design');
  }

  get toolSkills(): Skill[] {
    return this.skills.filter(skill => skill.category === 'tools');
  }

  get softSkills(): Skill[] {
    return this.skills.filter(skill => skill.category === 'soft-skills');
  }

  getSkillColor(level: number): string {
    if (level >= 90) return '#10b981'; // green-500
    if (level >= 80) return '#3b82f6'; // blue-500
    if (level >= 70) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  }

  getSkillLevel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  }
}