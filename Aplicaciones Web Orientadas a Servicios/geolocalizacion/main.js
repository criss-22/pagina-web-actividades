
const coordenadas=document.getElementById("parrafo")
const enlace=document.getElementById("enlace")

const obtener=()=>{
    //verificar que el navegador tenga soporte para geolocalizacion
    if(navigator.geolocation){
        coordenadas.innerText="Localizando espere un momento..."
        navigator.geolocation.getCurrentPosition((position)=>{
            const longitud=position.coords.longitude
            const latitud=position.coords.latitude

            coordenadas.innerText="latitud ="+(latitud)+", longitud ="+(longitud)
            enlace.href="https://www.google.com/maps?q="+ latitud+" , "+longitud
            enlace.style.display="inline-block"
            
        //alert("longitud : "+longitud")
        },
        (error)=>{
            coordenadas.innerText="No se pudo obtener la ubicación"
        })
    }else{}
}