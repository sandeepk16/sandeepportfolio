import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  duration: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'current' | 'previous';
}

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
export class ExperienceComponent {
  workExperience: WorkExperience[] = [
    {
      id: 'hitachi',
      title: 'Sr. UI/UX Designer & Developer',
      company: 'Hitachi',
      duration: 'Jan 2020 – 2021',
      period: '4+ Years',
      description: 'Leading UI/UX design and development initiatives for enterprise-level applications, focusing on user-centered design principles and modern development practices.',
      technologies: ['React', 'Angular', 'Figma', 'Adobe Creative Suite', 'TypeScript', 'SASS'],
      achievements: [
        'Led design system implementation across 5+ product lines',
        'Improved user engagement by 40% through UX optimization',
        'Mentored junior designers and developers',
        'Established design-to-development workflow processes'
      ],
      type: 'current'
    },
    {
      id: 'healthipass',
      title: 'Sr. UI/UX Designer & Front-End Developer',
      company: 'HealthiPASS',
      duration: 'Sep 2018 – Sep 2019',
      period: '1 Year',
      description: 'Designed and developed healthcare technology interfaces, focusing on accessibility and user experience for medical professionals and patients.',
      technologies: ['Vue.js', 'Sketch', 'InVision', 'HTML5', 'CSS3', 'JavaScript'],
      achievements: [
        'Designed HIPAA-compliant user interfaces',
        'Reduced user onboarding time by 60%',
        'Implemented responsive design across all platforms',
        'Collaborated with medical professionals for UX research'
      ],
      type: 'previous'
    },
    {
      id: 'arkhya-tech',
      title: 'Sr. UI/UX Designer Specialist',
      company: 'Arkhya Tech',
      duration: 'Aug 2016 – Aug 2018',
      period: '2 Years',
      description: 'Specialized in creating innovative digital experiences for tech startups and established companies, with focus on mobile-first design approaches.',
      technologies: ['Photoshop', 'Illustrator', 'Sketch', 'Principle', 'jQuery', 'Bootstrap'],
      achievements: [
        'Designed 15+ successful mobile applications',
        'Increased client satisfaction scores by 35%',
        'Developed reusable UI component libraries',
        'Led workshops on design thinking methodologies'
      ],
      type: 'previous'
    },
    {
      id: 'bimarian',
      title: 'Sr. UI/UX Designer Engineer',
      company: 'Bimarian Information Technologies Pvt. Ltd',
      duration: 'Mar 2014 – Aug 2016',
      period: '2.5 Years',
      description: 'Engineered user interface solutions for enterprise software, combining design expertise with technical development skills.',
      technologies: ['Adobe Creative Suite', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      achievements: [
        'Delivered 20+ enterprise software interfaces',
        'Reduced development time by 25% through design systems',
        'Trained development teams on UI/UX best practices',
        'Established quality assurance processes for UI development'
      ],
      type: 'previous'
    },
    {
      id: 'vipit',
      title: 'UI/UX Designer',
      company: 'VIPIT Service Pvt. Ltd',
      duration: 'Oct 2012 – Feb 2014',
      period: '1.3 Years',
      description: 'Focused on web and mobile interface design for various client projects, developing strong foundation in user experience principles.',
      technologies: ['Photoshop', 'Illustrator', 'HTML', 'CSS', 'JavaScript'],
      achievements: [
        'Completed 30+ client projects successfully',
        'Improved website conversion rates by 20%',
        'Established client feedback integration processes',
        'Developed cross-browser compatible interfaces'
      ],
      type: 'previous'
    },
    {
      id: 'pegasys',
      title: 'Web Designer',
      company: 'Pegasys Information Technologies',
      duration: 'May 2009 – Oct 2012',
      period: '3.5 Years',
      description: 'Started career in web design, focusing on creating visually appealing and functional websites for diverse industry clients.',
      technologies: ['Photoshop', 'Dreamweaver', 'HTML', 'CSS', 'Flash', 'ActionScript'],
      achievements: [
        'Designed and developed 50+ websites',
        'Established design workflow and quality standards',
        'Built strong foundation in web technologies',
        'Developed client communication and project management skills'
      ],
      type: 'previous'
    }
  ];

  totalExperience = '15+ Years';
  companiesWorked = 6;
  projectsCompleted = 100;

  skillEras = [
    {
      years: '2009-2012',
      focus: 'Foundation',
      tools: ['Photoshop', 'Illustrator', 'HTML/CSS', 'jQuery']
    },
    {
      years: '2013-2016',
      focus: 'Growth',
      tools: ['Sketch', 'InVision', 'Bootstrap', 'Responsive Design']
    },
    {
      years: '2017-2020',
      focus: 'Specialization',
      tools: ['Figma', 'React', 'Angular', 'Design Systems']
    },
    {
      years: '2021-Present',
      focus: 'Leadership',
      tools: ['Advanced Prototyping', 'AI Integration', 'Team Management']
    }
  ];
  
  // Track by function for performance
  trackByExperienceId(index: number, experience: WorkExperience): string {
    return experience.id;
  }
}