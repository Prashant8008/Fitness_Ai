from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

# 1️⃣ Custom User model
class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number required")
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(phone_number, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.phone_number

# 2️⃣ User profile model with comprehensive fitness data
class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    
    ACTIVITY_LEVEL_CHOICES = [
        ('sedentary', 'Sedentary (little to no exercise)'),
        ('light', 'Light (light exercise 1-3 days/week)'),
        ('moderate', 'Moderate (moderate exercise 3-5 days/week)'),
        ('active', 'Active (heavy exercise 6-7 days/week)'),
        ('very_active', 'Very Active (very heavy exercise, physical job)'),
    ]
    
    GOAL_CHOICES = [
        ('weight_loss', 'Weight Loss'),
        ('muscle_gain', 'Muscle Gain'),
        ('maintenance', 'Weight Maintenance'),
        ('endurance', 'Improve Endurance'),
        ('strength', 'Build Strength'),
        ('general_fitness', 'General Fitness'),
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
    # Personal Information
    address = models.TextField(blank=True)
    dob = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    
    # Physical Measurements
    height = models.FloatField(blank=True, null=True, help_text="Height in cm")
    weight = models.FloatField(blank=True, null=True, help_text="Weight in kg")
    body_fat_percentage = models.FloatField(blank=True, null=True, help_text="Body fat percentage")
    
    # Fitness Goals & Activity
    fitness_goal = models.CharField(max_length=20, choices=GOAL_CHOICES, blank=True)
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES, blank=True)
    target_weight = models.FloatField(blank=True, null=True, help_text="Target weight in kg")
    
    # Health Information
    medical_conditions = models.TextField(blank=True, help_text="Any medical conditions or injuries")
    medications = models.TextField(blank=True, help_text="Current medications")
    allergies = models.TextField(blank=True, help_text="Food or exercise allergies")
    
    # Exercise Preferences
    preferred_exercise_types = models.TextField(blank=True, help_text="Preferred types of exercise (e.g., cardio, strength training, yoga)")
    available_equipment = models.TextField(blank=True, help_text="Available equipment at home/gym")
    workout_duration = models.IntegerField(blank=True, null=True, help_text="Preferred workout duration in minutes")
    workout_frequency = models.IntegerField(blank=True, null=True, help_text="How many days per week")
    
    # Dietary Information
    dietary_restrictions = models.TextField(blank=True, help_text="Dietary restrictions or preferences")
    meal_preferences = models.TextField(blank=True, help_text="Meal timing and frequency preferences")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.phone_number} - {self.fitness_goal}"
    
    def get_bmi(self):
        if self.height and self.weight:
            height_m = self.height / 100
            return round(self.weight / (height_m ** 2), 2)
        return None
    
    def get_age(self):
        if self.dob:
            from datetime import date
            today = date.today()
            return today.year - self.dob.year - ((today.month, today.day) < (self.dob.month, self.dob.day))
        return None

# 3️⃣ Workout Schedule Model
class WorkoutSchedule(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    workout_name = models.CharField(max_length=100)
    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()
    duration_minutes = models.IntegerField()
    workout_type = models.CharField(max_length=50)
    is_completed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.phone_number} - {self.workout_name} on {self.scheduled_date}"

# 4️⃣ Meal Plan Model
class MealPlan(models.Model):
    MEAL_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snack1', 'Morning Snack'),
        ('snack2', 'Afternoon Snack'),
        ('snack3', 'Evening Snack'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    meal_type = models.CharField(max_length=20, choices=MEAL_CHOICES)
    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()
    meal_name = models.CharField(max_length=100)
    calories = models.IntegerField()
    protein = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fats = models.FloatField(default=0)
    is_consumed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.phone_number} - {self.meal_name} ({self.meal_type})"

# 5️⃣ Daily Progress Model
class DailyProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField(unique=True)
    weight = models.FloatField(null=True, blank=True)
    calories_consumed = models.IntegerField(default=0)
    calories_burned = models.IntegerField(default=0)
    water_intake_glasses = models.IntegerField(default=0)
    steps_taken = models.IntegerField(default=0)
    mood_rating = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.phone_number} - {self.date}"

# 6️⃣ Goal Tracking Model
class GoalTracking(models.Model):
    GOAL_TYPES = [
        ('weight_loss', 'Weight Loss'),
        ('muscle_gain', 'Muscle Gain'),
        ('endurance', 'Endurance'),
        ('strength', 'Strength'),
        ('flexibility', 'Flexibility'),
        ('nutrition', 'Nutrition'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES)
    goal_title = models.CharField(max_length=100)
    target_value = models.FloatField()
    current_value = models.FloatField(default=0)
    target_date = models.DateField()
    is_achieved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.phone_number} - {self.goal_title}"
