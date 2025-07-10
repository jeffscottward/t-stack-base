# Git Workflow and Commit Conventions

## Git Flow Usage

This project uses Git Flow for managing branches and releases. When working on new features or fixes, follow these guidelines:

### Branch Management

1. **Main Branch**: Production-ready code
2. **Develop Branch**: Integration branch for features
3. **Feature Branches**: New features (`feature/feature-name`)
4. **Release Branches**: Prepare for production (`release/1.0.0`)
5. **Hotfix Branches**: Emergency fixes (`hotfix/critical-fix`)

### Git Flow Commands

```bash
# Start a new feature
git flow feature start feature-name

# Finish a feature (merges into develop)
git flow feature finish feature-name

# Start a release
git flow release start 1.0.0

# Finish a release (merges into main and develop)
git flow release finish 1.0.0

# Start a hotfix
git flow hotfix start critical-fix

# Finish a hotfix (merges into main and develop)
git flow hotfix finish critical-fix
```

## Commit Message Convention

Use semantic commit messages with emojis for clear, scannable history:

### Format

```
<emoji> <type>(<scope>): <subject>

<body>

<footer>
```

### Types and Emojis

- ✨ **feat**: New feature
- 🐛 **fix**: Bug fix
- 📚 **docs**: Documentation changes
- 💎 **style**: Code style changes (formatting, missing semicolons, etc.)
- ♻️ **refactor**: Code refactoring without changing functionality
- ⚡ **perf**: Performance improvements
- ✅ **test**: Adding or updating tests
- 🔧 **build**: Build system or external dependency changes
- 👷 **ci**: CI/CD configuration changes
- 🧹 **chore**: Routine tasks, maintenance
- ⏪ **revert**: Reverting a previous commit
- 🚀 **deploy**: Deployment related changes
- 🔒 **security**: Security improvements
- ♿ **a11y**: Accessibility improvements
- 🌐 **i18n**: Internationalization
- 📱 **responsive**: Responsive design changes
- 🎨 **ui**: UI/UX improvements
- 🗃️ **db**: Database related changes
- 🔊 **log**: Adding or updating logs
- 🔥 **remove**: Removing code or files
- 🚧 **wip**: Work in progress

### Examples

```bash
# Feature
git commit -m "✨ feat(auth): Add OAuth2 integration with Google

- Implement Google OAuth2 provider
- Add callback handling for auth flow
- Update user schema to support OAuth profiles
- Add tests for OAuth integration

Closes #123"

# Bug fix
git commit -m "🐛 fix(api): Resolve race condition in token refresh

Token refresh was failing when multiple requests happened simultaneously.
Implemented mutex lock to ensure single token refresh at a time.

Fixes #456"

# Performance
git commit -m "⚡ perf(dashboard): Optimize chart rendering with memoization

- Add React.memo to ChartComponent
- Implement useMemo for expensive calculations
- Reduce re-renders from 50 to 5 on data updates

Performance improved by 80%"

# Multiple changes (use the primary type)
git commit -m "♻️ refactor(components): Restructure form components for reusability

- Extract common form logic into useForm hook
- Create FormField compound component
- Update all forms to use new structure
- ✅ Add comprehensive tests for new components
- 📚 Update component documentation"
```

### Commit Message Guidelines

1. **Subject Line**:

   - Maximum 72 characters
   - Use imperative mood ("Add feature" not "Added feature")
   - Don't end with a period

2. **Body**:

   - Wrap at 72 characters
   - Explain what and why, not how
   - Include motivation for the change
   - Compare behavior before and after

3. **Footer**:
   - Reference issues: "Closes #123", "Fixes #456"
   - Breaking changes: "BREAKING CHANGE: description"
   - Co-authors: "Co-authored-by: Name <email>"

### Pre-commit Checks

Before committing, ensure:

- All tests pass: `pnpm test`
- Linting passes: `pnpm lint`
- Type checking passes: `pnpm check-types`
- Build succeeds: `pnpm build`

### Working with Features

When starting a new feature:

```bash
# 1. Ensure you're on develop
git checkout develop
git pull origin develop

# 2. Start a new feature
git flow feature start my-awesome-feature

# 3. Work on your feature, make commits following the convention
git add .
git commit -m "✨ feat(module): Add awesome functionality"

# 4. Keep your feature branch updated
git checkout develop
git pull origin develop
git checkout feature/my-awesome-feature
git merge develop

# 5. When ready, finish the feature
git flow feature finish my-awesome-feature
```

# Console Logging Convention

When adding console.log statements, use the following format:

