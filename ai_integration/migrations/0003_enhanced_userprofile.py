# Generated manually for enhanced UserProfile

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai_integration', '0002_customuser_email_customuser_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='height',
            field=models.FloatField(blank=True, null=True, help_text='Height in cm'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='weight',
            field=models.FloatField(blank=True, null=True, help_text='Weight in kg'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='body_fat_percentage',
            field=models.FloatField(blank=True, null=True, help_text='Body fat percentage'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='fitness_goal',
            field=models.CharField(blank=True, choices=[('weight_loss', 'Weight Loss'), ('muscle_gain', 'Muscle Gain'), ('maintenance', 'Weight Maintenance'), ('endurance', 'Improve Endurance'), ('strength', 'Build Strength'), ('general_fitness', 'General Fitness')], max_length=20),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='activity_level',
            field=models.CharField(blank=True, choices=[('sedentary', 'Sedentary (little to no exercise)'), ('light', 'Light (light exercise 1-3 days/week)'), ('moderate', 'Moderate (moderate exercise 3-5 days/week)'), ('active', 'Active (heavy exercise 6-7 days/week)'), ('very_active', 'Very Active (very heavy exercise, physical job)')], max_length=20),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='target_weight',
            field=models.FloatField(blank=True, null=True, help_text='Target weight in kg'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='medical_conditions',
            field=models.TextField(blank=True, help_text='Any medical conditions or injuries'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='medications',
            field=models.TextField(blank=True, help_text='Current medications'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='allergies',
            field=models.TextField(blank=True, help_text='Food or exercise allergies'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='preferred_exercise_types',
            field=models.TextField(blank=True, help_text='Preferred types of exercise (e.g., cardio, strength training, yoga)'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='available_equipment',
            field=models.TextField(blank=True, help_text='Available equipment at home/gym'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='workout_duration',
            field=models.IntegerField(blank=True, null=True, help_text='Preferred workout duration in minutes'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='workout_frequency',
            field=models.IntegerField(blank=True, null=True, help_text='How many days per week'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='dietary_restrictions',
            field=models.TextField(blank=True, help_text='Dietary restrictions or preferences'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='meal_preferences',
            field=models.TextField(blank=True, help_text='Meal timing and frequency preferences'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default='2025-01-01 00:00:00'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
