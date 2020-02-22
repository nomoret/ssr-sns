from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect, reverse
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


class SignUpView(APIView):
    def post(self, request, format=None):

        username = request.data["username"]
        email = request.data["email"]
        password = request.data["password"]

        try:
            models.User.objects.get(username=username)
            return Response(
                data={"error": "exist username"}, status=status.HTTP_403_FORBIDDEN
            )
        except models.User.DoesNotExist:
            pass

        try:
            models.User.objects.get(email=email)
            return Response(
                data={"error": "exist email"}, status=status.HTTP_403_FORBIDDEN
            )
        except models.User.DoesNotExist:
            pass

        user = models.User.objects.create_user(username, email, password)
        user.save()

        return Response(status=status.HTTP_201_CREATED)


def log_out(request):
    print(request.headers)
    logout(request)
    return HttpResponse()
