import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Specific routes for prerendering (for SEO optimization)
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'portfolio',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'experience',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  // Catch-all route for any future routes - will use SSR instead of prerendering
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
