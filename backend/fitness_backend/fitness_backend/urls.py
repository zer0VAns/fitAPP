"""
URL configuration for fitness_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from ejercicios.views import EjercicioList, EjercicioDetail
from auth import views_auth

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/ejercicios/', EjercicioList.as_view(), name='ejercicio-list'),
  path('api/ejercicios/<int:id>/', EjercicioDetail.as_view(), name='ejercicio-detail'),
    path('api/register/', views_auth.register),
    path('api/login/', views_auth.login),
]
