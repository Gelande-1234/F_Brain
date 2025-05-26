from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()  # 👈 toutes les tâches
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]  # 👈 accès uniquement aux utilisateurs connectés

    def get_queryset(self):
        # 👇 renvoyer uniquement les tâches de l'utilisateur connecté
        return ToDo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # 👇 associer automatiquement la tâche à l'utilisateur
        serializer.save(user=self.request.user)
