#!/bin/bash

echo "🏃‍♂️ Setting up Fitness AI Mobile App..."
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if React Native CLI is installed
if ! command -v react-native &> /dev/null; then
    echo "📦 Installing React Native CLI..."
    npm install -g react-native-cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install iOS dependencies (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Installing iOS dependencies..."
    cd ios && pod install && cd ..
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p src/components
mkdir -p src/utils
mkdir -p android/app/src/main/res/values

# Create strings.xml for Android
echo "📱 Creating Android strings.xml..."
cat > android/app/src/main/res/values/strings.xml << EOF
<resources>
    <string name="app_name">Fitness AI</string>
</resources>
EOF

# Create styles.xml for Android
echo "🎨 Creating Android styles.xml..."
cat > android/app/src/main/res/values/styles.xml << EOF
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
    </style>
</resources>
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Update API URL in src/services/api.js"
echo "2. Start Metro bundler: npm start"
echo "3. Run on Android: npm run android"
echo "4. Run on iOS: npm run ios (macOS only)"
echo ""
echo "📱 Your Fitness AI mobile app is ready!"
