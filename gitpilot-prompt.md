# GitPilot Project Guidelines

## 🚨 CRITICAL: Existing Setup Protection Protocol

**IMPORTANT**: This Angular portfolio project has an established, working setup. Any AI assistant or developer working on this project MUST follow these guidelines to prevent disrupting the existing functionality.

## Core Principles

### 1. **PRESERVE EXISTING STRUCTURE**
- **DO NOT** modify the current folder structure without explicit request
- **DO NOT** rename or move existing files unless specifically asked
- **DO NOT** change existing component architecture
- **DO NOT** alter the current routing setup in `app.routes.ts`

### 2. **MAINTAIN CURRENT FUNCTIONALITY**
- **DO NOT** modify existing components unless specifically requested
- **DO NOT** change existing services (`portfolio.service.ts`, `contact-info.service.ts`)
- **DO NOT** alter existing data files (`personal-data.json`, `projects.json`, `additional-data.json`)
- **DO NOT** modify existing styling approaches or SCSS structure

### 3. **RESPECT CURRENT DEPENDENCIES**
- **DO NOT** update `package.json` dependencies without explicit request
- **DO NOT** change Angular version or major framework updates
- **DO NOT** add new dependencies unless specifically requested
- **DO NOT** modify build configuration in `angular.json`

## Modification Guidelines

### ✅ ALLOWED WITHOUT EXPLICIT REQUEST:
- Bug fixes that don't change existing functionality
- Code comments and documentation improvements
- Minor styling adjustments that don't break existing design
- Performance optimizations that don't change behavior
- Accessibility improvements that don't alter existing structure

### ⚠️ REQUIRES EXPLICIT USER REQUEST:
- Adding new components or pages
- Modifying existing component logic
- Changing data structure or models
- Adding new routes or navigation
- Updating dependencies or packages
- Changing build configuration
- Modifying existing styling themes
- Adding new features or functionality

### 🚫 NEVER DO WITHOUT EXPLICIT REQUEST:
- Delete existing files or components
- Change the overall project architecture
- Modify the Angular configuration
- Change the existing data flow
- Alter the current responsive design approach
- Modify existing animations or transitions

## File-Specific Protection Rules

### Configuration Files
- `angular.json` - Only modify if explicitly requested
- `package.json` - Only add dependencies if requested
- `tsconfig.*.json` - Do not modify without request

### Core Application Files
- `src/main.ts` - Do not modify
- `src/app/app.config.ts` - Do not modify
- `src/app/app.routes.ts` - Only add routes if requested
- `src/styles.scss` - Only modify if explicitly requested

### Data Files
- `src/assets/data/*.json` - Only modify content if requested
- Preserve existing data structure

### Components
- All existing components in `src/app/components/` - Preserve functionality
- All existing pages in `src/app/pages/` - Maintain current behavior

## Development Workflow

### Before Making ANY Changes:
1. **ASK FIRST**: If the request is ambiguous, ask for clarification
2. **ASSESS IMPACT**: Consider if the change affects existing functionality
3. **MINIMAL CHANGES**: Make the smallest possible change to achieve the goal
4. **TEST COMPATIBILITY**: Ensure changes don't break existing features

### When Adding New Features:
1. Create new files rather than modifying existing ones when possible
2. Use existing patterns and conventions
3. Maintain consistency with current styling and structure
4. Document any new additions

### When Fixing Issues:
1. Identify the root cause without changing working code
2. Make targeted fixes rather than broad refactoring
3. Preserve existing functionality while resolving the issue

## Communication Protocol

### Always Confirm Before:
- Making structural changes
- Adding new dependencies
- Modifying existing components significantly
- Changing data models or interfaces
- Updating build or deployment configurations

### Provide Context When:
- Suggesting improvements
- Identifying potential issues
- Recommending optimizations
- Proposing architectural changes

## Emergency Override

**ONLY** in cases where the existing setup has critical security vulnerabilities or completely broken functionality should these guidelines be overridden, and such cases must be clearly documented with justification.

## Project Context

This is a **Sandeep's Portfolio** project built with:
- Angular (latest stable version as per package.json)
- SCSS for styling
- Standalone components architecture
- Service-based data management
- Responsive design implementation

The project is functional and deployed. Any changes should enhance rather than replace the existing implementation.

---

**Remember**: When in doubt, ask the user first. It's better to seek clarification than to accidentally break a working system.

**Last Updated**: October 29, 2025
**Project Owner**: Sandeep
**Repository**: sandeepk16/sandeepportfolio