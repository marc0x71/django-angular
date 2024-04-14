from django.urls import path

from api import views

urlpatterns = [
    path("data", views.DataViewer.as_view()),
    path("xml", views.XmlViewer.as_view()),
    path("async", views.AsyncView.as_view()),
]
