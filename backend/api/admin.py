from django.contrib import admin

from .models import Action, Environment

# Register your models here.
admin.site.register(Environment)
admin.site.register(Action)
