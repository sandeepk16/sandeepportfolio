import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  // constructor() {
  //   this.loadGoogleAnalytics();
  // }

  // private loadGoogleAnalytics(): void {
  //   if (environment.googleAnalyticsId && typeof window !== 'undefined') {
  //     // Load gtag script
  //     const script = document.createElement('script');
  //     script.async = true;
  //     script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`;
  //     document.head.appendChild(script);

  //     // Initialize gtag
  //     (window as any).dataLayer = (window as any).dataLayer || [];
  //     (window as any).gtag = function() {
  //       (window as any).dataLayer.push(arguments);
  //     };
  //     (window as any).gtag('js', new Date());
  //     (window as any).gtag('config', environment.googleAnalyticsId, {
  //       page_location: window.location.href,
  //       page_title: document.title
  //     });
  //   }
  // }


  constructor(router: Router) {
    if (typeof window === 'undefined') return;

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  // Track page views
  trackPageView(url: string, title?: string): void {
    if (environment.googleAnalyticsId && typeof gtag !== 'undefined') {
      gtag('config', environment.googleAnalyticsId, {
        page_location: url,
        page_title: title || document.title
      });
    }
  }

  // Track custom events
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (environment.googleAnalyticsId && typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // Track contact form submissions
  trackContactForm(method: string = 'email'): void {
    this.trackEvent('contact_form_submit', 'engagement', method);
  }

  // Track portfolio project views
  trackProjectView(projectName: string): void {
    this.trackEvent('project_view', 'portfolio', projectName);
  }

  // Track downloads (resume, etc.)
  trackDownload(fileName: string): void {
    this.trackEvent('file_download', 'engagement', fileName);
  }

  // Track external link clicks
  trackExternalClick(url: string, linkType: string = 'external_link'): void {
    this.trackEvent('click', linkType, url);
  }
}
