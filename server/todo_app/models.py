from django.db import models
from django.contrib.auth.models import User

class ToDo(models.Model):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    PRIORITY_CHOICES = [
        (LOW, 'Bas'),
        (MEDIUM, 'Moyen'),
        (HIGH, 'Haut'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=LOW)  # Utilisation des choix ici

    def __str__(self):
        return self.title
