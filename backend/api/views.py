from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from api import utils


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


class XmlViewer(APIView):
    def get(self, request, *args, **kwargs):
        data =  """<?xml version="1.0" encoding="UTF-8"?>
                <root>
                    <element1 attribute1 = 'first attribute'>
                    </element1>
                    <element2 attribute1 = 'second attribute'>
                        some data
                    </element2>
                </root>
                """
        return Response(utils.xml_to_json(data), status=status.HTTP_200_OK)
