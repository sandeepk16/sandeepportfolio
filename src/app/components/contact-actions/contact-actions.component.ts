import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ContactInfoService } from '../../services/contact-info.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

export type ActionType = 'phone' | 'email' | 'whatsapp' | 'cv' | 'location' | 'all';
export type DisplayMode = 'buttons' | 'links' | 'icons' | 'minimal' | 'cards';

@Component({
  selector: 'app-contact-actions',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './contact-actions.component.html',
  styleUrls: ['./contact-actions.component.scss']
})
export class ContactActionsComponent {
  private contactInfoService = inject(ContactInfoService);
  private googleAnalytics = inject(GoogleAnalyticsService);

  @Input() actions: ActionType[] = ['all']; // Which actions to show
  @Input() displayMode: DisplayMode = 'buttons'; // How to display them
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showLabels: boolean = true;
  @Input() className: string = '';

  // Contact information
  getPhone(): string {
    return this.contactInfoService.getPhone();
  }

  getEmail(): string {
    return this.contactInfoService.getEmail();
  }

  getPhoneLink(): string {
    return this.contactInfoService.getPhoneLink();
  }

  getEmailLink(): string {
    return this.contactInfoService.getEmailLink();
  }

  getLocation(): string {
    return this.contactInfoService.getLocation();
  }

  // Action handlers
  openPhone(): void {
    const phoneLink = this.getPhoneLink();
    this.googleAnalytics.trackExternalClick(phoneLink, 'phone_contact');
    this.openExternalLink(phoneLink);
  }

  openEmail(): void {
    const emailLink = this.getEmailLink();
    this.googleAnalytics.trackExternalClick(emailLink, 'email_contact');
    this.openExternalLink(emailLink);
  }

  openWhatsApp(): void {
    const phoneNumber = '+919908763418';
    const message = encodeURIComponent('Hi Sandeep, My name is [Your Name] and I\'d like to discuss my project with you.');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`;
    
    this.googleAnalytics.trackExternalClick(whatsappUrl, 'whatsapp_contact');
    this.openExternalLink(whatsappUrl);
  }

  downloadCV(): void {
    // For now, we'll use a placeholder CV URL
    const cvUrl = '/assets/files/sandeep-k-resume.pdf';
    this.googleAnalytics.trackExternalClick(cvUrl, 'cv_download');
    
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Sandeep_K_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openLocation(): void {
    const location = this.getLocation();
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    this.googleAnalytics.trackExternalClick(googleMapsUrl, 'location_view');
    this.openExternalLink(googleMapsUrl);
  }

  private openExternalLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Helper methods
  shouldShowAction(action: ActionType): boolean {
    return this.actions.includes('all') || this.actions.includes(action);
  }

  getActionClasses(): string {
    const baseClass = 'contact-actions';
    const classes = [
      baseClass,
      `${baseClass}--${this.displayMode}`,
      `${baseClass}--${this.orientation}`,
      `${baseClass}--${this.size}`,
      this.className
    ];
    return classes.filter(Boolean).join(' ');
  }

  getButtonClasses(actionType: string): string {
    const baseClass = 'action-btn';
    const classes = [
      baseClass,
      `${baseClass}--${actionType}`,
      `${baseClass}--${this.displayMode}`,
      `${baseClass}--${this.size}`
    ];
    return classes.filter(Boolean).join(' ');
  }
}