```javascript
console.log(
  "🚀 ~ file: filename:linenumber → functionName → variableName:",
  variable
);
```

Example:

```javascript
console.log("🚀 ~ file: auth.ts:42 → handleLogin → userData:", userData);
```

# Frontend Development Guidelines

Always defer to our state-of-the-art Node modules for frontend code:

- **State Management**: Use XState for complex state machines and state management
- **Data Fetching**: Use @tanstack/react-query for server state management and caching
- **UI Components**: Use @shadcn/ui components
- **Forms**: Use react-hook-form with Zod for validation
- **Charts/Visualization**: Use @shadcn/ui charts (which uses recharts under the hood)

If a specific tool or library isn't already available in the project, suggest modern, well-maintained alternatives based on the task requirements.

## Component Development Reference

When building dashboard components, layouts, or UI patterns, use web search to explore this repository for ideas and best practices:
https://github.com/Kiranism/next-shadcn-dashboard-starter

This repository provides excellent examples and patterns for:

- Dashboard layouts and navigation
- Data tables and lists
- Forms and input components
- Authentication flows
- Responsive design patterns
- shadcn/ui component usage examples

# Testing Guidelines

## Testing Stack

- **Unit & Integration Testing**: Vitest
- **Component Testing**: React Testing Library + Testing Library User Event
- **E2E Testing**: Playwright (includes visual regression capabilities)
- **API Mocking**: MSW (Mock Service Worker)
- **Coverage**: Vitest with v8 coverage provider

## Running Tests

### From Root Directory

- `pnpm test` - Run all unit tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm test:ui` - Open Vitest UI
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm test:e2e:ui` - Open Playwright UI
- `pnpm test:all` - Run all unit tests and E2E tests

### From Individual Apps

- `cd apps/web && pnpm test` - Run web app tests
- `cd apps/server && pnpm test` - Run server tests

## Pre-commit Hooks

Tests are automatically run on changed files during pre-commit via Husky and lint-staged. This ensures:

- No broken tests are committed
- Code quality is maintained
- Fast feedback loop for developers

## Writing Tests

### Frontend Component Tests

Place test files next to the components they test with `.test.tsx` extension:

```
src/components/button.tsx
src/components/button.test.tsx
```

### Backend Tests

Place test files next to the code they test with `.test.ts` extension:

```
src/routers/index.ts
src/routers/index.test.ts
```

### E2E Tests

Place E2E tests in the `/e2e` directory at the root:

```
e2e/auth.spec.ts
e2e/homepage.spec.ts
```

## Test Best Practices

1. Write tests that focus on user behavior, not implementation details
2. Use data-testid sparingly; prefer semantic queries (role, label, text)
3. Mock external dependencies (APIs, databases) in unit tests
4. Use MSW for API mocking to test closer to production behavior
5. Keep tests isolated and independent
6. Aim for meaningful coverage, not 100% coverage

## Model-Based Testing with XState

We use XState for model-based testing to automatically generate comprehensive test cases from state machine definitions.

### State Machine Testing Commands

From the root directory:
- `pnpm test:states` - Run all state machine tests
- `pnpm test:states:watch` - Watch mode for state machine tests
- `pnpm test:states:all` - Run state coverage report

### Available State Machines

Located in `apps/web/src/state-machines/`:

1. **authMachine.ts** - Authentication flow (login/signup)
2. **dashboardMachine.ts** - Protected route access control
3. **userMenuMachine.ts** - User menu dropdown states
4. **themeMachine.ts** - Theme toggle functionality

### Creating New State Machines

1. Define your state machine in `src/state-machines/`:
```typescript
import { createMachine, assign } from 'xstate';

export const myMachine = createMachine({
  id: 'myFeature',
  initial: 'idle',
  context: {
    // Initial context
  },
  states: {
    idle: {
      on: {
        START: 'active'
      }
    },
    active: {
      // State definition
    }
  }
});
```

2. Create tests in `src/state-machines/tests/`:
```typescript
import { getShortestPaths } from 'xstate/graph';
import { myMachine } from '../myMachine';

describe('My Feature State Machine', () => {
  it('should cover all states', () => {
    const paths = getShortestPaths(myMachine);
    expect(Object.keys(paths).length).toBeGreaterThan(0);
  });
});
```

### Benefits of Model-Based Testing

- **Automatic Test Generation**: Tests are generated from state machine definitions
- **Complete Coverage**: All possible state transitions are tested
- **Living Documentation**: State machines serve as visual documentation
- **Reduced Maintenance**: Update the model, tests update automatically
