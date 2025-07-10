# Complete pnpm Commands Reference

## Development Commands

```bash
# Start all applications (frontend + backend)
pnpm dev

# Start specific applications
pnpm dev:web       # Frontend only (http://localhost:3001)
pnpm dev:server    # Backend only (http://localhost:3000)
pnpm dev:native    # Native app (if applicable)

# Browser tools for Claude Code integration
pnpm browser-tools # Start browser tools server (run in separate terminal)
```

## Database Commands

```bash
# Database management
pnpm db:push       # Apply schema changes to database
pnpm db:studio     # Open Drizzle Studio (https://local.drizzle.studio)
pnpm db:generate   # Generate migration files
pnpm db:migrate    # Run database migrations
```

## Testing Commands

### Unit & Integration Tests
```bash
# From root directory
pnpm test              # Run all unit tests once
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage report
pnpm test:ui           # Open Vitest UI
pnpm test:run          # Explicitly run tests once

# E2E Tests
pnpm test:e2e          # Run Playwright E2E tests
pnpm test:e2e:ui       # Open Playwright UI
pnpm test:all          # Run all unit tests and E2E tests

# State Machine Tests
pnpm test:states       # Run all state machine tests
pnpm test:states:watch # Watch mode for state machine tests
pnpm test:states:all   # Run state coverage report

# From individual apps
cd apps/web && pnpm test    # Run web app tests
cd apps/server && pnpm test # Run server tests
```

## Build & Quality Commands

```bash
# Build
pnpm build         # Build all applications
pnpm start         # Start production builds

# Code Quality
pnpm check         # Run Biome formatting and linting
pnpm check-types   # TypeScript type checking
pnpm lint          # Run linting (Next.js specific)
```

## Git & Setup Commands

```bash
# Initial setup
pnpm install       # Install all dependencies
pnpm prepare       # Setup Husky git hooks

# Git operations (if using git-flow)
git flow feature start feature-name
git flow feature finish feature-name
git flow release start 1.0.0
git flow release finish 1.0.0
```

## Utility Commands

```bash
# Dependency management
pnpm dlx taze -r   # Update all dependencies interactively

# Process management
lsof -ti:4983 | xargs kill -9  # Kill Drizzle Studio if port in use
lsof -ti:3000 | xargs kill -9  # Kill backend if port in use
lsof -ti:3001 | xargs kill -9  # Kill frontend if port in use
```

## Command Execution Context

- **Root commands**: Run from `/Users/jeffscottward/Documents/GitHub/tools/t-stack-base/`
- **App-specific commands**: Run from `apps/web/` or `apps/server/`
- **Turbo-powered**: Most commands use Turborepo for optimized execution
- **Workspace-aware**: pnpm workspaces handle dependency management