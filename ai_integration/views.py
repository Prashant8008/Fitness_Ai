from django.http import JsonResponse
from django.conf import settings
import google.generativeai as genai
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import CustomUser, UserProfile, WorkoutSchedule, MealPlan, DailyProgress, GoalTracking
from .forms import RegisterForm, LoginForm, UserProfileForm



# Configure Gemini once
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def home(request):
    return render(request, "ai_integration/home.html")


@login_required
def chat_view(request):
    answer = None
    question = None
    user_profile = None
    
    # Get user profile data for personalized responses
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        user_profile = None
    
    if request.method == "POST":
        question = request.POST.get("question")
        if question:
            # Create personalized prompt with user data
            personalized_prompt = create_personalized_prompt(question, user_profile)
            try:
                response = model.generate_content(personalized_prompt)
                answer = response.text
            except Exception as e:
                answer = f"I apologize, but I'm having trouble processing your request right now. Please try again later. Error: {str(e)}"
    
    return render(request, "ai_integration/chat.html", {
        "answer": answer,
        "question": question,
        "user_profile": user_profile
    })

def create_personalized_prompt(question, user_profile):
    """Create a personalized prompt based on user's fitness data"""
    base_prompt = f"""You are a professional fitness and nutrition AI assistant. The user is asking: "{question}"

Please provide a comprehensive, personalized response based on their profile data. Be encouraging, specific, and actionable."""

    if user_profile:
        profile_data = f"""
USER PROFILE DATA:
- Age: {user_profile.get_age() if user_profile.get_age() else 'Not provided'}
- Gender: {user_profile.get_gender_display() if user_profile.gender else 'Not provided'}
- Height: {user_profile.height} cm
- Weight: {user_profile.weight} kg
- BMI: {user_profile.get_bmi() if user_profile.get_bmi() else 'Not calculated'}
- Body Fat: {user_profile.body_fat_percentage}%
- Fitness Goal: {user_profile.get_fitness_goal_display() if user_profile.fitness_goal else 'Not specified'}
- Activity Level: {user_profile.get_activity_level_display() if user_profile.activity_level else 'Not specified'}
- Target Weight: {user_profile.target_weight} kg
- Medical Conditions: {user_profile.medical_conditions or 'None reported'}
- Medications: {user_profile.medications or 'None reported'}
- Allergies: {user_profile.allergies or 'None reported'}
- Preferred Exercise Types: {user_profile.preferred_exercise_types or 'Not specified'}
- Available Equipment: {user_profile.available_equipment or 'Not specified'}
- Workout Duration: {user_profile.workout_duration} minutes per session
- Workout Frequency: {user_profile.workout_frequency} days per week
- Dietary Restrictions: {user_profile.dietary_restrictions or 'None'}
- Meal Preferences: {user_profile.meal_preferences or 'Not specified'}

Please tailor your response specifically to this user's profile, goals, and constraints. If they ask about exercises, consider their available equipment. If they ask about nutrition, consider their dietary restrictions and meal preferences. Always prioritize their safety and medical conditions.
"""
        return base_prompt + profile_data
    else:
        return base_prompt + "\n\nNote: The user hasn't completed their profile yet. Encourage them to fill out their profile for more personalized advice."
