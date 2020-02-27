from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from . import models, serializers


class LoginView(APIView):
    def post(self, request, format=None):
        print(request.data)
        try:
            username = request.data["username"]
            password = request.data["password"]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = serializers.UserSerializer(user)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class ReLoginView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = serializers.UserSerializer(request.user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        print("Asada")
        return Response(status=status.HTTP_200_OK)


class SignUpView(APIView):
    def post(self, request, format=None):

        username = request.data["username"]
        email = request.data["email"]
        password = request.data["password"]

        try:
            models.User.objects.get(username=username)
            return Response(data="exist username", status=status.HTTP_403_FORBIDDEN)
        except models.User.DoesNotExist:
            pass

        try:
            models.User.objects.get(email=email)
            return Response(data="exist email", status=status.HTTP_403_FORBIDDEN)
        except models.User.DoesNotExist:
            pass

        user = models.User.objects.create_user(username, email, password)
        user.save()

        return Response(status=status.HTTP_201_CREATED)


def log_out(request):
    logout(request)
    return HttpResponse()
