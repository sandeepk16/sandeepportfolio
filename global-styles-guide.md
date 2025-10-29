# Global Styles Usage Guide

## Overview
All common styles have been moved to `src/styles.scss` to avoid duplication across components. This guide shows how to use these global styles in your components.

## Available Global Classes

### Hero Sections
```scss
// Instead of repeating hero styles in each component:
.your-hero-section {
  @extend .hero-section; // Includes padding, positioning, content layout
  
  // Add component-specific customizations here
  background: your-custom-background;
}
```

### Cards and Containers
```scss
// Glass morphism cards
.your-card {
  @extend .glass-card; // Includes background, backdrop-filter, border, transitions
}

// Form cards
.your-form {
  @extend .form-card; // Includes glass-card + form-specific padding and header styles
}

// Info cards
.your-info {
  @extend .info-card; // Includes glass-card + info-specific padding
}

// Contact info cards
.your-contact-info {
  @extend .contact-info-card; // Extends info-card with contact-specific styles
}
```

### Form Elements
```scss
// All form styles are available globally:
.form-group {
  // No need to redefine - already available globally
  
  .form-label {
    // Styles already defined globally
  }
  
  .form-input {
    // Styles already defined globally
  }
}
```

### Buttons
```scss
// Button classes available globally:
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-large">Large Button</button>
```

### Sections and Layout
```scss
// Section wrapper
.your-section {
  @extend .section; // Includes standard section padding
}

// Stats/metrics grid
.your-stats {
  @extend .stats-grid; // Includes responsive grid layout and stat item styles
}

// Layout grids
.your-grid {
  @extend .grid-2; // 2-column responsive grid
  // or
  @extend .grid-3; // 3-column responsive grid
}
```

### Contact Items
```scss
// Contact item styling is available globally
.contact-methods {
  .contact-item {
    // No need to redefine - styles available globally
  }
}
```

## Updated Component Pattern

### Before (Repetitive):
```scss
// contact.component.scss - OLD WAY
.contact-hero {
  padding: var(--section-padding-y) 0;
  position: relative;
  overflow: hidden;
  
  .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    line-height: 1.1;
    font-family: var(--font-display);
  }
  // ... 50+ lines of repeated code
}
```

### After (Clean):
```scss
// contact.component.scss - NEW WAY
.contact-hero {
  @extend .hero-section; // All common hero styles included
  
  // Only contact-specific customizations
  .contact-stats {
    @extend .stats-grid;
  }
}
```

## CSS Variables Available Globally

```scss
:root {
  // Layout
  --section-padding-y: 5rem;
  --section-padding-x: 1rem;
  
  // Border radius
  --border-radius-sm: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;
  
  // Transitions
  --transition-smooth: all 0.3s ease;
  
  // Glass effects
  --glass-bg: rgba(17, 17, 17, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: blur(20px);
  
  // Text colors
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  
  // Gradients
  --gradient-primary: linear-gradient(135deg, #ff6b35, #8b5cf6);
}
```

## Migration Guide for Other Components

### Step 1: Identify Common Patterns
Look for repeated styles like:
- Hero sections with similar structure
- Cards with glass morphism effects
- Form groups and inputs
- Button styles
- Contact/info item layouts

### Step 2: Replace with Global Classes
```scss
// Replace this:
.my-hero {
  padding: var(--section-padding-y) 0;
  // ... hero styles
}

// With this:
.my-hero {
  @extend .hero-section;
}
```

### Step 3: Keep Component-Specific Styles
Only keep styles that are unique to that component:
```scss
.about-hero {
  @extend .hero-section;
  
  // Keep only about-specific customizations
  background: radial-gradient(/* your unique background */);
  
  .profession-badge {
    // Component-specific styles
  }
}
```

## Benefits

✅ **Reduced Code Duplication**: From ~200 lines per component to ~20 lines
✅ **Consistent Styling**: All components use the same base styles
✅ **Easier Maintenance**: Change once, update everywhere
✅ **Better Performance**: Less CSS overall
✅ **Cleaner Components**: Focus on component-specific logic, not repeated styles

## Next Steps

1. Review each component for similar patterns
2. Replace duplicated code with global class extensions
3. Keep only component-specific customizations
4. Test that styling remains consistent across all pages

Remember: When in doubt, check if a style pattern exists in `styles.scss` before writing new CSS!