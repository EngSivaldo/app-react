from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import UsuarioSerializer # Certifique-se que este arquivo existe

# 1. View para Login
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'fullName': user.full_name,
                    'email': user.email,
                    'avatar': user.avatar
                },
                'token': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        
        return Response({'message': 'E-mail ou senha inválidos'}, status=status.HTTP_401_UNAUTHORIZED)

# 2. View para Perfil (A que estava faltando!)
class ProfileView(APIView):
    permission_classes = [IsAuthenticated] # Protege a rota (precisa de Token)

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'fullName': user.full_name,
            'email': user.email,
            'avatar': user.avatar,
            'date_joined': user.date_joined
        })