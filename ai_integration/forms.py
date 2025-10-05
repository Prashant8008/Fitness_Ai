from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import CustomUser, UserProfile


class RegisterForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Create a strong password'}),
        min_length=8,
        help_text="Password must be at least 8 characters long."
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm your password'})
    )

    class Meta:
        model = CustomUser
        fields = ['phone_number', 'email', 'first_name', 'last_name', 'password']
        widgets = {
            'phone_number': forms.TextInput(attrs={'placeholder': 'Enter your phone number'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Enter your email address'}),
            'first_name': forms.TextInput(attrs={'placeholder': 'Enter your first name'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'Enter your last name'}),
        }

    def clean_phone_number(self):
        phone_number = self.cleaned_data.get('phone_number')
        if CustomUser.objects.filter(phone_number=phone_number).exists():
            raise forms.ValidationError("A user with this phone number already exists.")
        return phone_number

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and CustomUser.objects.filter(email=email).exists():
            raise forms.ValidationError("A user with this email already exists.")
        return email

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 8:
            raise forms.ValidationError("Password must be at least 8 characters long.")
        if password.isdigit():
            raise forms.ValidationError("Password cannot be entirely numeric.")
        return password

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data


class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Phone Number")
    password = forms.CharField(widget=forms.PasswordInput)


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = [
            'address', 'dob', 'gender', 'height', 'weight', 'body_fat_percentage',
            'fitness_goal', 'activity_level', 'target_weight', 'medical_conditions',
            'medications', 'allergies', 'preferred_exercise_types', 'available_equipment',
            'workout_duration', 'workout_frequency', 'dietary_restrictions', 'meal_preferences'
        ]
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Enter your address'}),
            'dob': forms.DateInput(attrs={'type': 'date'}),
            'height': forms.NumberInput(attrs={'placeholder': 'Height in cm', 'step': '0.1'}),
            'weight': forms.NumberInput(attrs={'placeholder': 'Weight in kg', 'step': '0.1'}),
            'body_fat_percentage': forms.NumberInput(attrs={'placeholder': 'Body fat %', 'step': '0.1', 'min': '0', 'max': '100'}),
            'target_weight': forms.NumberInput(attrs={'placeholder': 'Target weight in kg', 'step': '0.1'}),
            'medical_conditions': forms.Textarea(attrs={'rows': 2, 'placeholder': 'Any medical conditions or injuries'}),
            'medications': forms.Textarea(attrs={'rows': 2, 'placeholder': 'Current medications'}),
            'allergies': forms.Textarea(attrs={'rows': 2, 'placeholder': 'Food or exercise allergies'}),
            'preferred_exercise_types': forms.Textarea(attrs={'rows': 2, 'placeholder': 'e.g., cardio, strength training, yoga, swimming'}),
            'available_equipment': forms.Textarea(attrs={'rows': 2, 'placeholder': 'e.g., dumbbells, resistance bands, treadmill, none'}),
            'workout_duration': forms.NumberInput(attrs={'placeholder': 'Minutes per session', 'min': '15', 'max': '180'}),
            'workout_frequency': forms.NumberInput(attrs={'placeholder': 'Days per week', 'min': '1', 'max': '7'}),
            'dietary_restrictions': forms.Textarea(attrs={'rows': 2, 'placeholder': 'e.g., vegetarian, gluten-free, keto'}),
            'meal_preferences': forms.Textarea(attrs={'rows': 2, 'placeholder': 'e.g., 3 meals + 2 snacks, intermittent fasting'}),
        }
    
    def clean_height(self):
        height = self.cleaned_data.get('height')
        if height and (height < 50 or height > 300):
            raise forms.ValidationError("Height must be between 50 and 300 cm.")
        return height
    
    def clean_weight(self):
        weight = self.cleaned_data.get('weight')
        if weight and (weight < 20 or weight > 500):
            raise forms.ValidationError("Weight must be between 20 and 500 kg.")
        return weight
    
    def clean_body_fat_percentage(self):
        body_fat = self.cleaned_data.get('body_fat_percentage')
        if body_fat and (body_fat < 0 or body_fat > 100):
            raise forms.ValidationError("Body fat percentage must be between 0 and 100.")
        return body_fat
