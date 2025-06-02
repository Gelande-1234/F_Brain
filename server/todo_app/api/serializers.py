from rest_framework import serializers
from ..models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'title', 'description', 'completed', 'priority', 'user', 'created_at']
        read_only_fields = ['id', 'user', 'created_at', 'completed']