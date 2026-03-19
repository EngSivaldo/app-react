from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    # Isso define quais colunas aparecem na lista do Admin
    list_display = ('email', 'full_name', 'is_staff', 'date_joined')
    search_fields = ('email', 'full_name')