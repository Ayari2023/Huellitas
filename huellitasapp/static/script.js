const contenedorRazas =
    document.getElementById("contenedorRazas");


/* =========================================================
   TRADUCCIONES
   ========================================================= */

function traducir(texto) {

    if (!texto) {
        return "Información no disponible.";
    }

    const traducciones = {

        "Affectionate": "Cariñoso",
        "Alert": "Alerta",
        "Friendly": "Amigable",
        "Loyal": "Leal",
        "Intelligent": "Inteligente",
        "Playful": "Juguetón",
        "Energetic": "Enérgico",
        "Gentle": "Gentil",
        "Curious": "Curioso",
        "Determined": "Determinado",
        "Excitable": "Excitable",
        "Lively": "Vivaz",
        "Sensitive": "Sensible",
        "Fearless": "Intrépido",
        "Self-confident": "Seguro de sí mismo",
        "Territorial": "Territorial",
        "Graceful": "Elegante",
        "Swift-moving": "Ágil",
        "Saucy": "Atrevido",
        "Terrier-like": "Parecido a un terrier",
        "Devoted": "Devoto",
        "Dignified": "Digno",
        "Courageous": "Valiente",
        "Independent": "Independiente",
        "Protective": "Protector",
        "Obedient": "Obediente",
        "Sociable": "Sociable",
        "Calm": "Tranquilo",
        "Confident": "Seguro de sí mismo",
        "Adaptable": "Adaptable",
        "Active": "Activo",
        "Outgoing": "Extrovertido",
        "Patient": "Paciente",
        "Hardworking": "Trabajador",
        "Reliable": "Confiable",
        "Reserved": "Reservado",
        "Stubborn": "Testarudo",
        "Mischievous": "Travieso",

        "Double": "Doble",
        "double": "Doble",
        "Smooth": "Liso",
        "smooth": "Liso",
        "Wire": "Áspero",
        "wire": "Áspero",
        "Curly": "Rizado",
        "curly": "Rizado",
        "Long": "Largo",
        "long": "Largo",
        "Medium": "Medio",
        "medium": "Medio",
        "Short": "Corto",
        "short": "Corto",
        "Rough": "Áspero",
        "rough": "Áspero",
        "Silky": "Sedoso",
        "Wiry": "De textura áspera",
        "Straight": "Liso",
        "Dense": "Denso",
        "Thick": "Denso",

        "Black": "Negro",
        "White": "Blanco",
        "Brown": "Café",
        "Red": "Rojo",
        "Golden": "Dorado",
        "Cream": "Crema",
        "Gray": "Gris",
        "Grey": "Gris",
        "Tan": "Canela",
        "Fawn": "Leonado",
        "Brindle": "Atigrado",
        "Sable": "Cibelino",

        "United Kingdom": "Reino Unido",
        "England": "Inglaterra",
        "Scotland": "Escocia",
        "Wales": "Gales",
        "Ireland": "Irlanda",
        "France": "Francia",
        "Germany": "Alemania",
        "Italy": "Italia",
        "Spain": "España",
        "Belgium": "Bélgica",
        "Netherlands": "Países Bajos",
        "Switzerland": "Suiza",
        "Canada": "Canadá",
        "United States": "Estados Unidos",
        "Australia": "Australia",
        "Japan": "Japón",
        "China": "China",
        "Russia": "Rusia",
        "Mexico": "México"
    };


    let resultado = texto;


    Object.keys(traducciones).forEach(palabra => {

        const expresion = new RegExp(
            `\\b${palabra.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            )}\\b`,
            "gi"
        );


        resultado = resultado.replace(
            expresion,
            traducciones[palabra]
        );

    });


    return resultado;
}


/* =========================================================
   DESCRIPCIÓN EN ESPAÑOL
   ========================================================= */

function crearDescripcion(raza) {

    const nombre =
        raza.name || "Esta raza";


    const temperamento =
        raza.traits &&
        raza.traits.temperament
            ? raza.traits.temperament
                .map(traducir)
                .join(", ")
            : "";


    let descripcion =
        `${nombre} es una raza de perro con características particulares que deben considerarse antes de adoptar.`;


    if (temperamento) {

        descripcion +=
            ` Se caracteriza por un temperamento ${temperamento.toLowerCase()}.`;

    }


    if (
        raza.traits &&
        raza.traits.exercise_minutes
    ) {

        descripcion +=
            ` Requiere aproximadamente ${raza.traits.exercise_minutes} minutos de ejercicio al día.`;

    }


    if (
        raza.coat &&
        raza.coat.type
    ) {

        descripcion +=
            ` Su pelaje es de tipo ${traducir(
                raza.coat.type
            ).toLowerCase()}`;


        if (raza.coat.length) {

            descripcion +=
                ` y de longitud ${traducir(
                    raza.coat.length
                ).toLowerCase()}`;

        }


        descripcion += ".";

    }


    descripcion +=
        " Conocer sus necesidades de espacio, ejercicio, cuidados y convivencia puede ayudarte a tomar una decisión de adopción responsable.";


    return descripcion;
}


