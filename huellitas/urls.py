
from django.contrib import admin
from django.urls import path
from huellitasapp.views import inicio, razas, registrar_interes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', inicio, name='inicio'),
    path('razas/', razas, name='razas'),
    path('registrar-interes/', registrar_interes),
]
