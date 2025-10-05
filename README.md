# 💪 Fitness AI - Personalized Fitness Assistant

A comprehensive Django-based web application that provides personalized fitness advice using AI (Google Gemini) based on user's detailed fitness profile data.

## 🚀 Features

### 🔐 **Authentication System**
- **Phone Number-based Login**: Unique authentication using phone numbers
- **User Registration**: Complete user registration with validation
- **Secure Sessions**: Django's built-in session management

### 👤 **Comprehensive User Profiles**
- **Personal Information**: Address, date of birth, gender
- **Physical Measurements**: Height, weight, body fat percentage, BMI calculation
- **Fitness Goals**: Weight loss, muscle gain, endurance, strength, etc.
- **Activity Levels**: From sedentary to very active
- **Health Information**: Medical conditions, medications, allergies
- **Exercise Preferences**: Preferred types, available equipment, duration, frequency
- **Dietary Information**: Restrictions, meal preferences

### 🤖 **AI-Powered Chat Assistant**
- **Personalized Responses**: AI responses based on user's complete profile data
- **Google Gemini Integration**: Advanced AI model for fitness advice
- **Context-Aware**: Considers user's goals, constraints, and preferences
- **Safety-First**: Prioritizes medical conditions and health constraints

### 📊 **Dashboard & Analytics**
- **Fitness Overview**: Visual display of key metrics (BMI, goals, etc.)
- **Progress Tracking**: Monitor fitness journey
- **Profile Status**: Complete/incomplete profile indicators

### 🛠️ **Admin Interface**
- **User Management**: Complete user and profile administration
- **Data Analytics**: View and manage all user data
- **Search & Filter**: Advanced filtering capabilities

## 🏗️ **Technical Architecture**

### **Backend**
- **Framework**: Django 5.2.7
- **Database**: SQLite (easily configurable for PostgreSQL)
- **AI Integration**: Google Gemini 2.0 Flash
- **Authentication**: Custom user model with phone number login

### **Frontend**
- **Templates**: Django templating with responsive design
- **Styling**: Modern CSS with clean, intuitive interface
- **Forms**: Comprehensive form validation and user feedback

### **Models**
```python
CustomUser: Phone-based authentication
UserProfile: Comprehensive fitness data storage
```

## 🚀 **Quick Start**

### **Prerequisites**
- Python 3.8+
- Virtual environment
- Google Gemini API key

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd fitness_ai_web
```

2. **Create and activate virtual environment**
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install django python-dotenv google-generativeai psycopg2-binary
```

4. **Set up environment variables**
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

5. **Run migrations**
```bash
python manage.py migrate
```

6. **Create superuser**
```bash
python manage.py createsuperuser
```

7. **Start development server**
```bash
python manage.py runserver
```

8. **Access the application**
- Open browser to `http://127.0.0.1:8000`
- Register a new account or use admin credentials

## 📱 **User Flow**

### **1. Registration & Login**
- User registers with phone number, email, and basic info
- Secure login using phone number and password

### **2. Profile Creation**
- Complete fitness profile with detailed information
- Form validation ensures data accuracy
- Real-time feedback and error handling

### **3. Dashboard Overview**
- Visual summary of fitness data
- BMI calculation and health indicators
- Quick access to all features

### **4. AI Chat Interaction**
- Personalized fitness advice based on profile
- Context-aware responses
- Safety considerations for medical conditions

### **5. Profile Management**
- Edit and update fitness data
- Track changes over time
- Maintain data accuracy

## 🔧 **Configuration**

### **Database Settings**
The application is configured for SQLite by default. To use PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'fitness_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### **AI Configuration**
Set your Gemini API key in the `.env` file:
```env
GEMINI_API_KEY=your_api_key_here
```

## 📊 **Data Structure**

### **User Profile Fields**
- **Personal**: Address, DOB, Gender
- **Physical**: Height, Weight, Body Fat %, BMI
- **Goals**: Fitness Goal, Target Weight, Activity Level
- **Health**: Medical Conditions, Medications, Allergies
- **Exercise**: Preferred Types, Equipment, Duration, Frequency
- **Diet**: Restrictions, Meal Preferences

### **AI Integration**
The AI receives comprehensive user data including:
- Physical measurements and BMI
- Fitness goals and activity level
- Health constraints and medical conditions
- Exercise preferences and available equipment
- Dietary restrictions and meal preferences

## 🛡️ **Security Features**

- **CSRF Protection**: Built-in Django CSRF protection
- **Form Validation**: Comprehensive input validation
- **Secure Authentication**: Custom user model with secure password handling
- **Data Privacy**: User data is protected and not shared

## 🎯 **Use Cases**

1. **Personal Trainers**: Manage client profiles and provide personalized advice
2. **Fitness Enthusiasts**: Track progress and get AI-powered recommendations
3. **Health Coaches**: Monitor client data and provide targeted guidance
4. **Gym Members**: Get personalized workout and nutrition plans

## 🔮 **Future Enhancements**

- **Progress Tracking**: Historical data visualization
- **Goal Setting**: SMART goal management
- **Workout Plans**: AI-generated workout routines
- **Nutrition Tracking**: Meal planning and calorie tracking
- **Social Features**: Community and sharing capabilities
- **Mobile App**: React Native or Flutter mobile application

## 📝 **API Endpoints**

- `/` - Home page
- `/register/` - User registration
- `/login/` - User login
- `/logout/` - User logout
- `/profile/` - Profile management
- `/dashboard/` - User dashboard
- `/chat/` - AI chat interface
- `/admin/` - Admin interface

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Django and Google Gemini AI**