/* =========================================================
   CARGAR RAZAS
   ========================================================= */

async function cargarRazas() {

    try {

        const respuesta =
            await fetch(
                "https://dogapi.dog/api/v2/breeds"
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo conectar con la API."
            );

        }


        const datos =
            await respuesta.json();


        datos.data.forEach(perro => {

            const raza =
                perro.attributes.name;


            const tarjeta =
                document.createElement("div");


            tarjeta.className =
                "col-md-4";


            tarjeta.innerHTML = `

                <div class="card h-100 shadow-sm">

                    <img
                        src="https://dogapi.dog/api/v2/breeds/${perro.id}/image"
                        class="card-img-top"
                        alt="Perro de raza ${raza}"
                        style="height: 220px; object-fit: cover;"
                    >

                    <div class="card-body">

                        <h5 class="card-title">
                            ${raza}
                        </h5>

                        <p class="card-text">

                            Conoce las características de esta raza
                            y descubre si su perfil podría adaptarse
                            a tu estilo de vida.

                        </p>

                        <button
                            class="btn btn-huellitas"
                            onclick="verDetalles('${perro.id}')">

                            Ver detalles

                        </button>

                    </div>

                </div>

            `;


            contenedorRazas.appendChild(
                tarjeta
            );

        });


    } catch (error) {

        console.error(
            "Error al cargar las razas:",
            error
        );


        contenedorRazas.innerHTML = `

            <div class="col-12 text-center">

                <p>
                    No se pudieron cargar las razas.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   VER DETALLES
   ========================================================= */

async function verDetalles(id) {

    try {

        const respuesta =
            await fetch(
                `https://dogapi.dog/api/v2/breeds/${id}`
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener los detalles."
            );

        }


        const datos =
            await respuesta.json();


        const raza =
            datos.data.attributes;


        /* VIDA */

        const vida =
            raza.life
                ? `${raza.life.min} - ${raza.life.max} años`
                : "Información no disponible.";


        /* PESO */

        const pesoMachos =
            raza.male_weight
                ? `${raza.male_weight.min} - ${raza.male_weight.max} kg`
                : "Información no disponible.";


        const pesoHembras =
            raza.female_weight
                ? `${raza.female_weight.min} - ${raza.female_weight.max} kg`
                : "Información no disponible.";


        const peso =
            `Machos: ${pesoMachos}<br>
             Hembras: ${pesoHembras}`;


        /* ALTURA */

        const alturaMachos =
            raza.male_height
                ? `${raza.male_height.min} - ${raza.male_height.max} cm`
                : "Información no disponible.";


        const alturaHembras =
            raza.female_height
                ? `${raza.female_height.min} - ${raza.female_height.max} cm`
                : "Información no disponible.";


        const altura =
            `Machos: ${alturaMachos}<br>
             Hembras: ${alturaHembras}`;


        /* ORIGEN */

        let origen =
            "Información no disponible.";


        if (raza.origin) {

            const pais =
                raza.origin.country
                    ? traducir(
                        raza.origin.country
                    )
                    : "";


            const region =
                raza.origin.region
                    ? traducir(
                        raza.origin.region
                    )
                    : "";


            if (pais && region) {

                origen =
                    `${pais}, ${region}`;

            } else if (pais) {

                origen =
                    pais;

            } else if (region) {

                origen =
                    region;

            }

        }


        /* PELAJE */

        let pelaje =
            "Información no disponible.";


        if (raza.coat) {

            const tipo =
                raza.coat.type
                    ? traducir(
                        raza.coat.type
                    )
                    : "";


            const longitud =
                raza.coat.length
                    ? traducir(
                        raza.coat.length
                    )
                    : "";


            if (tipo && longitud) {

                pelaje =
                    `${tipo}, ${longitud}`;

            } else if (tipo) {

                pelaje =
                    tipo;

            } else if (longitud) {

                pelaje =
                    longitud;

            }

        }


        /* TEMPERAMENTO */

        let temperamento =
            "Información no disponible.";


        if (
            raza.traits &&
            raza.traits.temperament &&
            raza.traits.temperament.length
        ) {

            temperamento =
                raza.traits.temperament
                    .map(traducir)
                    .join(", ");

        }


        /* EJERCICIO */

        const ejercicio =
            raza.traits &&
            raza.traits.exercise_minutes
                ? `${raza.traits.exercise_minutes} minutos aproximadamente`
                : "Información no disponible.";


        /* DEPARTAMENTO */

        let departamento =
            "Información no disponible.";


        if (
            raza.traits &&
            raza.traits.apartment_friendly !== undefined &&
            raza.traits.apartment_friendly !== null
        ) {

            if (
                raza.traits.apartment_friendly >= 4
            ) {

                departamento =
                    "Buena adaptación";

            } else if (
                raza.traits.apartment_friendly >= 3
            ) {

                departamento =
                    "Adaptación moderada";

            } else {

                departamento =
                    "Puede requerir más espacio";

            }

        }


        /* RECOMENDACIONES */

        const recomendaciones = [];


        if (
            raza.traits &&
            raza.traits.exercise_minutes
        ) {

            recomendaciones.push(
                `Requiere aproximadamente ${raza.traits.exercise_minutes} minutos de ejercicio al día.`
            );

        }


        if (
            raza.traits &&
            raza.traits.grooming >= 4
        ) {

            recomendaciones.push(
                "Puede necesitar cuidados frecuentes de aseo."
            );

        }


        if (
            raza.traits &&
            raza.traits.trainability >= 4
        ) {

            recomendaciones.push(
                "Presenta buena capacidad de entrenamiento."
            );

        }


        if (
            raza.traits &&
            raza.traits.apartment_friendly <= 2
        ) {

            recomendaciones.push(
                "Puede ser menos adecuada para espacios pequeños."
            );

        }


        if (
            raza.traits &&
            raza.traits.shedding >= 4
        ) {

            recomendaciones.push(
                "Puede presentar una muda de pelo considerable."
            );

        }


        if (
            raza.traits &&
            raza.traits.grooming <= 2
        ) {

            recomendaciones.push(
                "Sus necesidades de aseo pueden ser relativamente bajas."
            );

        }


        if (
            recomendaciones.length === 0
        ) {

            recomendaciones.push(
                "Considera sus características, necesidades de ejercicio, espacio y cuidados antes de adoptar."
            );

        }


        /* =================================================
           MOSTRAR INFORMACIÓN
           ================================================= */


        document.getElementById(
            "nombreRazaModal"
        ).textContent =
            raza.name;


        document.getElementById(
            "imagenRazaModal"
        ).src =
            `https://dogapi.dog/api/v2/breeds/${id}/image`;


        document.getElementById(
            "imagenRazaModal"
        ).alt =
            `Perro de raza ${raza.name}`;


        document.getElementById(
            "descripcionRazaModal"
        ).textContent =
            crearDescripcion(raza);


        document.getElementById(
            "vidaRazaModal"
        ).textContent =
            vida;


        document.getElementById(
            "pesoRazaModal"
        ).innerHTML =
            peso;


        document.getElementById(
            "alturaRazaModal"
        ).innerHTML =
            altura;


        document.getElementById(
            "origenRazaModal"
        ).textContent =
            origen;


        document.getElementById(
            "pelajeRazaModal"
        ).textContent =
            pelaje;


        document.getElementById(
            "temperamentoRazaModal"
        ).textContent =
            temperamento;


        document.getElementById(
            "ejercicioRazaModal"
        ).textContent =
            ejercicio;


        document.getElementById(
            "departamentoRazaModal"
        ).textContent =
            departamento;


        document.getElementById(
            "recomendacionesRazaModal"
        ).textContent =
            recomendaciones.join(" ");


        /* GUARDAR RAZA SELECCIONADA */

        const campoRaza =
            document.getElementById(
                "razaInteres"
            );


        campoRaza.value =
            raza.name;


        /* ABRIR MODAL */

        const modal =
            new bootstrap.Modal(
                document.getElementById(
                    "modalDetalles"
                )
            );


        modal.show();


    } catch (error) {

        console.error(
            "Error al obtener los detalles:",
            error
        );

    }

}


