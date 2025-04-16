from rest_framework import generics
from .models import Ejercicio
from .serializers import EjercicioSerializer
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
class EjercicioList(generics.ListCreateAPIView):
  queryset = Ejercicio.objects.all()
  serializer_class = EjercicioSerializer

class EjercicioDetail(generics.RetrieveAPIView):
  queryset = Ejercicio.objects.all()
  serializer_class = EjercicioSerializer
  lookup_field = 'id'

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def perfil_usuario(request):
    payload = request.user  
    return Response({
        'mensaje': 'Token válido',
        'email': payload.get('email'),
        'sub': payload.get('sub')
    })

