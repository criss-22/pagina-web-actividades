
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('id');

console.log("ID recuperado de la URL:", idProducto);

if (idProducto) {
    fetch('https://dummyjson.com/products/' + idProducto)
        .then(res => {
            if (!res.ok) throw new Error("Error al conectar con la API");
            return res.json();
        })
        .then(producto => {
            console.log("Datos recibidos de DummyJSON:", producto);
            
            document.getElementById('titulo').value = producto.title;
            document.getElementById('precio').value = producto.price;
            document.getElementById('descripcion').value = producto.description;

            const select = document.getElementById('select_categoria');
            const opcion = document.createElement('option');
            opcion.value = producto.category;
            opcion.text = producto.category;
            opcion.selected = true;
            select.appendChild(opcion);
        })
        .catch(error => {
            console.error("Hubo un problema:", error);
            document.getElementById('mensaje-exito').innerHTML = 
                `<div class="alert alert-danger">Error: No se pudo cargar el producto.</div>`;
        });
} else {
    console.error("No se encontró ningún ID en la URL. Asegúrate de que la URL sea: editar.html?id=1");
}

function guardarproducto() {
    const nuevoTitulo = document.getElementById('titulo').value;
    const nuevoPrecio = document.getElementById('precio').value;
    const nuevaDesc = document.getElementById('descripcion').value;

    fetch('https://dummyjson.com/products/' + idProducto, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: nuevoTitulo,
            price: nuevoPrecio,
            description: nuevaDesc
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Respuesta de actualización:", data);
        
        const mensajeDiv = document.getElementById('mensaje-exito');
        mensajeDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>¡Éxito!</strong> Producto "${data.title}" actualizado.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    })
    .catch(err => console.error("Error al guardar:", err));
}

function navegarA(pagina) {
    window.location.href = pagina;
}