import { Component, OnInit, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactInfoService } from '../../services/contact-info.service';
import { Observable, map } from 'rxjs';

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
  private contactInfoService = inject(ContactInfoService);

  resumeUrl$!: Observable<string>;
  socialLinks$!: Observable<SocialLink[]>;
  currentYear: number = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {
    this.resumeUrl$ = this.portfolioService.getPersonalInfo().pipe(
      map(info => info.resumeUrl)
    );

    this.socialLinks$ = this.contactInfoService.getContactInfo().pipe(
      map(info => [
        { platform: 'LinkedIn', url: info.socialMedia.linkedin, icon: 'pi pi-linkedin' },
        { platform: 'Twitter', url: info.socialMedia.twitter, icon: 'pi pi-twitter' },
        { platform: 'GitHub', url: info.socialMedia.github, icon: 'pi pi-github' },
        { platform: 'Instagram', url: info.socialMedia.instagram, icon: 'pi pi-instagram' }
      ])
    );
  }

}