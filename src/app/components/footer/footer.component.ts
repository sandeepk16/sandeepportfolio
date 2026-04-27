import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactInfoService, ContactInfo } from '../../services/contact-info.service';

interface FooterLink {
  label: string;
  routerLink: string[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  resumeUrl: string = '';
  currentYear: number = new Date().getFullYear();
  contactInfo: ContactInfo | null = null;
  
  navigationLinks: FooterLink[] = [
    { label: 'Home', routerLink: ['/'] },
    { label: 'About', routerLink: ['/about'] },
    { label: 'Experience', routerLink: ['/experience'] },
    { label: 'Portfolio', routerLink: ['/portfolio'] },
    { label: 'Services', routerLink: ['/services'] },
    { label: 'Contact', routerLink: ['/contact'] }
  ];

  quickLinks: FooterLink[] = [
    { label: 'AI Creations', routerLink: ['/portfolio'] },
    { label: 'Design Lab', routerLink: ['/services'] },
    { label: 'Prompt Engineering', routerLink: ['/services'] },
    { label: 'UI/UX Design', routerLink: ['/services'] }
  ];

  legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', routerLink: ['/privacy'] },
    { label: 'Terms of Service', routerLink: ['/terms'] },
    { label: 'Cookie Policy', routerLink: ['/cookies'] }
  ];

  socialLinks: SocialLink[] = [];

  constructor(private contactInfoService: ContactInfoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.resumeUrl = info.resumeUrl;
    });
    // Load contact information
    this.contactInfoService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
      // Set up social links from contact service
      this.socialLinks = [
        {
          platform: 'GitHub',
          url: info.socialMedia.github,
          icon: 'pi pi-github'
        },
        {
          platform: 'LinkedIn',
          url: info.socialMedia.linkedin,
          icon: 'pi pi-linkedin'
        },
        {
          platform: 'Twitter',
          url: info.socialMedia.twitter,
          icon: 'pi pi-twitter'
        },
        {
          platform: 'Instagram',
          url: info.socialMedia.instagram,
          icon: 'pi pi-instagram'
        },
        {
          platform: 'Dribbble',
          url: info.socialMedia.dribbble,
          icon: 'pi pi-circle-fill'
        },
        {
          platform: 'Behance',
          url: info.socialMedia.behance,
          icon: 'pi pi-bookmark'
        }
      ];
      this.cdr.detectChanges();
    });
  }

  downloadResume() {
    if (this.resumeUrl) {
      const link = document.createElement('a');
      link.href = this.resumeUrl;
      link.download = 'Sandeep_Kandula_Senior_Product_Designer_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Helper methods for contact information
  getEmail(): string {
    return this.contactInfoService.getEmail();
  }

  getPhone(): string {
    return this.contactInfoService.getPhone();
  }

  getLocation(): string {
    return this.contactInfoService.getLocation();
  }

  getEmailLink(): string {
    return this.contactInfoService.getEmailLink();
  }

  getPhoneLink(): string {
    return this.contactInfoService.getPhoneLink();
  }

  getLocationMapLink(): string {
    return this.contactInfoService.getLocationMapLink();
  }
}