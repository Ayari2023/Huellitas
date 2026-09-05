from django.db import models


class InteresAdopcion(models.Model):

    raza = models.CharField(max_length=100)

    nombre = models.CharField(max_length=100)

    correo = models.EmailField()

    telefono = models.CharField(max_length=20)

    ciudad = models.CharField(max_length=100)

    motivo = models.TextField()

    fecha = models.DateTimeField(auto_now_add=True)


    def __str__(self):

        return f"{self.nombre} - {self.raza}"
