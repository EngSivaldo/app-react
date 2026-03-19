from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    # Campos customizados para o seu sistema "Top"
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    avatar = models.URLField(
        default="https://ui-avatars.com/api/?name=User", 
        max_length=500
    )

    # Configura o e-mail como campo de login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.full_name