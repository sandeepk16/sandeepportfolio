import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { SEOService } from '../../services/seo.service';
import { Blog } from '../../models/portfolio.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SEOService);

  blogs = signal<Blog[]>([]);
  isLoading = signal<boolean>(true);
  selectedCategory = signal<string>('');
  visibleCount = signal<number>(6);

  categories = computed(() => {
    const cats = [...new Set(this.blogs().map(b => b.category))];
    return ['', ...cats];
  });

  featuredBlog = computed<Blog | undefined>(() =>
    this.blogs().find(b => b.featured) ?? this.blogs()[0]
  );

  nonFeaturedBlogs = computed<Blog[]>(() => {
    const featuredId = this.featuredBlog()?.id;
    return this.blogs().filter(b => b.id !== featuredId);
  });

  filteredBlogs = computed<Blog[]>(() => {
    const cat = this.selectedCategory();
    const list = cat
      ? this.blogs().filter(b => b.category === cat)
      : this.nonFeaturedBlogs();
    return list;
  });

  visibleBlogs = computed<Blog[]>(() => this.filteredBlogs().slice(0, this.visibleCount()));

  hasMore = computed<boolean>(() => this.visibleCount() < this.filteredBlogs().length);

  ngOnInit() {
    this.seoService.updatePageMetadata({
      title: 'Blog - Insights & Perspective | Sandeep Kandula',
      description: 'Exploring the intersection of complex frontend systems and empathetic user experiences. Thoughts on design, code, and the future of digital products.',
      keywords: 'Blog, UX Design, Frontend, AI, Career, Design Systems, Product Design',
      ogTitle: 'Insights & Perspective - Sandeep Kandula',
      ogDescription: 'A collection of thoughts on design, code, and the future of digital products.',
      ogUrl: 'https://sandeepkandula.com/blog',
      canonicalUrl: '/blog'
    });

    this.seoService.addStructuredData(
      this.seoService.getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' }
      ])
    );

    this.portfolioService.getBlogs().subscribe({
      next: (blogs) => {
        // Sort by date desc
        const sorted = [...blogs].sort(
          (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );
        this.blogs.set(sorted);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading blogs:', err);
        this.isLoading.set(false);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
    this.visibleCount.set(6);
  }

  loadMore() {
    this.visibleCount.update(v => v + 6);
  }

  trackByBlogId(_: number, blog: Blog): string {
    return blog.id;
  }

  categoryLabel(value: string): string {
    return value === '' ? 'All Posts' : value;
  }
}