/* =========================================================
   INICIAR CARGA
   ========================================================= */

cargarRazas();


/* =========================================================
   BUSCADOR
   ========================================================= */

const buscador =
    document.getElementById(
        "buscadorRazas"
    );


buscador.addEventListener(
    "input",
    function () {

        const texto =
            buscador.value
                .toLowerCase()
                .trim();


        const tarjetas =
            contenedorRazas.children;


        for (const tarjeta of tarjetas) {

            const nombreRaza =
                tarjeta
                    .querySelector(
                        ".card-title"
                    )
                    .textContent
                    .toLowerCase();


            if (
                nombreRaza.includes(texto)
            ) {

                tarjeta.style.display =
                    "";

            } else {

                tarjeta.style.display =
                    "none";

            }

        }

    }
);


/* =========================================================
   BOTÓN "ME INTERESA"
   ========================================================= */

const btnMeInteresa =
    document.getElementById(
        "btnMeInteresa"
    );


btnMeInteresa.addEventListener(
    "click",
    function () {

        const modalDetallesElement =
            document.getElementById(
                "modalDetalles"
            );


        const modalDetalles =
            bootstrap.Modal.getInstance(
                modalDetallesElement
            );


        if (modalDetalles) {

            modalDetalles.hide();

        }


        setTimeout(
            function () {

                const modalInteres =
                    new bootstrap.Modal(
                        document.getElementById(
                            "modalInteres"
                        )
                    );


                modalInteres.show();

            },
            300
        );

    }
);
/* =========================================================
   BOTÓN "ENVIAR INTERÉS"
   ========================================================= */

