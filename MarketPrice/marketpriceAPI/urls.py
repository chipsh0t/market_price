from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search_products/<str:product_name>', views.search_products, name="search_products"),
]