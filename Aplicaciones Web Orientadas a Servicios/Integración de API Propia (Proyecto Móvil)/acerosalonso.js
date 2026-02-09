// Definimos la URL de la API oficial 
const urlApi = "https://juandios.grupoctic.com/Peliculas/api/listar.php";

// Función asíncrona para pedir los datos
const cargarUsuarios = () => {
    // Usamos fetch para hacer la petición HTTP
    fetch(urlApi)
        .then(respuesta => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
        .then(data => {
            // La API devuelve un objeto con una propiedad 'items' que contiene el array
            const usuarios = data;
            console.log("Datos recibidos:", usuarios); // Debugging en consola
            // Llamamos a la función que se encarga de dibujar en pantalla
            mostrarUsuarios(usuarios);
        })
        .catch(error => {
            // Buena práctica: Manejar errores por si falla la red o la API
            console.error("Error al cargar los personajes:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
}

// Función encargada de manipular el DOM
const mostrarUsuarios = (usuarios) => {
    // 1. Seleccionamos el contenedor del HTML
    const contenedorUsuarios = document.getElementById("contenedor-usuarios");
    // 2. Limpiamos el contenedor por si ya tenía contenido previo
    contenedorUsuarios.innerHTML = "";

    // 3. Recorremos cada personaje del array
    usuarios.forEach(usuario => {
        // Creamos un elemento DIV nuevo en memoria
        const tarjeta = document.createElement("div");
        // Le añadimos la clase CSS que definimos en el paso 3
        tarjeta.classList.add("practice-card");
        // Usamos Template Strings (``) para inyectar el HTML interno con los datos
        tarjeta.innerHTML = `
            <img src="${"https://juandios.grupoctic.com/Peliculas/img/"+usuario.foto}" alt="${usuario.Id_Empleado}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="practice-title">${usuario.Nombre} ${usuario.Apellido_Paterno}</h3>
            <p><strong>Apellido Materno:</strong> ${usuario.Apellido_Materno}</p>
            <p><strong>Correo:</strong> ${usuario.Correo}</p>
            <p><strong>Teléfono:</strong> ${usuario.Telefono}</p>
            <p><strong>Departamento:</strong> ${usuario.Id_Departamento}</p>
        `;
        // Finalmente, agregamos la tarjeta completa al contenedor principal
        contenedorUsuarios.appendChild(tarjeta);
    })
}