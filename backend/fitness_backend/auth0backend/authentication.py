from jose import jwt
from rest_framework import authentication, exceptions
from django.conf import settings
import requests

class Auth0JSONWebTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get('Authorization', None)
        if not auth:
            return None

        parts = auth.split()

        if parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Authorization header must start with Bearer')
        elif len(parts) == 1:
            raise exceptions.AuthenticationFailed('Token not found')
        elif len(parts) > 2:
            raise exceptions.AuthenticationFailed('Authorization header must be Bearer token')

        token = parts[1]
        try:
            header = jwt.get_unverified_header(token)
            jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
            jwks = requests.get(jwks_url).json()
            rsa_key = {}
            for key in jwks['keys']:
                if key['kid'] == header['kid']:
                    rsa_key = {
                        'kty': key['kty'],
                        'kid': key['kid'],
                        'use': key['use'],
                        'n': key['n'],
                        'e': key['e']
                    }
            if rsa_key:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=['RS256'],
                    audience=settings.API_IDENTIFIER,
                    issuer=f"https://{settings.AUTH0_DOMAIN}/"
                )
                return (payload, token)
        except Exception as e:
            raise exceptions.AuthenticationFailed(f"Token inválido: {str(e)}")

        raise exceptions.AuthenticationFailed('No se pudo autenticar el token')
