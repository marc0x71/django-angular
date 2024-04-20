from rest_framework import serializers

from .models import Environment, Action

class EnvironmentSerializer(serializers.ModelSerializer):
    class Meta():
        model = Environment
        fields = ['name', 'description', 'base_url']
        
class ActionSerializer(serializers.ModelSerializer):
    #environment_name = serializers.CharField(source='environment.name')
    class Meta():
        model = Action
        fields = ['environment', 'action']
    