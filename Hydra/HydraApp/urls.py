from django.contrib import admin
from django.urls import path
from Hydra.Hydra import settings
from Hydra.Hydra.settings import STATIC_URL

from Hydra.HydraApp import views

#urlpatterns = [
 #   path('admin/', admin.site.urls),
#]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('images/', views.image_upload, name='image_upload'),
] + STATIC_URL(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)