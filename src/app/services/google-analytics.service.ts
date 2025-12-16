import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(router: Router) {
    if (typeof window === 'undefined') return;

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

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


  // Track page views (SPA routing)
  trackPageView(path: string): void {
    if (!environment.googleAnalyticsId || typeof gtag === 'undefined') return;

    gtag('config', environment.googleAnalyticsId, {
      page_path: path
    });
  }

  // Generic GA4 event tracking
  trackEvent(eventName: string, params?: Record<string, any>): void {
    if (!environment.googleAnalyticsId || typeof gtag === 'undefined') return;

    gtag('event', eventName, params);
  }

  // Contact form submission
  trackContactForm(method: string = 'email'): void {
    this.trackEvent('contact_form_submit', { method });
  }

  // Portfolio project view
  trackProjectView(projectName: string): void {
    this.trackEvent('project_view', { project_name: projectName });
  }

  // File download
  trackDownload(fileName: string): void {
    this.trackEvent('file_download', { file_name: fileName });
  }

  // External link click
  trackExternalClick(url: string): void {
    this.trackEvent('external_click', { url });
  }
}
