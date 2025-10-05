from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserProfile, WorkoutSchedule, MealPlan, DailyProgress, GoalTracking

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('phone_number', 'email', 'first_name', 'last_name', 'is_staff', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('phone_number', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('phone_number', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2'),
        }),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'fitness_goal', 'activity_level', 'height', 'weight', 'get_bmi', 'created_at')
    list_filter = ('fitness_goal', 'activity_level', 'gender', 'created_at')
    search_fields = ('user__phone_number', 'user__first_name', 'user__last_name')
    readonly_fields = ('created_at', 'updated_at', 'get_bmi', 'get_age')
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Personal Information', {'fields': ('address', 'dob', 'gender')}),
        ('Physical Measurements', {'fields': ('height', 'weight', 'body_fat_percentage', 'get_bmi', 'get_age')}),
        ('Fitness Goals', {'fields': ('fitness_goal', 'activity_level', 'target_weight')}),
        ('Health Information', {'fields': ('medical_conditions', 'medications', 'allergies')}),
        ('Exercise Preferences', {'fields': ('preferred_exercise_types', 'available_equipment', 'workout_duration', 'workout_frequency')}),
        ('Dietary Information', {'fields': ('dietary_restrictions', 'meal_preferences')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

@admin.register(WorkoutSchedule)
class WorkoutScheduleAdmin(admin.ModelAdmin):
    list_display = ('user', 'workout_name', 'scheduled_date', 'scheduled_time', 'workout_type', 'is_completed')
    list_filter = ('scheduled_date', 'workout_type', 'is_completed', 'created_at')
    search_fields = ('user__phone_number', 'workout_name')
    ordering = ('-scheduled_date', 'scheduled_time')

@admin.register(MealPlan)
class MealPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'meal_name', 'meal_type', 'scheduled_date', 'scheduled_time', 'calories', 'is_consumed')
    list_filter = ('meal_type', 'scheduled_date', 'is_consumed', 'created_at')
    search_fields = ('user__phone_number', 'meal_name')
    ordering = ('-scheduled_date', 'scheduled_time')

@admin.register(DailyProgress)
class DailyProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'weight', 'calories_consumed', 'calories_burned', 'water_intake_glasses', 'steps_taken')
    list_filter = ('date', 'created_at')
    search_fields = ('user__phone_number',)
    ordering = ('-date',)

@admin.register(GoalTracking)
class GoalTrackingAdmin(admin.ModelAdmin):
    list_display = ('user', 'goal_title', 'goal_type', 'current_value', 'target_value', 'target_date', 'is_achieved')
    list_filter = ('goal_type', 'is_achieved', 'target_date', 'created_at')
    search_fields = ('user__phone_number', 'goal_title')
    ordering = ('-target_date',)
