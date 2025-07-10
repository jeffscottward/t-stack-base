# Console Logging Convention

When adding console.log statements, use the following format:

```javascript
console.log('🚀 ~ file: filename:linenumber → functionName → variableName:', variable);
```

Example:

```javascript
console.log('🚀 ~ file: auth.ts:42 → handleLogin → userData:', userData);
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