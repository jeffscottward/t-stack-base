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
import { createMachine, assign } from "xstate";

export const myMachine = createMachine({
  id: "myFeature",
  initial: "idle",
  context: {
    // Initial context
  },
  states: {
    idle: {
      on: {
        START: "active",
      },
    },
    active: {
      // State definition
    },
  },
});
```

2. Create tests in `src/state-machines/tests/`:

```typescript
import { getShortestPaths } from "xstate/graph";
import { myMachine } from "../myMachine";

describe("My Feature State Machine", () => {
  it("should cover all states", () => {
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
