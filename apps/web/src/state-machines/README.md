# Model-Based Testing with State Machines

This directory contains state machine definitions and model-based tests for the frontend application. We use XState for defining state machines and @xstate/test for generating comprehensive test cases.

## Overview

Model-based testing shifts the focus from manually writing individual test cases to creating an abstract model of your application's behavior. The test framework then automatically generates test cases that explore all possible paths through your state machine.

## State Machines

### 1. Authentication Machine (`authMachine.ts`)
Handles the complete authentication flow including:
- Sign in / Sign up mode toggling
- Form validation
- Submission states
- Error handling

**States:** idle, validating, submitting, success

### 2. Dashboard Machine (`dashboardMachine.ts`)
Manages protected route access control:
- Authentication checking
- Data fetching
- Sign out flow

**States:** checkingAuth, authenticated, unauthenticated, signingOut

### 3. User Menu Machine (`userMenuMachine.ts`)
Controls the user menu dropdown behavior:
- Loading state
- Authenticated/unauthenticated views
- Dropdown open/close
- Sign out action

**States:** loading, authenticated (open/closed), unauthenticated, signingOut

### 4. Theme Machine (`themeMachine.ts`)
Simple state machine for theme toggle:
- Dropdown open/close
- Theme selection (light/dark/system)

**States:** open, closed

## Running Tests

### From the root directory:
```bash
# Run all state machine tests
pnpm test:states

# Watch mode for state machine tests
pnpm test:states:watch

# Run coverage report for all states
pnpm test:states:all
```

### From the web app directory:
```bash
cd apps/web

# Run all state machine tests
pnpm test:states

# Watch mode
pnpm test:states:watch

# Coverage report
pnpm test:states:all
```

## Benefits

1. **Comprehensive Coverage**: Automatically generates tests for all possible state transitions
2. **Reduced Maintenance**: Changes to the state machine automatically update test coverage
3. **Visual Documentation**: State machines serve as living documentation of component behavior
4. **Edge Case Discovery**: Finds paths through your application you might not have considered

## Adding New State Machines

1. Create a new state machine in `src/state-machines/`
2. Define states, events, and transitions
3. Create a test file in `src/state-machines/tests/`
4. Use `createTestModel` to generate test cases
5. Run `pnpm test:states` to verify coverage

## Example Test Output

When you run `pnpm test:states:all`, you'll see a comprehensive report showing:
- Total number of states per machine
- Number of test paths generated
- Coverage verification

This ensures that every possible user interaction and state transition is tested automatically.