const btnEnviarInteres =
    document.getElementById(
        "btnEnviarInteres"
    );


btnEnviarInteres.addEventListener(
    "click",
    async function () {

        const nombre =
            document.getElementById(
                "nombreInteres"
            ).value.trim();


        const correo =
            document.getElementById(
                "correoInteres"
            ).value.trim();


        const telefono =
            document.getElementById(
                "telefonoInteres"
            ).value.trim();


        const ciudad =
            document.getElementById(
                "ciudadInteres"
            ).value.trim();


        const motivo =
            document.getElementById(
                "motivoInteres"
            ).value.trim();


        const raza =
            document.getElementById(
                "razaInteres"
            ).value;


        if (
            !nombre ||
            !correo ||
            !telefono ||
            !ciudad ||
            !motivo
        ) {

            alert(
                "Por favor completa todos los campos."
            );

            return;

        }


        const datos =
            new URLSearchParams();


        datos.append(
            "raza",
            raza
        );


        datos.append(
            "nombre",
            nombre
        );


        datos.append(
            "correo",
            correo
        );


        datos.append(
            "telefono",
            telefono
        );


        datos.append(
            "ciudad",
            ciudad
        );


        datos.append(
            "motivo",
            motivo
        );


        try {

            const respuesta =
                await fetch(
                    "/registrar-interes/",
                    {
                        method: "POST",

                        headers: {
                            "X-CSRFToken":
                                obtenerCSRFToken(),

                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },

                        body:
                            datos.toString()
                    }
                );


            const resultado =
                await respuesta.json();


            if (!respuesta.ok) {

                throw new Error(
                    resultado.mensaje ||
                    "No se pudo registrar el interés."
                );

            }


            alert(
                resultado.mensaje
            );


            document.getElementById(
                "nombreInteres"
            ).value = "";


            document.getElementById(
                "correoInteres"
            ).value = "";


            document.getElementById(
                "telefonoInteres"
            ).value = "";


            document.getElementById(
                "ciudadInteres"
            ).value = "";


            document.getElementById(
                "motivoInteres"
            ).value = "";


            const modalInteres =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "modalInteres"
                    )
                );


            if (modalInteres) {

                modalInteres.hide();

            }


        } catch (error) {

            console.error(
                "Error al registrar el interés:",
                error
            );


            alert(
                "No se pudo registrar el interés. Intenta nuevamente."
            );

        }

    }
);


/* =========================================================
   OBTENER TOKEN CSRF
   ========================================================= */

function obtenerCSRFToken() {

    const cookies =
        document.cookie.split(";");


    for (
        let cookie of cookies
    ) {

        cookie =
            cookie.trim();


        if (
            cookie.startsWith(
                "csrftoken="
            )
        ) {

            return decodeURIComponent(
                cookie.substring(
                    "csrftoken=".length
                )
            );

        }

    }


    return "";

}

