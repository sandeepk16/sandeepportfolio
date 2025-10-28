import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  address: {
    street?: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
  };
  socialMedia: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
    dribbble: string;
    behance: string;
  };
  businessHours: {
    timezone: string;
    workingDays: string;
    workingHours: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  private contactInfo: ContactInfo = {
    email: 'sandeepkandula16@gmail.com',
    phone: '+91 9908763418',
    location: 'Hyderabad, India',
    address: {
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sandeepk-designer',
      github: 'https://github.com/sandeepk',
      twitter: 'https://twitter.com/sandeepk_design',
      instagram: 'https://instagram.com/sandeepk_design',
      dribbble: 'https://dribbble.com/sandeepk',
      behance: 'https://behance.net/sandeepk'
    },
    businessHours: {
      timezone: 'IST (UTC+5:30)',
      workingDays: 'Monday - Friday',
      workingHours: '9:00 AM - 6:00 PM'
    }
  };

  constructor() { }

  // Get complete contact information
  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo);
  }

  // Get specific contact details
  getEmail(): string {
    return this.contactInfo.email;
  }

  getPhone(): string {
    return this.contactInfo.phone;
  }

  getLocation(): string {
    return this.contactInfo.location;
  }

  getFullAddress(): string {
    const addr = this.contactInfo.address;
    return `${addr.city}, ${addr.state}, ${addr.country}`;
  }

  // Get social media links
  getSocialMediaLinks(): Observable<ContactInfo['socialMedia']> {
    return of(this.contactInfo.socialMedia);
  }

  // Get business information
  getBusinessHours(): Observable<ContactInfo['businessHours']> {
    return of(this.contactInfo.businessHours);
  }

  // Helper methods for formatted display
  getFormattedPhone(): string {
    // Format: +91 99087 63418
    const phone = this.contactInfo.phone;
    if (phone.startsWith('+91')) {
      return phone.replace('+91', '+91 ').replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return phone;
  }

  getEmailLink(): string {
    return `mailto:${this.contactInfo.email}`;
  }

  getPhoneLink(): string {
    return `tel:${this.contactInfo.phone}`;
  }

  getLocationMapLink(): string {
    return `https://maps.google.com/?q=${encodeURIComponent(this.getFullAddress())}`;
  }

  // Update contact information (for admin purposes)
  updateContactInfo(newContactInfo: Partial<ContactInfo>): void {
    this.contactInfo = { ...this.contactInfo, ...newContactInfo };
  }
}