import asyncio
from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from django.views import View
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
        template = loader.get_template("example.xml")
        context = {
            "first": "first attribute",
            "second": "second attribute",
            "data": [
                {"id": 0, "name": "Sylvia Delaney"},
                {"id": 1, "name": "Ruthie Compton"},
                {"id": 2, "name": "Pickett Parks"},
            ],
        }
        return HttpResponse(
            utils.xml_pretty(template.render(context, request)), status=status.HTTP_200_OK
        )


class Xml2JsonViewer(APIView):
    def get(self, request, *args, **kwargs):
        template = loader.get_template("example.xml")
        context = {
            "first": "first attribute",
            "second": "second attribute",
            "data": [
                {"id": 0, "name": "Sylvia Delaney"},
                {"id": 1, "name": "Ruthie Compton"},
                {"id": 2, "name": "Pickett Parks"},
            ],
        }
        data = template.render(context, request)
        return Response(utils.xml_to_json(data), status=status.HTTP_200_OK)


class AsyncView(View):
    async def get(self, request, *args, **kwargs):
        # Perform view logic using await.
        data = [
            {"id": 0, "name": "Sylvia Delaney"},
            {"id": 1, "name": "Ruthie Compton"},
            {"id": 2, "name": "Pickett Parks"},
        ]
        await asyncio.sleep(2)
        return HttpResponse(data, status=status.HTTP_200_OK)
