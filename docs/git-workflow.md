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

### Git Up - Smart Branch Switching

When switching branches, use this alias to ensure you're always up-to-date:

```bash
# Add this to your ~/.gitconfig or ~/.zshrc
alias git-up='git checkout main && git pull origin main && git checkout develop && git pull origin develop && git checkout -'

# Or as a git alias
git config --global alias.up '!git checkout main && git pull origin main && git checkout develop && git pull origin develop && git checkout -'
```

Usage:
```bash
# Before switching to a feature branch
git-up  # Updates main and develop, returns to current branch
git checkout feature/my-feature
```

This ensures:
- Your main branch is current with production
- Your develop branch has latest features
- You can rebase/merge cleanly without conflicts
