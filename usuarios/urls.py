from django.urls import path
from .views import LoginView, ProfileView # Agora ambos existem!

urlpatterns = [
    path('login/', LoginView.as_view(), name='api_login'),
    path('profile/', ProfileView.as_view(), name='api_profile'),
]