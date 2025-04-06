from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view),
    path('register/', views.register_student, name='register_student'),
]
