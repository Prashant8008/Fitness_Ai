from django.urls import path
from .views import home, chat_view, login_view, register_view, profile_view, profile_dashboard, personal_trainer_view, create_sample_data
from . import views


urlpatterns = [
    path("", home, name="home"),             
    path("home/", home, name="home"),
    path("chat/", chat_view, name="chat"),    
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('dashboard/', profile_dashboard, name='dashboard'),
    path('trainer/', personal_trainer_view, name='trainer'),
    path('create-sample-data/', create_sample_data, name='create_sample_data'),
]