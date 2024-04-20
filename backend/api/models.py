from django.db import models

class Environment(models.Model):
    name = models.CharField(max_length=16, primary_key=True)
    description = models.CharField(max_length=255)
    base_url = models.CharField(max_length=128)
    
    def __str__(self) -> str:
        return self.name

class Action(models.Model):
    environment = models.ForeignKey(Environment, on_delete=models.CASCADE)
    action = models.CharField(max_length=128)
    
    def __str__(self) -> str:
        return self.action + "@" + self.environment.name 
    
    
