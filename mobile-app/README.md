# 🏃‍♂️ Fitness AI - Mobile App

A React Native mobile application for your Fitness AI personal trainer system. This app provides a complete mobile experience for tracking workouts, meals, and getting AI-powered fitness advice.

## ✨ Features

- **🔐 Authentication**: Secure login and registration
- **🏠 Dashboard**: Overview of your fitness progress
- **💪 Personal Trainer**: Workout schedules and reminders
- **🍎 Meal Planning**: Track meals and nutrition
- **🤖 AI Chat**: Get personalized fitness advice
- **📊 Progress Tracking**: Visual charts and statistics
- **📱 Push Notifications**: Workout and meal reminders
- **🌙 Dark Mode**: Beautiful dark theme support

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure API endpoint**
   - Open `src/services/api.js`
   - Update `BASE_URL` to your Django server URL:
     ```javascript
     // For Android emulator
     const BASE_URL = 'http://10.0.2.2:8000';
     
     // For physical device (replace with your computer's IP)
     const BASE_URL = 'http://192.168.1.100:8000';
     ```

### Running the App

#### Android

1. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android**
   ```bash
   npm run android
   # or
   yarn android
   ```

#### iOS (macOS only)

1. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on iOS**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Theme management
├── screens/            # App screens
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   ├── DashboardScreen.js
│   ├── PersonalTrainerScreen.js
│   ├── ChatScreen.js
│   ├── WorkoutScreen.js
│   └── MealScreen.js
├── services/           # API services
│   └── api.js         # API configuration
└── utils/             # Utility functions
```

## 🔧 Configuration

### API Configuration

The app connects to your Django backend. Make sure to:

1. **Update the API URL** in `src/services/api.js`
2. **Enable CORS** in your Django settings
3. **Add API endpoints** for mobile app

### Push Notifications

To enable push notifications:

1. **Android**: Configure Firebase Cloud Messaging
2. **iOS**: Configure Apple Push Notification service

### Theming

The app supports light and dark themes. Customize colors in `src/context/ThemeContext.js`.

## 📦 Dependencies

### Core Dependencies
- `react-native`: 0.72.6
- `@react-navigation/native`: Navigation
- `react-native-paper`: UI components
- `react-native-vector-icons`: Icons
- `react-native-linear-gradient`: Gradients
- `react-native-chart-kit`: Charts
- `axios`: HTTP client

### Development Dependencies
- `@babel/core`: Babel compiler
- `metro-react-native-babel-preset`: Metro bundler
- `eslint`: Code linting

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Gradient Backgrounds**: Beautiful color gradients
- **Smooth Animations**: Fluid transitions and interactions
- **Responsive Layout**: Works on all screen sizes
- **Accessibility**: Screen reader support
- **Touch Feedback**: Visual feedback for interactions

## 🔐 Security

- **Secure Storage**: Sensitive data encrypted
- **Token-based Auth**: JWT authentication
- **API Security**: HTTPS communication
- **Input Validation**: Client and server-side validation

## 📊 Performance

- **Optimized Images**: Efficient image loading
- **Lazy Loading**: Components loaded on demand
- **Memory Management**: Proper cleanup and optimization
- **Fast Navigation**: Smooth screen transitions

## 🚀 Deployment

### Android

1. **Generate signed APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **Upload to Google Play Store**

### iOS

1. **Archive the app** in Xcode
2. **Upload to App Store Connect**

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

### Debug Mode

Enable debug mode for development:
```bash
npm start -- --reset-cache
```

## 📱 Screenshots

The app includes beautiful screens for:
- Login/Registration
- Home Dashboard
- Personal Trainer
- Workout Tracking
- Meal Planning
- AI Chat
- Progress Charts
- Profile Management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Your Fitness AI mobile app is ready to help users achieve their fitness goals! 🏃‍♂️💪**
