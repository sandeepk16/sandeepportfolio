export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  behance?: string;
  dribbble?: string;
  instagram: string;
  profileImage: string;
  bio: string;
  resumeUrl: string;
  experienceStartDate: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'design' | 'tools' | 'soft-skills';
  icon?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'ui-ux' | 'web-design' | 'mobile-app' | 'branding' | 'graphic-design';
  tags: string[];
  images: ProjectImage[];
  thumbnail: string;
  duration: string;
  client?: string;
  role: string;
  tools: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  createdDate: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  type: 'main' | 'detail' | 'mockup' | 'wireframe';
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  projectId?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  duration?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  availability: string;
  workingHours: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  thumbnail: string;
  readTime: number;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'recognition';
  issuer?: string;
  icon?: string;
}

export interface SkillEvolution {
  id: string;
  years: string;
  focus: string;
  description: string;
  tools: string[];
}