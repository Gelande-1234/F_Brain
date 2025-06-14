from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToDoViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'todos', ToDoViewSet)

urlpatterns = [
    path('', include(router.urls)),          # 'todos/' accessible via /api/todos/
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
