import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

interface NavItem {
  label: string;
  routerLink: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: NavItem[] = [];
  isMobileMenuOpen = signal<boolean>(false);
  
  ngOnInit() {
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