# 🚀 Fitness AI - Deployment Guide

## Quick Deploy to Railway (Recommended)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub account

### Step 2: Deploy from GitHub
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: `Prashant8008/Fitness_Ai`
4. Railway will automatically detect Django and deploy

### Step 3: Configure Environment Variables
In Railway dashboard, add these environment variables:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app
GEMINI_API_KEY=your-gemini-api-key
```

### Step 4: Access Your App
Your app will be available at: `https://your-app-name.railway.app`

## Alternative: Deploy to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Use these settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn fitness_ai_web.wsgi`

### Step 3: Configure Environment
Add environment variables in Render dashboard:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
GEMINI_API_KEY=your-gemini-api-key
```

## 🎯 What Your Friends Can Do

Once deployed, your friends can:
- **Register** new accounts
- **Login** to the system
- **Use Personal Trainer** features
- **Chat with AI** assistant
- **Track workouts** and meals
- **View progress** dashboard

## 📱 Mobile App Integration

The deployed web app will work with your React Native mobile app:
1. Update `mobile-app/src/services/api.js`
2. Change `BASE_URL` to your deployed URL
3. Test the mobile app with the live backend

## 🔧 Troubleshooting

### Common Issues:
1. **Static files not loading**: Run `python manage.py collectstatic`
2. **Database errors**: Check DATABASE_URL environment variable
3. **CORS errors**: Add your domain to ALLOWED_HOSTS

### Debug Mode:
Set `DEBUG=True` temporarily to see error details

## 🎉 Success!

Your Fitness AI app is now live and accessible to everyone on the web!
