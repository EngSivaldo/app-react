from django.urls import path
from .views import ProdutoListView # A View que lista os produtos do Postgres

urlpatterns = [
    # Como o prefixo 'api/products/' já está no urls.py principal, 
    # o caminho vazio aqui completa a URL.
    # URL Completa: http://127.0.0.1:8000/api/products/
    path('', ProdutoListView.as_view(), name='api_products_list'),
]