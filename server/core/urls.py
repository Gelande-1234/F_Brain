from django.urls import path
from .views import test_api
from .metrics import metrics_view  # <- ajouter cette ligne

urlpatterns = [
    path('test/', test_api),
    path('metrics/', metrics_view),  # <- ajouter ce endpoint
]


