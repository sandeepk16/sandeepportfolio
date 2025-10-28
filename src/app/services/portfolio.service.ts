import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';
import { 
  PersonalInfo, 
  Skill, 
  Education, 
  Project, 
  Testimonial, 
  Service, 
  Achievement 
} from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  // Get personal information
  getPersonalInfo(): Observable<PersonalInfo> {
    return this.http.get<{personalInfo: PersonalInfo}>('/assets/data/personal-data.json')
      .pipe(map(data => data.personalInfo));
  }

  // Get skills data
  getSkills(): Observable<Skill[]> {
    return this.http.get<{skills: Skill[]}>('/assets/data/personal-data.json')
      .pipe(map(data => data.skills));
  }

  // Get skills by category
  getSkillsByCategory(category: 'design' | 'tools' | 'soft-skills'): Observable<Skill[]> {
    return this.getSkills().pipe(
      map(skills => skills.filter(skill => skill.category === category))
    );
  }



  // Get education data
  getEducation(): Observable<Education[]> {
    return this.http.get<{education: Education[]}>('/assets/data/personal-data.json')
      .pipe(map(data => data.education));
  }

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<{projects: Project[]}>('/assets/data/projects.json')
      .pipe(map(data => data.projects));
  }

  // Get featured projects
  getFeaturedProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(project => project.featured))
    );
  }

  // Get project by ID
  getProjectById(id: string): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(projects => projects.find(project => project.id === id))
    );
  }

  // Get projects by category
  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(project => project.category === category))
    );
  }

  // Get testimonials
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<{testimonials: Testimonial[]}>('/assets/data/additional-data.json')
      .pipe(map(data => data.testimonials));
  }

  // Get services
  getServices(): Observable<Service[]> {
    return this.http.get<{services: Service[]}>('/assets/data/additional-data.json')
      .pipe(map(data => data.services));
  }

  // Get achievements
  getAchievements(): Observable<Achievement[]> {
    return this.http.get<{achievements: Achievement[]}>('/assets/data/additional-data.json')
      .pipe(map(data => data.achievements));
  }

  // Get complete portfolio data
  getCompletePortfolioData(): Observable<{
    personalInfo: PersonalInfo;
    skills: Skill[];
    education: Education[];
    projects: Project[];
    testimonials: Testimonial[];
    services: Service[];
    achievements: Achievement[];
  }> {
    return combineLatest([
      this.getPersonalInfo(),
      this.getSkills(),
      this.getEducation(),
      this.getProjects(),
      this.getTestimonials(),
      this.getServices(),
      this.getAchievements()
    ]).pipe(
      map(([personalInfo, skills, education, projects, testimonials, services, achievements]) => ({
        personalInfo,
        skills,
        education,
        projects,
        testimonials,
        services,
        achievements
      }))
    );
  }

  // Get portfolio statistics
  getPortfolioStats(): Observable<{
    totalProjects: number;
    yearsOfExperience: number;
    totalSkills: number;
    clientsSatisfied: number;
  }> {
    return combineLatest([
      this.getProjects(),
      this.getSkills(),
      this.getTestimonials()
    ]).pipe(
      map(([projects, skills, testimonials]) => {
        // Static years of experience since we removed experience data
        const yearsOfExperience = 15; // Based on the bio mention of "15+ years"

        return {
          totalProjects: projects.length,
          yearsOfExperience: yearsOfExperience,
          totalSkills: skills.length,
          clientsSatisfied: testimonials.length
        };
      })
    );
  }

  // Search projects by keyword
  searchProjects(keyword: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(project => 
        project.title.toLowerCase().includes(keyword.toLowerCase()) ||
        project.description.toLowerCase().includes(keyword.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())) ||
        project.category.toLowerCase().includes(keyword.toLowerCase())
      ))
    );
  }

  // Get recent projects (latest 3)
  getRecentProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects
        .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
        .slice(0, 3)
      )
    );
  }

  // Get unique project categories
  getProjectCategories(): Observable<string[]> {
    return this.getProjects().pipe(
      map(projects => [...new Set(projects.map(project => project.category))])
    );
  }

  // Get unique project tags
  getProjectTags(): Observable<string[]> {
    return this.getProjects().pipe(
      map(projects => {
        const allTags = projects.flatMap(project => project.tags);
        return [...new Set(allTags)];
      })
    );
  }
}