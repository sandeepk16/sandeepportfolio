import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { SEOService } from '../../services/seo.service';
import { Blog } from '../../models/portfolio.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SEOService);

  blog = signal<Blog | undefined>(undefined);
  allBlogs = signal<Blog[]>([]);
  isLoading = signal<boolean>(true);
  notFound = signal<boolean>(false);

  relatedBlogs = computed<Blog[]>(() => {
    const current = this.blog();
    if (!current) return [];
    return this.allBlogs()
      .filter(b => b.id !== current.id && b.category === current.category)
      .slice(0, 3);
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (!slug) {
        this.router.navigate(['/blog']);
        return;
      }
      this.loadBlog(slug);
    });
  }

  private loadBlog(slug: string) {
    this.isLoading.set(true);
    this.notFound.set(false);
    this.portfolioService.getBlogs().subscribe({
      next: (blogs) => {
        this.allBlogs.set(blogs);
        const found = blogs.find(b => b.slug === slug);
        if (!found) {
          this.notFound.set(true);
          this.isLoading.set(false);
          return;
        }
        this.blog.set(found);
        this.isLoading.set(false);

        this.seoService.updatePageMetadata({
          title: `${found.title} | Sandeep Kandula`,
          description: found.excerpt,
          keywords: found.tags.join(', '),
          ogTitle: found.title,
          ogDescription: found.excerpt,
          ogImage: found.image,
          ogUrl: `https://sandeepkandula.com/blog/${found.slug}`,
          canonicalUrl: `/blog/${found.slug}`
        });
      },
      error: (err) => {
        console.error('Error loading blog:', err);
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  share() {
    const blog = this.blog();
    if (!blog || typeof window === 'undefined') return;
    const url = window.location.href;
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      (navigator as any).share({ title: blog.title, text: blog.excerpt, url }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  }
}
