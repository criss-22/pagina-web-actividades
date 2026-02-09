const mostrarDetalle = () => {
    const urlActual = window.location.href; 
    const partes = urlActual.split("=");
    const idProducto = partes[1];

    const contenedor = document.getElementById("detail-card");
    const opinionContenedor=document.getElementById("opinion-card");
    if (!idProducto) {
        contenedor.innerHTML = "<h2 class='text-white'>Producto no encontrado</h2>";
        return;
    }

    //fetch al producto específico
    fetch(`https://dummyjson.com/products/${idProducto}`)
        .then(res => res.json())
        .then(producto => {
            //insertar el HTML en el contenedor
            contenedor.innerHTML = `
                <div class="card bg-white text-black p-4" style="max-width: 800px; border-radius: 15px;">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${producto.thumbnail}" class="img-fluid rounded-start" alt="${producto.title}">
                        </div>
                        <div class="col-md-7 text-start ps-4">
                            <h2 class="practice-title">${producto.title}</h2>
                            <p class="card-text">${producto.description}</p>
                            <h3 class="text-warning">$${producto.price}</h3>
                            <p><strong>Categoría:</strong> ${producto.category}</p>
                            <p><strong>Marca:</strong> ${producto.brand}</p>
                            <p><strong>Estado de disponibilidad:</strong> ${producto.availabilityStatus}</p>
                            <p><strong>Porcentaje de descuento:</strong> $${producto.discountPercentage}</p>
                            <p><strong >Calificación:</strong> ${producto.rating}</p>
                            <p><strong>Stock:</strong> ${producto.stock} unidades</p>
                            <a href="index.html" class="btn btn-outline-primary">
                                <i class="bi bi-arrow-left"></i> Volver al inicio
                            </a>
                        </div>
                    </div>
                </div>
            `;

            if (producto.reviews && producto.reviews.length > 0) {
                producto.reviews.forEach(opinion => {
                    opinionContenedor.innerHTML += `
                    <div class="row gy-3 py-3"> 
    
                    <div class="col-12">
                    <div class="card shadow-sm h-100">
                    <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-person-circle me-2 fs-4 text-secondary"></i>
                        <strong class="text-gray-dark small">${opinion.reviewerName}</strong>
                    </div>
                    <span class="text-warning small">${"⭐".repeat(opinion.rating)}</span>
                    </div>

                    <p class="card-text small mb-2 text-secondary">
                    ${opinion.comment}
                    </p>
                
                    <div class="border-top pt-2">
                    <small class="text-muted" style="font-size: 0.75rem;">
                        ${new Date(opinion.date).toLocaleDateString()}
                    </small>
                    </div>
                    </div>
                    </div>
                    </div>

                    </div>
                    `;
                });
            } else {
                opinionContenedor.innerHTML = "<p class='text-muted pt-3'>No hay opiniones para este producto.</p>";
            }

        })
        .catch(error => {
            console.error("Error cargando detalle:", error);
            contenedor.innerHTML = "<p class='text-white'>Error al cargar los datos del servidor.</p>";
        });
}




