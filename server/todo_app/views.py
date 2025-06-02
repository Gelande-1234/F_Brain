from rest_framework import viewsets
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ne renvoie que les ToDos de l’utilisateur connecté
        return ToDo.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Associe automatiquement la tâche à l’utilisateur connecté
        serializer.save(user=self.request.user)