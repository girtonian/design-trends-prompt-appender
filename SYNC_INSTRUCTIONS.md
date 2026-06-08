# Syncing Between Cloud and Local Windows Machine

This repository is set up to sync between the cloud environment and your local Windows machine using GitHub as the intermediary.

## Setup on Your Windows Machine

### 1. Install Git (if not already installed)
Download and install Git from: https://git-scm.com/download/win

### 2. Clone the Repository
Open Command Prompt or PowerShell and run:
```bash
cd C:\Users\j_gir\GitHub
git clone https://github.com/girtonian/design-trends-prompt-appender.git
cd design-trends-prompt-appender
```

### 3. Install Dependencies
Install Node.js from https://nodejs.org (if not already installed), then:
```bash
npm install -g pnpm
pnpm install
```

## Workflow for Syncing

### From Cloud to Windows:
1. **In Cloud**: Make your changes
2. **In Cloud**: Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. **On Windows**: Pull the latest changes:
   ```bash
   git pull origin main
   ```

### From Windows to Cloud:
1. **On Windows**: Make your changes
2. **On Windows**: Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. **In Cloud**: Pull the latest changes:
   ```bash
   git pull origin main
   ```

## Quick Commands

### Cloud Environment:
- **Status**: `git status`
- **Commit all changes**: `git add . && git commit -m "your message"`
- **Push to GitHub**: `git push origin main`
- **Pull from GitHub**: `git pull origin main`

### Windows Machine:
Same commands work in Command Prompt, PowerShell, or Git Bash!

## Tips
- Always pull before starting new work to avoid conflicts
- Commit frequently with descriptive messages
- `node_modules/` is ignored - run `pnpm install` after cloning or pulling if dependencies change
- Use the push-to-github.sh script in cloud for automated pushing

## Authentication
You'll need to authenticate with GitHub:
- **Windows**: Use GitHub Desktop, GitHub CLI (`gh auth login`), or Personal Access Token
- **Cloud**: May require Personal Access Token for push access
