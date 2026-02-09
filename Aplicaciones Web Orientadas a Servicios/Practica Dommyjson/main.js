const categoria=document.getElementById("select_categoria")

fetch('https://dummyjson.com/products/category-list')
.then(response=>response.json())
.then(data=>{
    const category=data;
    muestraCategorias(category);
})

const muestraCategorias = (category) => {
    category.forEach(categorias => {
        categoria.innerHTML += `<option value="${categorias}">${categorias}</option>`;
    });
}



const guardarproducto=()=>{

    //creamos las varioables de los elemntos con los que vamos a interactuar 
    const titulo=document.getElementById("titulo").value 
    const precio=parseFloat(document.getElementById("precio").value)
    const categoria=document.getElementById("select_categoria").value
    const descripcion=document.getElementById("descripcion").value
    const resultado=document.getElementById("mensaje-exito")
    //validamos que los elementos no vengan vacios 
    if(!titulo || !precio || !descripcion){
        alert("Completa los campos obligatorios")
        return
    }

    //creamos el objeto que se va por el body 
    const producto={
        title:titulo,
        price:precio,
        category:categoria,
        description:descripcion,
        thumbnail:'https://dummyjson.com/image/400x200/008080/ffffff?text='+titulo
    }

    //hacemos la peticion fetch con el metodo post
    fetch("https://dummyjson.com/products/add",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(producto)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Respuesta del API", data)
        resultado.style.display="block"
        resultado.innerHTML=`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Producto Agregado correctamente!!!</strong><br>
        Id Asignado : ${data.id}<br>
        Nombre      : ${data.title}<br>
        Precio      : $${data.price}.00 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    })

}


function navegarA(url) {
    window.location.href = url;
}
