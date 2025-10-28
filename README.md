# # Sandeep K - UI/UX Designer Portfolio

A modern, responsive portfolio website built with Angular 17+, PrimeNG UI components, and PrimeFlex utilities showcasing the work and expertise of UI/UX Designer Sandeep K.

## 🚀 Features

- **Modern Angular Application**: Built with Angular 17+ using standalone components
- **PrimeNG Components**: Utilizes PrimeNG UI library for professional components
- **PrimeFlex Utilities**: Responsive design with PrimeFlex CSS utilities
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Portfolio Showcase**: Comprehensive display of projects, skills, and experience
- **JSON-Driven Content**: Dynamic content management through JSON data files
- **Reusable Components**: Modular component architecture for maintainability

## 🛠️ Technology Stack

- **Framework**: Angular 17+ (Standalone Components)
- **UI Library**: PrimeNG
- **CSS Framework**: PrimeFlex + Custom SCSS
- **Icons**: PrimeIcons
- **Build Tool**: Angular CLI
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/         # Navigation header
│   │   ├── project-card/   # Project display card
│   │   └── skills-section/ # Skills showcase
│   ├── pages/              # Page components
│   │   └── home/          # Homepage component
│   ├── services/          # Data services
│   │   └── portfolio.service.ts
│   ├── models/           # TypeScript interfaces
│   │   └── portfolio.model.ts
│   └── assets/
│       └── data/         # JSON data files
│           ├── personal-data.json
│           ├── projects.json
│           └── additional-data.json
```

## 🎨 Key Components

### Header Component
- Responsive navigation with PrimeNG MenuBar
- Logo/branding with avatar
- Download CV and contact actions
- Mobile-responsive design

### Project Card Component
- Reusable project showcase cards
- Category tagging and filtering
- Featured project highlighting
- Responsive image galleries

### Skills Section Component
- Categorized skill display (Design, Tools, Soft Skills)
- Progress bars with skill levels
- Interactive skill ratings
- Responsive grid layout

### Home Page
- Hero section with personal introduction
- Portfolio statistics
- Featured projects showcase
- Skills overview
- Call-to-action section

## 💾 Data Structure

The portfolio content is managed through structured JSON files:

- **personal-data.json**: Personal information, skills, experience, education
- **projects.json**: Project portfolio with detailed case studies
- **additional-data.json**: Testimonials, services, achievements

## 🎯 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Color Scheme**: Custom CSS variables for consistent theming
- **Typography**: Inter font family for excellent readability
- **Animations**: Smooth transitions and hover effects
- **Mobile-First**: Responsive design across all devices

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.8.andeepPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
