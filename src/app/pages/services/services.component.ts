import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { PortfolioService } from '../../services/portfolio.service';
import { Service } from '../../models/portfolio.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule,
    ChipModule,
    DividerModule,
    SkeletonModule
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  
  services = signal<Service[]>([]);
  isLoading = signal<boolean>(true);

  // Predefined services data
  private defaultServices: Service[] = [
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'Creating intuitive and user-centered digital experiences that delight users and drive business results.',
      icon: 'pi-palette',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'User Interface Design',
        'User Experience Optimization',
        'Usability Testing',
        'Design System Creation'
      ],
      price: 'Starting from $2,500',
      duration: '2-4 weeks'
    },
    {
      id: 'web-design',
      title: 'Web Design',
      description: 'Designing responsive and modern websites that look great on all devices and provide excellent user experience.',
      icon: 'pi-globe',
      features: [
        'Responsive Web Design',
        'Landing Page Design',
        'E-commerce Design',
        'Corporate Website Design',
        'Performance Optimization',
        'SEO-Friendly Design'
      ],
      price: 'Starting from $1,800',
      duration: '1-3 weeks'
    },
    {
      id: 'mobile-app-design',
      title: 'Mobile App Design',
      description: 'Crafting beautiful and functional mobile app interfaces for iOS and Android platforms.',
      icon: 'pi-mobile',
      features: [
        'iOS App Design',
        'Android App Design',
        'Cross-platform Design',
        'App Icon Design',
        'App Store Screenshots',
        'Interaction Design'
      ],
      price: 'Starting from $3,200',
      duration: '3-5 weeks'
    },
    {
      id: 'branding-identity',
      title: 'Branding & Identity',
      description: 'Developing comprehensive brand identities that communicate your values and resonate with your audience.',
      icon: 'pi-star',
      features: [
        'Logo Design',
        'Brand Identity System',
        'Color Palette Development',
        'Typography Selection',
        'Brand Guidelines',
        'Marketing Materials'
      ],
      price: 'Starting from $2,000',
      duration: '2-3 weeks'
    },
    {
      id: 'design-consultation',
      title: 'Design Consultation',
      description: 'Expert design advice and strategic guidance to help improve your existing products or plan new ones.',
      icon: 'pi-comments',
      features: [
        'Design Audit & Review',
        'UX Strategy Planning',
        'Design System Review',
        'Team Training & Workshops',
        'Process Improvement',
        'Technology Recommendations'
      ],
      price: 'Starting from $150/hour',
      duration: 'Flexible'
    },
    {
      id: 'prototyping',
      title: 'Prototyping & Testing',
      description: 'Creating interactive prototypes and conducting usability tests to validate design concepts.',
      icon: 'pi-cog',
      features: [
        'Interactive Prototypes',
        'User Testing Sessions',
        'A/B Testing Setup',
        'Usability Reports',
        'Design Iteration',
        'Stakeholder Presentations'
      ],
      price: 'Starting from $1,200',
      duration: '1-2 weeks'
    }
  ];

  ngOnInit() {
    this.loadServices();
  }

  private loadServices() {
    // For now, use default services. In the future, this could load from an API
    setTimeout(() => {
      this.services.set(this.defaultServices);
      this.isLoading.set(false);
    }, 500);
  }

  getContactLink(): string {
    return '/contact';
  }

  // Track by function for performance
  trackByServiceId(index: number, service: Service): string {
    return service.id;
  }
}