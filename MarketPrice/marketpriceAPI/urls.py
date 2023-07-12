from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register_user, name='register'),
    path('login', views.login_user, name='login'),
    path('logout', views.logout_user, name='logout'),
    path('search/<str:product_name>', views.search, name="search"),
    path('interactions',views.interactions, name='interactions'),
    path('save_interaction/<str:product_id>', views.save_interaction, name='save_interaction'),
    path('profile_page/<str:id>', views.profile_page, name='profile_page')
]