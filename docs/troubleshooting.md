# Troubleshooting Guide for Beginners

## Common Issues and Solutions

### 🔴 "Command not found: pnpm"
**Solution**: Install pnpm globally
```bash
npm install -g pnpm
```

### 🔴 "Cannot find module" errors
**Solution**: Dependencies might be missing
```bash
pnpm install
```

### 🔴 "Port 3000/3001 already in use"
**Solution**: Kill the process using the port
```bash
# For Mac/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# For Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 🔴 TypeScript errors (red squiggles everywhere)
**Solution**: Restart your TypeScript server
- In VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
- Or restart your editor

### 🔴 "Permission denied" when running commands
**Solution**: You might need to use sudo (Mac/Linux)
```bash
sudo pnpm install
```

### 🔴 Git says "nothing to commit"
**Solution**: You need to stage your changes first
```bash
git add .
git status  # Check what will be committed
git commit -m "✨ feat: your message here"
```

### 🔴 "Failed to push to origin"
**Solution**: Your branch might be behind
```bash
git pull origin develop
# Fix any conflicts if they appear
git push origin develop
```

### 🔴 Tests are failing
**Common reasons**:
1. **Import errors**: Check file paths are correct
2. **Missing mocks**: Some functions need to be mocked in tests
3. **Async issues**: Use `await` for async operations
4. **Environment**: Some tests need specific env variables

### 🔴 Database connection failed
**Solution**: Make sure PostgreSQL is running
```bash
# Check if Supabase is running
cd apps/server
npx supabase status

# If not, start it
npx supabase start
```

### 🔴 "Module not found: Can't resolve '@/...'"
**Solution**: The @ symbol is an alias for the src folder
- Check the file exists in the src directory
- Make sure the import path is correct

## Getting Help

### Before Asking for Help
1. **Read the error message** - It usually tells you what's wrong
2. **Google the error** - Copy the exact error message
3. **Check existing code** - Look for similar patterns
4. **Try the basics** - Restart, reinstall, pull latest code

### How to Ask for Help
When asking for help, provide:
1. **What you're trying to do**
2. **The exact error message**
3. **What you've already tried**
4. **Relevant code snippets**

### Example Good Help Request
```
I'm trying to add a new button component but getting this error:
"Cannot find module '@/components/ui/button'"

I've tried:
- Checking the file exists (it does)
- Restarting VS Code
- Running pnpm install

Here's my import:
import { Button } from '@/components/ui/button'
```

## Useful Commands for Debugging

```bash
# Check what's running
ps aux | grep node

# Check your Node version
node --version

# Check your git status
git status

# See recent git commits
git log --oneline -5

# Check installed packages
pnpm list

# Clear all caches
pnpm store prune
rm -rf node_modules
pnpm install
```

## VS Code Extensions That Help

1. **ESLint** - Shows linting errors
2. **Prettier** - Auto-formats code
3. **GitLens** - Shows git history
4. **Error Lens** - Shows errors inline
5. **Thunder Client** - Test APIs easily

## Remember

- 🚀 **Everyone was a beginner once**
- 🤝 **No question is too basic**
- 📚 **Error messages are your friends**
- 🔄 **When in doubt, restart**
- 💪 **You've got this!**