import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of } from 'rxjs';
import { 
  PersonalInfo, 
  Skill, 
  Education, 
  Experience,
  Project, 
  Testimonial, 
  Service, 
  Achievement,
  SkillEvolution,
  SkillCategory 
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

  // Get personal information with dynamic bio
  getPersonalInfoWithDynamicBio(): Observable<PersonalInfo> {
    return this.getPersonalInfo().pipe(
      map(personalInfo => {
        const yearsOfExperience = this.calculateYearsOfExperience(personalInfo.experienceStartDate);
        return {
          ...personalInfo,
          bio: `Passionate UI/UX Designer with ${yearsOfExperience}+ years of experience creating intuitive and visually appealing digital experiences. I specialize in transforming complex problems into simple, elegant solutions that delight users and drive business results.`
        };
      })
    );
  }

  // Calculate years of experience from start date
  private calculateYearsOfExperience(startDate: string): number {
    const start = new Date(startDate);
    const current = new Date();
    
    const yearsDiff = current.getFullYear() - start.getFullYear();
    const monthsDiff = current.getMonth() - start.getMonth();
    
    let yearsOfExperience = yearsDiff;
    if (monthsDiff < 0) {
      yearsOfExperience--;
    }
    
    return yearsOfExperience;
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

  // Get experience data
  getExperience(): Observable<Experience[]> {
    return this.http.get<{experience: Experience[]}>('/assets/data/personal-data.json')
      .pipe(map(data => data.experience));
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

  // Get skill evolution data
  getSkillEvolution(): Observable<SkillEvolution[]> {
    return this.http.get<{skillEvolution: SkillEvolution[]}>('/assets/data/personal-data.json')
      .pipe(map(data => data.skillEvolution));
  }

  // Get skills categories data
  getSkillsCategories(): Observable<SkillCategory[]> {
    return this.http.get<{skillsCategories: SkillCategory[]}>('/assets/data/personal-data.json')
      .pipe(map(data => data.skillsCategories));
  }

  // Get total skills count across all categories
  getTotalSkillsCount(): Observable<number> {
    return this.getSkillsCategories().pipe(
      map(categories => categories.reduce((total, category) => total + category.skills.length, 0))
    );
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
    totalCompanies: number;
  }> {
    return combineLatest([
      this.getPersonalInfo(),
      this.getProjects(),
      this.getSkills(),
      this.getTestimonials(),
      this.getExperience()
    ]).pipe(
      map(([personalInfo, projects, skills, testimonials, experience]) => {
        // Calculate dynamic years of experience using centralized method
        const yearsOfExperience = this.calculateYearsOfExperience(personalInfo.experienceStartDate);
        
        // Get unique companies count
        const uniqueCompanies = new Set(experience.map(exp => exp.company)).size;

        return {
          totalProjects: projects.length,
          yearsOfExperience: yearsOfExperience,
          totalSkills: skills.length,
          clientsSatisfied: testimonials.length,
          totalCompanies: uniqueCompanies
        };
      })
    );
  }

  // Calculate experience duration
  calculateExperienceDuration(startDate: string, endDate?: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (diffYears > 0) {
      return diffMonths > 0 ? `${diffYears}.${Math.floor(diffMonths/3)} Years` : `${diffYears} Years`;
    } else {
      return `${diffMonths} Months`;
    }
  }

  // Get total experience duration
  getTotalExperience(): Observable<string> {
    // Direct calculation without depending on personal info
    const startDate = new Date('2009-05-01');
    const currentDate = new Date();
    
    const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - startDate.getMonth();
    
    let totalYears = yearsDiff;
    if (monthsDiff < 0) {
      totalYears--;
    }
    
    // Ensure we have a valid result
    if (isNaN(totalYears) || totalYears <= 0) {
      totalYears = 16; // Fallback value
    }
    
    const result = `${totalYears}+ Years`;
    
    return of(result);
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

  // Get FAQ data
  getFaqData(): Observable<any> {
    return this.http.get<{faqSection: any}>('/assets/data/personal-data.json')
      .pipe(map(data => data.faqSection));
  }

  // Check if FAQ section is active
  isFaqActive(): Observable<boolean> {
    return this.getFaqData().pipe(
      map(faqData => faqData.isActive)
    );
  }

  // Get FAQs by category
  getFaqsByCategory(category?: string): Observable<any[]> {
    return this.getFaqData().pipe(
      map(faqData => {
        if (!faqData.isActive) return [];
        if (!category) return faqData.faqs;
        return faqData.faqs.filter((faq: any) => faq.category === category);
      })
    );
  }
}