import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo } from '../models/portfolio.model';

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
  private personalInfo$: Observable<PersonalInfo>;

  constructor(private http: HttpClient) {
    this.personalInfo$ = this.http.get<{personalInfo: PersonalInfo}>('/assets/data/personal-data.json')
      .pipe(map(data => data.personalInfo));
  }

  // Get complete contact information
  getContactInfo(): Observable<ContactInfo> {
    return this.personalInfo$.pipe(
      map(personalInfo => ({
        email: personalInfo.email,
        phone: personalInfo.phone,
        location: personalInfo.location,
        address: {
          city: 'Hyderabad',
          state: 'Telangana',
          country: 'India'
        },
        socialMedia: {
          linkedin: personalInfo.linkedin,
          github: 'https://github.com/sandeepk',
          twitter: 'https://twitter.com/sandeepk_design',
          instagram: personalInfo.instagram,
          dribbble: personalInfo.dribbble || 'https://dribbble.com/sandeepk',
          behance: personalInfo.behance || 'https://behance.net/sandeepk'
        },
        businessHours: {
          timezone: 'IST (UTC+5:30)',
          workingDays: 'Monday - Friday',
          workingHours: '9:00 AM - 6:00 PM'
        }
      }))
    );
  }

  // Get specific contact details (fallback values for backward compatibility)
  getEmail(): string {
    return 'sandeepkandula16@gmail.com';
  }

  getPhone(): string {
    return '+91 9908763418';
  }

  getLocation(): string {
    return 'Hyderabad, India';
  }

  getFullAddress(): string {
    return 'Hyderabad, Telangana, India';
  }

  // Get social media links
  getSocialMediaLinks(): Observable<ContactInfo['socialMedia']> {
    return this.getContactInfo().pipe(
      map(contactInfo => contactInfo.socialMedia)
    );
  }

  // Get business information
  getBusinessHours(): Observable<ContactInfo['businessHours']> {
    return this.getContactInfo().pipe(
      map(contactInfo => contactInfo.businessHours)
    );
  }

  // Helper methods for formatted display
  getFormattedPhone(): string {
    const phone = '+91 9908763418';
    if (phone.startsWith('+91')) {
      return phone.replace('+91', '+91 ').replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return phone;
  }

  getEmailLink(): string {
    return 'mailto:sandeepkandula16@gmail.com';
  }

  getPhoneLink(): string {
    return 'tel:+919908763418';
  }

  getLocationMapLink(): string {
    return 'https://maps.google.com/?q=Hyderabad%2C%20Telangana%2C%20India';
  }

  // Get personal info observable for components to use
  getPersonalInfo(): Observable<PersonalInfo> {
    return this.personalInfo$;
  }
}