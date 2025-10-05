@echo off
echo 🏃‍♂️ Setting up Fitness AI Mobile App...
echo ========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if React Native CLI is installed
react-native --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing React Native CLI...
    npm install -g react-native-cli
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Create necessary directories
echo 📁 Creating directories...
if not exist "src\components" mkdir src\components
if not exist "src\utils" mkdir src\utils
if not exist "android\app\src\main\res\values" mkdir android\app\src\main\res\values

REM Create strings.xml for Android
echo 📱 Creating Android strings.xml...
(
echo ^<resources^>
echo     ^<string name="app_name"^>Fitness AI^</string^>
echo ^</resources^>
) > android\app\src\main\res\values\strings.xml

REM Create styles.xml for Android
echo 🎨 Creating Android styles.xml...
(
echo ^<resources^>
echo     ^<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar"^>
echo         ^<item name="android:editTextBackground"^>@drawable/rn_edit_text_material^</item^>
echo     ^</style^>
echo ^</resources^>
) > android\app\src\main\res\values\styles.xml

echo.
echo ✅ Setup complete!
echo.
echo 🚀 Next steps:
echo 1. Update API URL in src\services\api.js
echo 2. Start Metro bundler: npm start
echo 3. Run on Android: npm run android
echo.
echo 📱 Your Fitness AI mobile app is ready!
pause
