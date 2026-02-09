const selectUsuario= document.getElementById("select-usuario")
const muroDiv= document.getElementById("muro")
const avatarImg=document.getElementById("avatar-img")
const nombreHeader=document.getElementById("nombre-usuario")

//cargamos los usuarios en el select 
fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(usuarios=>{
    usuarios.forEach(usuario=>{
        const opcion='<option value="'+usuario.id+'">'+usuario.name+'</option>'
        selectUsuario.innerHTML+=opcion
    })
})


//que va a pasar cada que seleccione un usuario
const cargaMuro=()=>{
    const userId=selectUsuario.value
    const nombre=selectUsuario.options[selectUsuario.selectedIndex].text
    //mostramos el nombre de usuario y su avatar
    nombreHeader.innerText=nombre
    avatarImg.src="https://api.dicebear.com/9.x/dylan/svg?seed="+nombre
    avatarImg.style.display="block"

    //cargamos el muro
    fetch("https://jsonplaceholder.typicode.com/users/"+userId+"/posts")
    .then(response=>response.json())
    .then(posts=>{
        //limpiamos el muro por si hay post de otro usuario
        muroDiv.innerHTML=""
        //recorremos post por post para dibujarlos 
        posts.forEach(post=>{
            muroDiv.innerHTML+='<div class="post">'+
            '<div class="post-title"><h3>'+post.title+'</h3></div>'
            +'<p>'+post.body+'</p>'
            +'<small>Publicado por : '+nombre+'</small>'
            +'</div>'
        })
    })

}