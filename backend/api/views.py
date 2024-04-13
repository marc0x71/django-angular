from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions


# Create your views here.
class DataViewer(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        data = [
            {"id": 0, "name": "Sylvia Delaney"},
            {"id": 1, "name": "Ruthie Compton"},
            {"id": 2, "name": "Pickett Parks"},
        ]
        return Response(data, status=status.HTTP_200_OK)
