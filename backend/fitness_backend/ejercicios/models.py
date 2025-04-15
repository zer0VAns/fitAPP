from django.db import models

class Ejercicio(models.Model):
  nombre = models.CharField(max_length=100)
  descripcion = models.TextField(blank=True)
  grupo_muscular = models.CharField(max_length=100)
  tecnica = models.TextField()
  errores_comunes = models.TextField()
  video_url = models.URLField(blank=True)

  def __str__(self):
    return self.nombre