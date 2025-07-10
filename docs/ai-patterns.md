# AI Development Patterns

This document contains detailed patterns that should be applied automatically when developing features. Users should not need to know about these patterns - they should just describe what they want and get enterprise-quality code.

## Authentication & Security

- Use `protectedProcedure` for any authenticated endpoints
- Check `session.isPending` before rendering auth-dependent UI  
- Handle auth redirects properly with useEffect dependencies
- Track session metadata (IP, user agent) for security
- Enforce password policies (min 8 chars) at all layers
- Store sensitive data in environment variables only
- Implement CORS at middleware level

## API/tRPC Patterns

- Return structured `TRPCError` with code, message, and cause
- Use `trpc.router.procedure.queryOptions()` pattern for React Query integration
- Configure HTTP batch link for network efficiency
- Separate public/protected procedure bases
- Include credentials for cross-origin auth
- Handle errors gracefully with proper status codes
- Implement request validation with Zod at procedure level

## Forms & Validation

- Use TanStack Form + Zod for all forms
- Display field-level errors immediately
- Disable submit button during submission
- Implement real-time validation on blur
- Show loading states during async operations
- Handle form reset after successful submission
- Implement proper error recovery flows

## Data Fetching & State Management

- Configure global error handling with retry actions in toasts
- Implement optimistic updates for all mutations
- Use consistent query key patterns for caching
- Add loading skeletons for all data fetches
- Separate server state (React Query) from client state (XState)
- Invalidate queries after mutations
- Handle stale-while-revalidate patterns

## Component & UX Patterns

- Always include error boundaries with fallback UI
- Add proper loading states (isPending checks)
- Implement keyboard navigation and ARIA labels
- Use CSS Grid for responsive layouts
- Follow shadcn/ui component patterns
- Conditional rendering based on auth state
- Implement proper focus management
- Add tooltips for complex interactions
- Use semantic HTML elements

## Testing Patterns

- Write tests for happy paths AND error states
- Mock external dependencies properly
- Use userEvent for realistic interactions
- Test loading states and edge cases
- Include proper TypeScript types (no any)
- Test accessibility with appropriate queries
- Mock window APIs (matchMedia, IntersectionObserver)
- Use MSW for API mocking
- Test state machines with @xstate/test

## Performance Optimizations

- Configure Turbo cache for faster builds
- Use Next.js font optimization
- Implement proper provider composition order
- Add structured console logs with context
- Use TypeScript inference over explicit types
- Implement code splitting where appropriate
- Optimize images with Next.js Image component
- Use dynamic imports for large components
- Implement virtual scrolling for long lists

## Code Quality Standards

- Use Biome for linting/formatting (not ESLint/Prettier)
- Tab indentation and double quotes
- Organize imports automatically
- Use `cn()` for merging Tailwind classes
- Create variants with cva for component states
- Follow consistent file naming conventions
- Keep components small and focused
- Extract custom hooks for reusable logic

## Environment & Configuration

- Use `@/` path alias for src imports
- Set proper env vars (NEXT_PUBLIC_SERVER_URL, DATABASE_URL, etc)
- Configure CORS for cross-origin requests
- TypeScript strict mode with verbatimModuleSyntax
- Separate development and production configurations
- Use .env.example files for documentation

## Advanced Patterns

### State Machines (XState)
- Model complex UI flows as state machines
- Generate tests from state machine models
- Use context for state machine data
- Implement guards for conditional transitions

### Database Patterns
- Use transactions for related operations
- Implement soft deletes where appropriate
- Add proper indexes for query performance
- Use prepared statements to prevent SQL injection

### Real-time Features
- Implement WebSocket connections for live updates
- Handle reconnection logic gracefully
- Optimize subscription management
- Implement proper cleanup on unmount

### Monitoring & Logging
- Add performance metrics for critical paths
- Implement error tracking for production
- Use structured logging for better debugging
- Add user action tracking for analytics