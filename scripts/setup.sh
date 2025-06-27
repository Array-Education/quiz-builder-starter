#!/bin/bash

# AI Question Builder - Quick Setup Script
# Teaching Simulator Interview Starter

echo "🚀 Setting up AI Question Builder..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Setup environment file
if [ ! -f .env.local ]; then
    echo "🔧 Setting up environment file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "⚠️  Please add your OpenAI API key to .env.local"
else
    echo "✅ .env.local already exists"
fi

# Check if required environment variables are set
if [ -f .env.local ]; then
    if ! grep -q "OPENAI_API_KEY=sk-" .env.local; then
        echo "⚠️  OpenAI API key not found in .env.local"
        echo "   Please add: OPENAI_API_KEY=your_api_key_here"
    else
        echo "✅ OpenAI API key found"
    fi
fi

# Run linter to check code quality
echo "🔍 Running code quality checks..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found, but continuing..."
fi

# Run tests
echo "🧪 Running tests..."
npm test -- --passWithNoTests

if [ $? -eq 0 ]; then
    echo "✅ Tests passed"
else
    echo "⚠️  Some tests failed, but continuing..."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your OpenAI API key to .env.local"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📝 Your task: Implement AI question generation!"
echo "   - Check src/app/api/questions/generate/route.ts"
echo "   - Enable the AI button in src/components/QuestionForm.tsx"
echo ""
echo "Good luck! 🚀"