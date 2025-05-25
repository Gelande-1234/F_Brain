from django.contrib import admin
from .models import ToDo

@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed', 'created_at')  # adapte selon ton modèle
    search_fields = ('title',)
    list_filter = ('completed',)
