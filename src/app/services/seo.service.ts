import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean = false;

  private defaultConfig: Partial<SEOConfig> = {
    author: 'Sandeep Kandula',
    keywords: 'UI/UX Designer, Web Developer, Angular Developer, Frontend Developer, Portfolio',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow'
  };

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Track route changes for analytics - only in browser
    if (this.isBrowser) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.updateCanonicalUrl(event.urlAfterRedirects);
        });
    }
  }

  updatePageMetadata(config: SEOConfig): void {
    // Merge with default config
    const fullConfig = { ...this.defaultConfig, ...config };

    // Update title
    this.titleService.setTitle(fullConfig.title);

    // Update standard meta tags
    this.updateOrCreateTag('name', 'description', fullConfig.description);
    if (fullConfig.keywords) {
      this.updateOrCreateTag('name', 'keywords', fullConfig.keywords);
    }
    if (fullConfig.author) {
      this.updateOrCreateTag('name', 'author', fullConfig.author);
    }
    if (fullConfig.robots) {
      this.updateOrCreateTag('name', 'robots', fullConfig.robots);
    }

    // Update Open Graph tags
    this.updateOrCreateTag('property', 'og:title', fullConfig.ogTitle || fullConfig.title);
    this.updateOrCreateTag('property', 'og:description', fullConfig.ogDescription || fullConfig.description);
    this.updateOrCreateTag('property', 'og:type', fullConfig.ogType || 'website');
    if (fullConfig.ogUrl) {
      this.updateOrCreateTag('property', 'og:url', fullConfig.ogUrl);
    }
    if (fullConfig.ogImage) {
      this.updateOrCreateTag('property', 'og:image', fullConfig.ogImage);
      this.updateOrCreateTag('property', 'og:image:alt', fullConfig.ogTitle || fullConfig.title);
    }

    // Update Twitter Card tags
    this.updateOrCreateTag('name', 'twitter:card', fullConfig.twitterCard || 'summary_large_image');
    this.updateOrCreateTag('name', 'twitter:title', fullConfig.twitterTitle || fullConfig.title);
    this.updateOrCreateTag('name', 'twitter:description', fullConfig.twitterDescription || fullConfig.description);
    if (fullConfig.twitterImage) {
      this.updateOrCreateTag('name', 'twitter:image', fullConfig.twitterImage);
    }

    // Update canonical URL
    if (fullConfig.canonicalUrl) {
      this.updateCanonicalUrl(fullConfig.canonicalUrl);
    }
  }

  private updateOrCreateTag(attrSelector: string, attrValue: string, content: string): void {
    const selector = `${attrSelector}="${attrValue}"`;
    const existingTag = this.meta.getTag(selector);
    
    if (existingTag) {
      this.meta.updateTag({ [attrSelector]: attrValue, content });
    } else {
      this.meta.addTag({ [attrSelector]: attrValue, content });
    }
  }

  private updateCanonicalUrl(url: string): void {
    // Only update canonical URL in browser
    if (!this.isBrowser) {
      return;
    }

    const head = document.getElementsByTagName('head')[0];
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      head.appendChild(canonical);
    }
    
    const baseUrl = window.location.origin;
    canonical.setAttribute('href', baseUrl + url);
  }

  // Schema.org structured data
  addStructuredData(data: any): void {
    // Only add structured data in browser
    if (!this.isBrowser) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Generate Person schema for portfolio
  getPersonSchema(): any {
    const origin = this.isBrowser ? window.location.origin : 'https://sandeepkandula.com';
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sandeep Kandula",
      "jobTitle": "Senior UI/UX Designer & Developer",
      "url": origin,
      "sameAs": [
        "https://www.linkedin.com/in/sandeepkandula",
        "https://github.com/sandeepk16"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "India"
      },
      "email": "sandeepkandula16@gmail.com",
      "telephone": "+919908763418",
      "knowsAbout": ["UI/UX Design", "Web Development", "Angular", "React", "Mobile App Design"],
      "alumniOf": {
        "@type": "Organization",
        "name": "Your University" // Update with actual education
      }
    };
  }

  // Generate Website schema
  getWebsiteSchema(): any {
    const origin = this.isBrowser ? window.location.origin : 'https://sandeepkandula.com';
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Sandeep Kandula - UI/UX Designer Portfolio",
      "url": origin,
      "description": "Professional UI/UX Designer and Developer specializing in creating exceptional digital experiences",
      "author": {
        "@type": "Person",
        "name": "Sandeep Kandula"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": origin + "/portfolio?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  }

  // Generate Breadcrumb schema
  getBreadcrumbSchema(items: { name: string; url: string }[]): any {
    const origin = this.isBrowser ? window.location.origin : 'https://sandeepkandula.com';
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": origin + item.url
      }))
    };
  }
}
