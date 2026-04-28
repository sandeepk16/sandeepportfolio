import { Component, OnInit, signal, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
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
  private portfolioService = inject(PortfolioService);
  resumeUrl: string = '';
  menuItems: NavItem[] = [];
  isMobileMenuOpen = signal<boolean>(false);
  

  ngOnInit() {
    this.menuItems = [
      { label: 'Work', routerLink: ['/portfolio'] },
      { label: 'Blog', routerLink: ['/blog'] },
      { label: 'Experience', routerLink: ['/experience'] },
      { label: 'Services', routerLink: ['/services'] },
      { label: 'About', routerLink: ['/about'] }
    ];
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.resumeUrl = info.resumeUrl;
    });
  }

  downloadResume() {
    // if (this.resumeUrl) {
    //   const link = document.createElement('a');
    //   link.href = '/assets/files/Sandeep_Kandula_Senior_Product_Designer_Resume.pdf';
    //   // link.download = 'Sandeep_Kandula_Senior_Product_Designer_Resume.pdf';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }
    window.open('/assets/files/Sandeep_Kandula_Senior_Product_Designer_Resume.pdf', '_blank');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}