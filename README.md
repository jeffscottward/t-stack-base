# t-stack-base

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Next, TRPC, and more.

## 🚀 Quick Start for Beginners

If you're new to modern web development, don't worry! This project is set up to help you succeed.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (install with `npm install -g pnpm`)
- [Git](https://git-scm.com/downloads)
- A code editor like [VS Code](https://code.visualstudio.com/)

### First Time Setup
```bash
# 1. Clone this repository
git clone https://github.com/jeffscottward/t-stack-base.git
cd t-stack-base

# 2. Install dependencies
pnpm install

# 3. Start the development servers
pnpm dev

# 4. Open in your browser
# Frontend: http://localhost:3001
# Backend: http://localhost:3000
```

### 📚 New to This Stack?
- **Never used TypeScript?** It's just JavaScript with types. The red squiggles help prevent bugs!
- **What's a monorepo?** It's multiple related projects in one repository (see `apps/` folder)
- **What's tRPC?** It lets your frontend and backend share types automatically
- **Why all these tools?** They catch errors before users see them

### 🎯 Your First Task
1. Open `apps/web/src/app/page.tsx`
2. Change the text "BETTER T STACK" to your project name
3. Save the file and see it update instantly in your browser!
4. Run `pnpm test` to make sure nothing broke
5. Commit your change following the pattern in `docs/git-workflow.md`

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Next.js** - Full-stack React framework
- **tRPC** - End-to-end type-safe APIs
- **Node.js** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Getting Started

First, install the dependencies:

```bash
pnpm install
```
## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:
```bash
pnpm db:push
```


Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

### 🔍 Browser Development Tools (Optional)

For enhanced debugging with Claude Code AI assistant, you can run the browser tools server:

```bash
# In a separate terminal
pnpm browser-tools
```

This enables Claude Code to:
- View console logs and errors
- Inspect network requests
- Take screenshots of your application
- Run automated audits (accessibility, performance, SEO)

Make sure you have the [Claude Code Chrome Extension](https://chrome.google.com/webstore/detail/claude-code) installed for this feature to work.



## Project Structure

```
t-stack-base/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Next, TRPC)
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
- `pnpm check`: Run Biome formatting and linting
- `pnpm browser-tools`: Start browser tools server for Claude Code integration

## 🔗 Helpful Resources

### Building Data-Driven Features
When building features that require real-world data for testing or demonstration:
- **[Public APIs](https://github.com/public-apis/public-apis)** - A collective list of free APIs for use in software and web development. Great for prototyping features with real data including weather, news, sports, finance, and more.

## Instructions after bootstrapping T-Stack

```
────────────────────────────────────────────────────────────────────╮
 │                                                                    │
 │  Next steps                                                        │
 │  1. cd t-stack-base                                                │
 │  2. pnpm dev                                                       │
 │                                                                    │
 │  Your project will be available at:                                │
 │  • Frontend: http://localhost:3001                                 │
 │  • Backend API: http://localhost:3000                              │
 │                                                                    │
 │  Database commands:                                                │
 │  • Apply schema: pnpm db:push                                      │
 │  • Database UI: pnpm db:studio                                     │
 │                                                                    │
 │  Linting and formatting:                                           │
 │  • Format and lint fix: pnpm check                                 │
 │                                                                    │
 │  Update all dependencies:                                          │
 │  pnpm dlx taze -r                                                  │
 │                                                                    │
 │  Like Better-T Stack? Please consider giving us a star on GitHub:  │
 │  https://github.com/AmanVarshney01/create-better-t-stack           │
 │                                                                    │
 ╰────────────────────────────────────────────────────────────────────╯
```
