
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core.mail import send_mail
from .models import InteresAdopcion


@ensure_csrf_cookie
def inicio(request):
    return render(request, 'inicio.html')


def razas(request):
    return render(request, 'razas.html')


def registrar_interes(request):
    if request.method == "POST":
        interes = InteresAdopcion(
            raza=request.POST.get("raza"),
            nombre=request.POST.get("nombre"),
            correo=request.POST.get("correo"),
            telefono=request.POST.get("telefono"),
            ciudad=request.POST.get("ciudad"),
            motivo=request.POST.get("motivo")
        )
        interes.save()

        try:
            resultado_correo = send_mail(
                "Interés registrado en Huellitas",
                f"Hola {interes.nombre},\n\n"
                f"Tu interés por conocer más sobre {interes.raza} "
                f"ha sido registrado correctamente.\n\n"
                f"Ciudad: {interes.ciudad}\n"
                f"Gracias por utilizar Huellitas.",
                None,
                [interes.correo],
            )
            print("RESULTADO DEL CORREO:", resultado_correo)
        except Exception as error:
            print("ERROR AL ENVIAR CORREO:", error)

        return JsonResponse({
            "mensaje": "Interés registrado correctamente."
        })

    return JsonResponse({
        "mensaje": "Método no permitido."
    }, status=405)

