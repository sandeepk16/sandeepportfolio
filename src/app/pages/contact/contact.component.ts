import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactInfoService, ContactInfo } from '../../services/contact-info.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { SEOService } from '../../services/seo.service';
import { PersonalInfo } from '../../models/portfolio.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private portfolioService = inject(PortfolioService);
  private contactInfoService = inject(ContactInfoService);
  private googleAnalytics = inject(GoogleAnalyticsService);
  private seoService = inject(SEOService);
  private platformId = inject(PLATFORM_ID);
  
  personalInfo = signal<PersonalInfo | null>(null);
  contactInfo = signal<ContactInfo | null>(null);
  faqData = signal<any>(null);
  isFaqActive = signal<boolean>(false);
  contactForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  isLoading = signal<boolean>(true);

  constructor() {
    // Initialize form with proper SSR handling - avoid null validators during SSR
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required, Validators.minLength(5)]),
      budget: new FormControl(''), // Optional field
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit() {
    // Update SEO metadata for contact page
    this.seoService.updatePageMetadata({
      title: 'Contact Sandeep Kandula - Get In Touch for Design Projects',
      description: 'Get in touch with Sandeep Kandula for UI/UX design projects, consultations, or collaborations. Based in Hyderabad, India. Available for projects worldwide.',
      keywords: 'Contact Designer, Hire UI/UX Designer, Design Consultation, Project Inquiry, Contact Sandeep, Hyderabad Designer Contact',
      ogTitle: 'Contact - Let\'s Create Something Amazing',
      ogDescription: 'Ready to start your next design project? Get in touch for consultations and collaborations.',
      ogImage: 'https://sandeepkandula.com/assets/images/og-contact.jpg',
      ogUrl: 'https://sandeepkandula.com/contact',
      canonicalUrl: '/contact'
    });

    // Add breadcrumb
    this.seoService.addStructuredData(
      this.seoService.getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' }
      ])
    );

    // Add ContactPage schema
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Sandeep Kandula",
      "description": "Get in touch for design projects and consultations",
      "url": "https://sandeepkandula.com/contact"
    });

    this.loadPersonalInfo();
    this.loadContactInfo();
    this.loadFaqData();
  }

  private loadPersonalInfo() {
    this.portfolioService.getPersonalInfo().subscribe({
      next: (info) => {
        this.personalInfo.set(info);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading personal info:', error);
        this.isLoading.set(false);
      }
    });
  }

  private loadContactInfo() {
    this.contactInfoService.getContactInfo().subscribe({
      next: (info) => {
        this.contactInfo.set(info);
      },
      error: (error) => {
        console.error('Error loading contact info:', error);
      }
    });
  }

  private loadFaqData() {
    this.portfolioService.getFaqData().subscribe({
      next: (faqData) => {
        this.faqData.set(faqData);
        this.isFaqActive.set(faqData.isActive);
      },
      error: (error) => {
        console.error('Error loading FAQ data:', error);
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      // Track form submission
      this.googleAnalytics.trackContactForm('contact_form');
      
      // Simulate form submission
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Message Sent!',
          detail: 'Thank you for your message. I\'ll get back to you soon!',
          life: 5000
        });
        
        this.contactForm.reset();
        this.isSubmitting.set(false);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters long.`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }

  openExternalLink(url: string) {
    window.open(url, '_blank');
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

  // Open WhatsApp with custom message
  openWhatsApp(): void {
    const phoneNumber = '+919908763418'; // Remove any formatting for WhatsApp API
    const message = encodeURIComponent('Hi Sandeep, let\'s connect to discuss on');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`;
    
    // Track WhatsApp click
    this.googleAnalytics.trackExternalClick(whatsappUrl, 'whatsapp_contact');
    
    this.openExternalLink(whatsappUrl);
  }

  // Open social media links with tracking
  openSocialLink(platform: string, url: string): void {
    if (url) {
      // Track social media click
      this.googleAnalytics.trackExternalClick(url, `social_${platform}`);
      this.openExternalLink(url);
    }
  }

  // Track by function for FAQ list performance
  trackByFaqId(index: number, faq: any): number {
    return faq.id;
  }
}