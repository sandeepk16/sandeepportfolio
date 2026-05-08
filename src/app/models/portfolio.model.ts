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
  category: string; // allow custom categories like 'startup-platform', 'enterprise-platform', etc.
  tags: string[];
  images: ProjectImage[];
  thumbnail: string;
  duration: string;
  client?: string;
  role: string;
  tools: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  createdDate: string;

  // Optional extended fields for detailed case studies
  problemStatement?: {
    title: string;
    content: string;
  };
  marketOpportunity?: {
    title: string;
    content: string;
  };
  userTypes?: Array<{
    type: string;
    description: string;
  }>;
  uxChallenges?: string[];
  productFlows?: string[];
  wireframes?: {
    title: string;
    content: string;
  };
  uiSystem?: {
    title: string;
    content: string;
  };
  mvpArchitecture?: {
    title: string;
    content: string;
  };
  technicalStack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    infrastructure?: string[];
    design?: string[];
  };
  businessThinking?: {
    title: string;
    content: string;
  };
  futureVision?: {
    title: string;
    content: string;
  };
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

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'code'; language: string; text: string };

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string;
  readTime: number;
  image: string;
  featured: boolean;
  content: BlogContentBlock[];
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

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface TechEcosystemItem {
  icon: string;
  iconColor: 'orange' | 'blue';
  title: string;
  description: string;
}