# login and register view 

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            messages.success(request, 'Account created successfully! Please sign in.')
            return redirect('login')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = RegisterForm()
    return render(request, 'ai_integration/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                messages.success(request, f'Welcome back, {user.first_name or user.phone_number}!')
                return redirect('home')
            else:
                messages.error(request, 'Invalid phone number or password. Please try again.')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LoginForm()
    return render(request, 'ai_integration/login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def profile_view(request):
    """View and edit user profile"""
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        profile = None
    
    if request.method == 'POST':
        if profile:
            form = UserProfileForm(request.POST, instance=profile)
        else:
            form = UserProfileForm(request.POST)
        
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile')
    else:
        if profile:
            form = UserProfileForm(instance=profile)
        else:
            form = UserProfileForm()
    
    return render(request, 'ai_integration/profile.html', {
        'form': form,
        'profile': profile
    })

@login_required
def profile_dashboard(request):
    """Personal Trainer Dashboard with daily reminders and progress"""
    from datetime import date, timedelta
    
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        profile = None
    
    today = date.today()
    
    # Get today's workouts
    today_workouts = WorkoutSchedule.objects.filter(
        user=request.user, 
        scheduled_date=today
    ).order_by('scheduled_time')
    
    # Get today's meals
    today_meals = MealPlan.objects.filter(
        user=request.user, 
        scheduled_date=today
    ).order_by('scheduled_time')
    
    # Get today's progress
    try:
        today_progress = DailyProgress.objects.get(user=request.user, date=today)
    except DailyProgress.DoesNotExist:
        today_progress = None
    
    # Get active goals
    active_goals = GoalTracking.objects.filter(
        user=request.user, 
        is_achieved=False,
        target_date__gte=today
    ).order_by('target_date')
    
    # Calculate daily calorie needs
    daily_calories = 0
    if profile and profile.weight and profile.height and profile.get_age():
        # Basic BMR calculation (Mifflin-St Jeor Equation)
        if profile.gender == 'male':
            bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.get_age() + 5
        else:
            bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.get_age() - 161
        
        # Activity multiplier
        activity_multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'very_active': 1.9
        }
        multiplier = activity_multipliers.get(profile.activity_level, 1.2)
        daily_calories = int(bmr * multiplier)
    
    # Get upcoming workouts (next 7 days)
    upcoming_workouts = WorkoutSchedule.objects.filter(
        user=request.user,
        scheduled_date__gte=today,
        scheduled_date__lte=today + timedelta(days=7)
    ).order_by('scheduled_date', 'scheduled_time')
    
    return render(request, 'ai_integration/dashboard.html', {
        'profile': profile,
        'today_workouts': today_workouts,
        'today_meals': today_meals,
        'today_progress': today_progress,
        'active_goals': active_goals,
        'daily_calories': daily_calories,
        'upcoming_workouts': upcoming_workouts,
        'today': today
    })

@login_required
def personal_trainer_view(request):
    """Main Personal Trainer Interface"""
    from datetime import date, timedelta
    
    today = date.today()
    
    # Get user profile
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        profile = None
    
    # Get today's schedule
    today_workouts = WorkoutSchedule.objects.filter(
        user=request.user, 
        scheduled_date=today
    ).order_by('scheduled_time')
    
    today_meals = MealPlan.objects.filter(
        user=request.user, 
        scheduled_date=today
    ).order_by('scheduled_time')
    
    # Get this week's schedule
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)
    
    week_workouts = WorkoutSchedule.objects.filter(
        user=request.user,
        scheduled_date__range=[week_start, week_end]
    ).order_by('scheduled_date', 'scheduled_time')
    
    week_meals = MealPlan.objects.filter(
        user=request.user,
        scheduled_date__range=[week_start, week_end]
    ).order_by('scheduled_date', 'scheduled_time')
    
    # Create week days for template
    week_days = [week_start + timedelta(days=i) for i in range(7)]
    
    return render(request, 'ai_integration/personal_trainer.html', {
        'profile': profile,
        'today_workouts': today_workouts,
        'today_meals': today_meals,
        'week_workouts': week_workouts,
        'week_meals': week_meals,
        'week_days': week_days,
        'today': today,
        'week_start': week_start,
        'week_end': week_end
    })

@login_required
def create_sample_data(request):
    """Create sample workout and meal data for demonstration"""
    from datetime import date, time, timedelta
    
    today = date.today()
    
    # Create sample workouts for the week
    sample_workouts = [
        {'name': 'Morning Cardio', 'type': 'Cardio', 'time': time(7, 0), 'duration': 30},
        {'name': 'Strength Training', 'type': 'Strength', 'time': time(18, 0), 'duration': 45},
        {'name': 'Yoga Session', 'type': 'Flexibility', 'time': time(19, 30), 'duration': 30},
        {'name': 'HIIT Workout', 'type': 'HIIT', 'time': time(7, 0), 'duration': 25},
        {'name': 'Swimming', 'type': 'Cardio', 'time': time(17, 0), 'duration': 40},
    ]
    
    # Create sample meals
    sample_meals = [
        {'name': 'Protein Oatmeal', 'type': 'breakfast', 'time': time(8, 0), 'calories': 350},
        {'name': 'Greek Yogurt', 'type': 'snack1', 'time': time(10, 30), 'calories': 150},
        {'name': 'Grilled Chicken Salad', 'type': 'lunch', 'time': time(13, 0), 'calories': 450},
        {'name': 'Apple & Almonds', 'type': 'snack2', 'time': time(15, 30), 'calories': 200},
        {'name': 'Salmon & Vegetables', 'type': 'dinner', 'time': time(19, 0), 'calories': 500},
    ]
    
    # Create workouts for next 7 days
    for i in range(7):
        workout_day = today + timedelta(days=i)
        workout = sample_workouts[i % len(sample_workouts)]
        
        WorkoutSchedule.objects.get_or_create(
            user=request.user,
            scheduled_date=workout_day,
            scheduled_time=workout['time'],
            defaults={
                'workout_name': workout['name'],
                'workout_type': workout['type'],
                'duration_minutes': workout['duration'],
                'is_completed': i < 2  # Mark first 2 days as completed
            }
        )
    
    # Create meals for next 7 days
    for i in range(7):
        meal_day = today + timedelta(days=i)
        for meal in sample_meals:
            MealPlan.objects.get_or_create(
                user=request.user,
                scheduled_date=meal_day,
                scheduled_time=meal['time'],
                meal_type=meal['type'],
                defaults={
                    'meal_name': meal['name'],
                    'calories': meal['calories'],
                    'protein': meal['calories'] * 0.3 / 4,  # Rough protein calculation
                    'carbs': meal['calories'] * 0.4 / 4,   # Rough carbs calculation
                    'fats': meal['calories'] * 0.3 / 9,    # Rough fats calculation
                    'is_consumed': i < 2  # Mark first 2 days as consumed
                }
            )
    
    messages.success(request, 'Sample data created successfully! Check your Personal Trainer page.')
    return redirect('trainer')