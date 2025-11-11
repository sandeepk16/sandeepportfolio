import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContactActionsComponent } from '../contact-actions/contact-actions.component';
import { PortfolioService } from '../../services/portfolio.service';
import { PersonalInfo } from '../../models/portfolio.model';

interface NavItem {
  label: string;
  routerLink: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContactActionsComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: NavItem[] = [];
  isMobileMenuOpen = signal<boolean>(false);
  personalInfo: PersonalInfo | null = null;
  
  constructor(private portfolioService: PortfolioService) {}
  
  ngOnInit() {
    // Load personal information
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
    });
    this.menuItems = [
      {
        label: 'Home',
        routerLink: ['/']
      },
      {
        label: 'About',
        routerLink: ['/about']
      },
      {
        label: 'Experience',
        routerLink: ['/experience']
      },
      {
        label: 'Work',
        routerLink: ['/portfolio']
      },
      {
        label: 'Services',
        routerLink: ['/services']
      },
      {
        label: 'Contact',
        routerLink: ['/contact']
      }
    ];
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}