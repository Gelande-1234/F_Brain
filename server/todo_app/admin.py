from django.contrib import admin  # 👈 cette ligne manquait !
from .models import ToDo

@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed', 'created_at', 'user')
    search_fields = ('title',)
    list_filter = ('completed', 'priority', 'user')
    fields = ('title', 'description','priority','completed', 'user')