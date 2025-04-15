from rest_framework import serializers
from .models import Ejercicio

class EjercicioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ejercicio
    fields = ['id', 'nombre', 'descripcion', 'grupo_muscular', 'tecnica', 'errores_comunes', 'video_url']