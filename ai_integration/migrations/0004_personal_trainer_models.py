# Generated manually for Personal Trainer features

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ai_integration', '0003_enhanced_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkoutSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('workout_name', models.CharField(max_length=100)),
                ('scheduled_date', models.DateField()),
                ('scheduled_time', models.TimeField()),
                ('duration_minutes', models.IntegerField()),
                ('workout_type', models.CharField(max_length=50)),
                ('is_completed', models.BooleanField(default=False)),
                ('notes', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ai_integration.customuser')),
            ],
        ),
        migrations.CreateModel(
            name='MealPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meal_type', models.CharField(choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner'), ('snack1', 'Morning Snack'), ('snack2', 'Afternoon Snack'), ('snack3', 'Evening Snack')], max_length=20)),
                ('scheduled_date', models.DateField()),
                ('scheduled_time', models.TimeField()),
                ('meal_name', models.CharField(max_length=100)),
                ('calories', models.IntegerField()),
                ('protein', models.FloatField(default=0)),
                ('carbs', models.FloatField(default=0)),
                ('fats', models.FloatField(default=0)),
                ('is_consumed', models.BooleanField(default=False)),
                ('notes', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ai_integration.customuser')),
            ],
        ),
        migrations.CreateModel(
            name='DailyProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(unique=True)),
                ('weight', models.FloatField(blank=True, null=True)),
                ('calories_consumed', models.IntegerField(default=0)),
                ('calories_burned', models.IntegerField(default=0)),
                ('water_intake_glasses', models.IntegerField(default=0)),
                ('steps_taken', models.IntegerField(default=0)),
                ('mood_rating', models.IntegerField(blank=True, choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10)], null=True)),
                ('notes', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ai_integration.customuser')),
            ],
        ),
        migrations.CreateModel(
            name='GoalTracking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goal_type', models.CharField(choices=[('weight_loss', 'Weight Loss'), ('muscle_gain', 'Muscle Gain'), ('endurance', 'Endurance'), ('strength', 'Strength'), ('flexibility', 'Flexibility'), ('nutrition', 'Nutrition')], max_length=20)),
                ('goal_title', models.CharField(max_length=100)),
                ('target_value', models.FloatField()),
                ('current_value', models.FloatField(default=0)),
                ('target_date', models.DateField()),
                ('is_achieved', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ai_integration.customuser')),
            ],
        ),
    ]
