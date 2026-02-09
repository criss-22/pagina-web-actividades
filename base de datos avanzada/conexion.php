<?php
// Datos de conexión
$host = "127.0.0.1";       // Servidor local
$usuario = "u138650717_grupo5c";         // Usuario por defecto en XAMPP
$password = "Grupo5colivares";            // Contraseña por defecto vacía
$baseDeDatos = "u138650717_norwich"; // Nombre de la base de datos que creaste


// Crear conexión
$conn = new mysqli($host, $usuario, $password, $baseDeDatos);

// Verificar conexión
//if ($conn->connect_error) {
 //   die("Conexión fallida: " . $conn->connect_error);
//} else {
//    echo "Conexión exitosa a la base de datos!";
//}


//$conn->close();
?>