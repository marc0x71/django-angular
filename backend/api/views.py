import asyncio

from django.http import Http404, HttpResponse
from django.template import loader
from django.views import View

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics

from api import utils
from .serializers import EnvironmentSerializer, ActionSerializer
from .models import Environment, Action


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


# http --print=hbm --verify=no https://localhost:8443/api/xml
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
        return Response(
            utils.xml_pretty(template.render(context, request)),
            status=status.HTTP_200_OK,
        )


# http --print=hbm --verify=no https://localhost:8443/api/xml2json
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


# http --print=hbm --verify=no https://localhost:8443/api/async
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

# echo '{"first":1,"second":2, "data": [{"id":1,"name":"Mario"},{"id":2,"name":"Luigi"}]}'|http --print=hbm -v post --verify=no https://localhost:8443/api/template/example
class GetTemplateView(APIView):
    def post(self, request: Request, tpl_name, format=None):
        try:
            template = loader.get_template(tpl_name + ".xml")
        except:
            raise Http404

        data = template.render(request.data, request)
        return Response(utils.xml_to_json(data), status=status.HTTP_200_OK)


# http --verify=no https://localhost:8443/api/environments
class EnvironmentListAPI(generics.ListAPIView):
    model = Environment
    serializer_class = EnvironmentSerializer
    queryset = Environment.objects.all()


# http --verify=no https://localhost:8443/api/actions/dev
class ActionListAPI(generics.ListAPIView):
    model = Action
    serializer_class = ActionSerializer

    def get_queryset(self):
        env = self.kwargs["env"]
        return Action.objects.filter(environment=env)
