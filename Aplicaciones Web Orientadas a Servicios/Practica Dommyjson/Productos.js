let urlApi="https://dummyjson.com/products"

const inputBusqueda = document.getElementById("input-busqueda");
const contenedorDiv = document.getElementById("contenedor-productos");
const categoriafiltro =document.getElementById("filto-categoria");
const ordenamiento =document.getElementById("filtro-tipo");


const cargarProductos = ()=>{

    fetch(urlApi)
    .then(respuesta =>respuesta.json())
    .then(data => {
        const productos = data.products; 
        console.log("Datos recibidos:", productos);
        mostrarProductos(productos);
    })
    .catch(error =>{
        console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
    })
}

//CARGAR LAS CATEGORIAS AL SELECT 
fetch("https://dummyjson.com/products/category-list")
    .then(res=>res.json())
    .then((data) => {
        const Categorias = data;
        mostrarCategorias(Categorias);
    })

    const mostrarCategorias=(Categorias)=>{

    const contenedorCategories=document.getElementById("filto-categoria");
    Categorias.forEach(category => {
        contenedorCategories.innerHTML+=`
        <option value="${category}">${category}</option>`
        ;
    });
}
//FILTRO POR CATEGORIA
const filtroPorCategoria=()=> {
    const categoriaFiltrada = document.getElementById("filto-categoria").value;
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = "";
    fetch("https://dummyjson.com/products/category/"+categoriaFiltrada)
        .then(respuesta => respuesta.json())
        .then(data => {
            const producto=data.products;
            mostrarProductos(producto);
        })
}

///FILTRO POR PRECIO
const FiltroPrecio=()=>{
    const ordenamiento =document.getElementById("filtro-tipo").value;
    const contenedorDiv = document.getElementById("contenedor-productos");

        contenedorDiv.innerHTML = "";
        fetch(`https://dummyjson.com/products?sortBy=price&order=${ordenamiento}`)
        .then(res=>res.json())
        .then(data=>{
            const producto=data.products;
            mostrarProductos(producto)
        })
}

const buscarProductos = () => {
    const palabra= inputBusqueda.value;
    if (palabra === "") {
        alert("Por favor escribe algo para buscar");
        return;
    }
    fetch("https://dummyjson.com/products/search?q=" + palabra)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        const productosEncontrados = data.products; 
        contenedorDiv.innerHTML="";
        
        if(productosEncontrados.lenght===0)
        {
            contenedorDiv.innerHTML="<p>No se encontraron productos con esa palabra.</p>";
        }else
        {
            mostrarProductos(productosEncontrados);
        }
    })
    .catch(error => {
        console.error("Error al buscar:", error);
        contenedorDiv.innerHTML = "Hubo un error al conectar con el servidor.";
    });
}


//MUESTRA LA TARJETA COMPLETA CON SUS DATOS
const mostrarProductos = (productos) => {
    contenedorDiv.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");
        tarjeta.id = `tarjeta-${producto.id}`;
        tarjeta.setAttribute("onclick", `verDetalle(${producto.id})`);
        tarjeta.style.cursor = "pointer";
        tarjeta.innerHTML = `
            <img src="${producto.thumbnail}" alt="${producto.title}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="practice-title">${producto.title}</h3>
            <p><strong>Precio:</strong> $${producto.price}</p>
            <p><strong>Popularidad:</strong> ${"⭐".repeat(producto.rating)} </p>
            <a href="edit.html?id=${producto.id}">
                <button onclick="event.stopPropagation()" class="btn btn-outline-primary"> Editar</button>
            </a>

            <button onclick="eliminarProducto(${producto.id}, '${producto.title}'); event.stopPropagation()" class="btn btn-outline-danger"> 
                Eliminar
            </button>
        `;
        contenedorDiv.appendChild(tarjeta);
    });
}

//ELIMINAR UN PRODUCTO SIMULACION
const eliminarProducto = (id, nombre) => {
    if (confirm(`¿Seguro que quieres eliminar "${nombre}"?`)) {
        fetch('https://dummyjson.com/products/' + id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log("Eliminado en API:", data);

            const tarjetaABorrar = document.getElementById(`tarjeta-${id}`);
            if (tarjetaABorrar) {
                tarjetaABorrar.remove();
            }

            const alertaContenedor = document.getElementById("mensaje-alerta");
            if (alertaContenedor) {
                alertaContenedor.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>¡Eliminado!</strong> El producto "${nombre}" ha sido borrado.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            } else {
                alert(`El producto "${nombre}" ha sido eliminado.`);
            }
        })
        .catch(err => {
            console.error("Error al eliminar:", err);
            alert("No se pudo eliminar el producto.");
        });
    }
}

cargarProductos();

//cuando se encuentre vacio el buscador o se borre se cargaran de nuevo los productos
inputBusqueda.addEventListener("input", () => {
    if (inputBusqueda.value === "") {
        cargarProductos();
    }
});


const verDetalle = (id) => {
    window.location.href = `vistadetalle.html?id=${id}`;
}

