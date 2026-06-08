#!/bin/bash
# Script to push to GitHub after downloading files

echo "🚀 Pushing Design Trends Plugin to GitHub..."
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: Not in project directory!"
    echo "Please navigate to the project folder first."
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Design Trends Prompt Appender Figma Plugin"
    git branch -M main
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
    echo "Adding GitHub remote..."
    git remote add origin https://github.com/girtonian/design-trends-prompt-appender.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 View at: https://github.com/girtonian/design-trends-prompt-appender"
else
    echo ""
    echo "❌ Push failed. You may need to authenticate with GitHub."
    echo "Try running: git push -u origin main"
fi
