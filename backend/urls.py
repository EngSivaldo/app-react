from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Tudo o que for autenticação (Login, Perfil, Registo)
    path('api/', include('usuarios.urls')), 
    # Tudo o que for catálogo (Listagem de produtos, Detalhes)
    path('api/products/', include('produtos.urls')), 
]