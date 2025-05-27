from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToDoViewSet

router = DefaultRouter()
router.register(r'todos', ToDoViewSet)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('todo.api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
