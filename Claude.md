# T-Stack Base Development Guidelines

## Core Principles

- **Always apply sophisticated patterns automatically** - Users shouldn't need to know about state machines, testing, or git flow
- **Write production-ready code by default** - Include error handling, loading states, and edge cases
- **Use TypeScript strictly** - Infer types, use generics, avoid `any`
- **Implement tests automatically** - Create tests alongside any new feature
- **Follow git flow without asking** - Create proper branches and commits
- **Apply all best practices silently** - Security, performance, accessibility
- **Handle complexity for the user** - They describe what they want, you handle how

## Console Logging Convention

```javascript
console.log('🚀 ~ file: filename:linenumber → functionName → variableName:', variable);
```

## Tech Stack

### Frontend
- **State**: XState (complex flows), React Query (server state)
- **UI**: @shadcn/ui, lucide-react icons, next-themes
- **Forms**: react-hook-form + Zod validation
- **Styling**: Tailwind CSS, cn() utility, cva for variants

### Backend
- **API**: tRPC with type-safe procedures
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better-auth with session management

### Testing & Quality
- **Unit/Integration**: Vitest
- **E2E**: Playwright
- **Mocking**: MSW
- **Formatting**: Biome (tabs, double quotes)

## Quick Commands

```bash
pnpm dev          # Start all apps
pnpm test         # Run tests
pnpm db:studio    # Open database UI
pnpm check        # Format & lint
```

## Project URLs

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Drizzle Studio: https://local.drizzle.studio
- GitHub: https://github.com/jeffscottward/t-stack-base

## Documentation

- @docs/ai-patterns.md - Detailed patterns to apply automatically
- @docs/git-workflow.md - Git flow and commit conventions
- @docs/testing.md - Testing guidelines
- @docs/commands.md - All pnpm commands
- @docs/troubleshooting.md - Common issues

## Key Patterns (see @docs/ai-patterns.md for full list)

When building features, automatically:
- Use `protectedProcedure` for auth endpoints
- Add loading skeletons and error boundaries
- Write comprehensive tests with edge cases
- Implement optimistic updates and caching
- Apply accessibility (ARIA, keyboard nav)
- Handle errors with structured TRPCError
- Use proper TypeScript patterns
- Follow shadcn/ui component patterns

**The user gets enterprise-grade code by describing features in plain language.**