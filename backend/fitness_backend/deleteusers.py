from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

users = User.objects.exclude(is_superuser=True)
Token.objects.filter(user__in=users).delete()
users.delete()
