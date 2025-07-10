# T-Stack Base Development Guidelines

## Core Principles

- Use TypeScript for all code
- Prefer modern, well-maintained libraries
- Follow existing patterns in the codebase
- Never commit directly - use proper git flow
- Always run tests before committing

## Console Logging Convention

```javascript
console.log(
  "🚀 ~ file: filename:linenumber → functionName → variableName:",
  variable
);
```

## Frontend Stack

- **State Management**: XState for complex state machines
- **Data Fetching**: @tanstack/react-query for server state
- **UI Components**: @shadcn/ui components
- **Forms**: react-hook-form with Zod validation
- **Charts**: @shadcn/ui charts (recharts under the hood)

## Component Development

Reference: https://github.com/Kiranism/next-shadcn-dashboard-starter

- Use for dashboard layouts, data tables, forms, auth flows
- Follow shadcn/ui patterns and conventions

## Testing Requirements

- Write tests for all new features
- Tests run automatically on pre-commit
- Use Vitest for unit tests, Playwright for E2E
- See @docs/testing.md for detailed guidelines

## Database & Backend

- PostgreSQL via Supabase (local: port 54322)
- Drizzle ORM for type-safe queries
- tRPC for type-safe API endpoints
- Better-auth for authentication

## Quick Commands

```bash
pnpm dev          # Start all apps
pnpm test         # Run tests
pnpm db:studio    # Open database UI
pnpm check        # Format & lint
```

## Project Structure

```
apps/
  web/          # Frontend (Next.js, port 3001)
  server/       # Backend (Next.js + tRPC, port 3000)
packages/       # Shared packages
docs/           # Extended documentation
e2e/            # E2E tests
```

## Important URLs

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Drizzle Studio: https://local.drizzle.studio
- Supabase Studio: http://localhost:54323
- GitHub: https://github.com/jeffscottward/t-stack-base

## Extended Documentation

- @docs/git-workflow.md - Git flow and commit conventions
- @docs/testing.md - Comprehensive testing guidelines
- @docs/commands.md - All available pnpm commands

## Common Issues

1. **Port conflicts**: Kill process with `lsof -ti:PORT | xargs kill -9`
2. **TypeScript errors**: Remove unnecessary project references
3. **Test failures**: Check imports and mocks are properly configured

## Pre-commit Checklist

- [ ] Tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm check`)
- [ ] Types check (`pnpm check-types`)
- [ ] Commit message follows convention (emoji + type + scope)
