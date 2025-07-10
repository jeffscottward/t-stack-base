# TypeScript Migration Plan

## Current Status

The codebase has TypeScript checking infrastructure in place but currently has numerous type errors that need to be fixed. TypeScript checking in pre-commit hooks is temporarily disabled to allow development to continue.

## Setup Complete ✅

1. Added `check-types` script to both web and server packages
2. Created `.husky/pre-commit-typescript` hook (currently inactive)
3. Added `pnpm check-types:strict` command for full project type checking

## To Enable TypeScript Pre-commit Checking

Once all TypeScript errors are fixed:

1. Rename `.husky/pre-commit-typescript` to `.husky/pre-commit`
2. Or add to existing pre-commit hook:
   ```bash
   lint-staged
   pnpm check-types
   ```

## Known Issues to Fix

### Server App
- ✅ Fixed import errors in auth.test.ts
- ✅ Fixed missing vi imports in test files
- ✅ Fixed NextRequest mock in index.test.ts

### Web App (TODO)
- State machine type errors (XState v5 migration needed)
- Missing test type imports (vi, expect, describe, etc.)
- Component import/export mismatches
- React Hook Form type issues

## Commands

- `pnpm check-types` - Run TypeScript check for all packages
- `pnpm check-types:strict` - Same as above (alias)
- `cd apps/web && pnpm check-types` - Check web app only
- `cd apps/server && pnpm check-types` - Check server app only

## Migration Strategy

1. Fix test setup files first (add proper vitest imports)
2. Update XState machines to v5 syntax
3. Fix component imports/exports
4. Address form validation types
5. Enable pre-commit hook once all errors are resolved