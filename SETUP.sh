#!/bin/bash
# AgriConnect Frontend Setup & Verification Script

echo "🚀 AgriConnect Frontend Backend Integration Setup"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📋 Verification Checklist:"
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm"
    exit 1
fi

# Check .env file
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    if grep -q "VITE_API_URL" .env; then
        API_URL=$(grep "VITE_API_URL" .env | cut -d '=' -f 2)
        echo -e "  Backend URL: $API_URL"
    fi
else
    echo -e "${RED}✗${NC} .env file not found"
    echo -e "${YELLOW}→${NC} Create .env file (refer to INTEGRATION_GUIDE.md)"
fi

echo ""
echo "📦 Dependencies Check:"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}→${NC} Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Setup verification complete!"
echo ""
echo "🏃 Next steps:"
echo "1. Ensure your Spring backend is running on http://localhost:8080"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
echo "📚 For more details, see INTEGRATION_GUIDE.md"
