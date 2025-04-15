# backend/load_ejercicios.py
import json
from ejercicios.models import Ejercicio
from django.db import connection

try:
  print("Abriendo archivo JSON...")
  with open('../../src/data/baseDatosEjercicios.json', 'r', encoding='utf-8') as file:
    ejercicios = json.load(file)
    print(f"Se encontraron {len(ejercicios)} ejercicios en el JSON.")

  print("Eliminando datos existentes...")
  Ejercicio.objects.all().delete()
  print("Datos eliminados.")

  # Reinicia la secuencia de IDs para que comience después del último ID del JSON
  print("Reiniciando secuencia de IDs...")
  max_id = max(ej['ID'] for ej in ejercicios)  # Encuentra el ID más alto en el JSON
  next_id = max_id + 1  # El siguiente ID disponible
  with connection.cursor() as cursor:
    cursor.execute(f"ALTER SEQUENCE ejercicios_ejercicio_id_seq RESTART WITH {next_id};")
  print(f"Secuencia reiniciada para comenzar desde {next_id}.")

  print("Cargando nuevos ejercicios...")
  for ej in ejercicios:
    Ejercicio.objects.update_or_create(
      id=ej['ID'],  # Usa el ID del JSON
      defaults={
        'nombre': ej['Nombre'],
        'descripcion': ej.get('Descripcion', ''),
        'grupo_muscular': ej['Grupo Muscular'],
        'tecnica': ej.get('Tecnica', ''),
        'errores_comunes': ej.get('Errores Comunes', '') or ej.get('ErroresComunes', ''),
        'video_url': ej.get('VideosURL', '')
      }
    )
    print(f"Ejercicio cargado: {ej['Nombre']} con ID {ej['ID']}")

  print(f"Se procesaron {len(ejercicios)} ejercicios exitosamente.")
except Exception as e:
  print(f"Error al cargar los ejercicios: {e}")