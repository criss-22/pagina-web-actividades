<?php
include_once __DIR__ . "/conexion.php";
$res = null;
$sql = "";
$tipo_nombre = ""; 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['opc'])) {
    $opc = $_POST['opc'];

    switch ($opc) {
        // --- 1. INNER JOINS ---
        case '1':
            $tipo_nombre = "INNER JOIN: Órdenes con Clientes";
            $sql = "SELECT orders.id, customers.first_name, customers.last_name, customers.company FROM orders INNER JOIN customers ON orders.customer_id=customers.id;";
            break;
        case '2':
            $tipo_nombre = "INNER JOIN: Stock Acumulado";
            $sql = "SELECT p.product_name AS Nombre_Producto, SUM(it.quantity) AS Stock_Acumulado FROM products p INNER JOIN inventory_transactions it ON p.id = it.product_id GROUP BY p.product_name;";
            break;

        // --- 2. LEFT JOINS ---
        case '3':
            $tipo_nombre = "LEFT JOIN: Clientes con o sin órdenes";
            $sql = "SELECT customers.first_name, customers.last_name, orders.id FROM customers LEFT JOIN orders ON customers.id= orders.customer_id;";
            break;
        case '4':
            $tipo_nombre = "LEFT JOIN: Productos vendidos o no";
            $sql = "SELECT products.product_name, order_details.quantity FROM products LEFT JOIN order_details ON products.id=order_details.id;";
            break;

        // --- 3. RIGHT JOINS ---
        case '5':
            $tipo_nombre = "RIGHT JOIN: Órdenes con o sin clientes";
            $sql = "SELECT customers.first_name, orders.id FROM customers RIGHT JOIN orders ON customers.id=orders.customer_id;";
            break;
        case '6':
            $tipo_nombre = "RIGHT JOIN: Ventas aunque el producto no exista";
            $sql = "SELECT products.product_name, order_details.id FROM products RIGHT JOIN order_details ON products.id=order_details.product_id;";
            break;

        // --- 4. CROSS JOINS ---
        case '7':
            $tipo_nombre = "CROSS JOIN: Todos los Clientes y Empleados";
            $sql = "SELECT customers.first_name, employees.first_name, employees.last_name, customers.last_name FROM customers, employees;";
            break;
        case '8':
            $tipo_nombre = "CROSS JOIN: Productos y Empleados";
            $sql = "SELECT products.product_name, employees.first_name, employees.last_name FROM products, employees;";
            break;

        // --- 5. SUBCONSULTAS ---
        case '9':
            $tipo_nombre = "SUBCONSULTA: Clientes de Élite (Transportista 2)";
            $sql = "SELECT company, last_name, first_name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE shipper_id = 2);";
            break;
        case '10':
            $tipo_nombre = "SUBCONSULTA: Precios Supremos (Beverages)";
            $sql = "SELECT product_name, list_price FROM products WHERE list_price >= ALL (SELECT list_price FROM products WHERE category = 'Beverages');";
            break;

        // --- 6. CONSULTAS DERIVADAS (Nuevas del documento) ---
        case '11':
            $tipo_nombre = "CONSULTA DERIVADA: Categorías Premium (> $20)";
            $sql = "SELECT categoria, promedio_precio FROM (SELECT category AS categoria, AVG(list_price) AS promedio_precio FROM products GROUP BY category) AS tabla_promedios WHERE promedio_precio > 20;";
            break;
        case '12':
            $tipo_nombre = "CONSULTA DERIVADA: Ranking de Ventas por Empleado";
            $sql = "SELECT CONCAT(e.first_name, ' ', e.last_name) AS nombre_empleado, resumen.total_ventas FROM (SELECT employee_id, COUNT(id) AS total_ventas FROM orders GROUP BY employee_id) AS resumen JOIN employees e ON resumen.employee_id = e.id ORDER BY resumen.total_ventas DESC;";
            break;

        // --- 7. VISTAS ---
        case '13':
            $tipo_nombre = "VISTA: Logística Detallada";
            $conn->query("CREATE OR REPLACE VIEW v_logistica AS SELECT o.id, c.company AS cliente, s.company AS transportista FROM orders o JOIN customers c ON o.customer_id = c.id JOIN shippers s ON o.shipper_id = s.id;");
            $sql = "SELECT * FROM v_logistica;";
            break;
        case '14':
            $tipo_nombre = "VISTA: Auditoría de Clientes";
            $conn->query("CREATE OR REPLACE VIEW v_auditoria AS SELECT c.company, o.id AS orden_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;");
            $sql = "SELECT * FROM v_auditoria;";
            break;
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultas Avanzadas 5C</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        optgroup { background-color: #343a40; color: #0d6efd; font-weight: bold; }
        option { background-color: #212529; color: white; }
    </style>
</head>

<body class="p-3 mb-2 bg-dark text-white">
    <header>
        <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div class="container">
                <h1 class="navbar-brand fw-bold"> <img src="/imagenes/uthhlogo.png" alt="Logo" width="40" height="40"
                        class="d-inline-block align-text-top"> <span class="notranslate">Cristopher Osorio
                        Morales</span></h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <ul class="nav nav-underline">
                            <li class="nav-item"><a class="nav-link active" href="/index.html">Inicio</a></li>
                            <li class="nav-item"><a class="nav-link" href="/actividades.html">Actividades</a></li>
                            <li class="nav-item"><a class="nav-link" href="https://grupoctic.com/">Home-GrupoTics</a></li>
                            <li class="nav-item"><a class="nav-link" href="https://github.com/criss-22">Github</a></li>
                            <li class="nav-item"><a class="nav-link" href="/Personal.html">Acerca de mí</a></li>
                        </ul>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main class="container d-flex flex-column align-items-center justify-content-center text-center mt-5">
        <form method="POST" class="w-75">
            <select class="form-select form-select-lg border-primary-subtle" name="opc" id="opc" required>
                <option value="" selected disabled>Selecciona una consulta...</option>
                
                <optgroup label="INNER JOIN">
                    <option value="1">1. Órdenes con sus Clientes</option>
                    <option value="2">2. Stock acumulado por producto</option>
                </optgroup>

                <optgroup label="LEFT JOIN">
                    <option value="3">3. Clientes (tengan o no órdenes)</option>
                    <option value="4">4. Productos (vendidos o no)</option>
                </optgroup>

                <optgroup label="RIGHT JOIN">
                    <option value="5">5. Todas las órdenes (con o sin clientes)</option>
                    <option value="6">6. Todas las ventas (producto inexistente)</option>
                </optgroup>

                <optgroup label="CROSS JOIN">
                    <option value="7">7. Todos los clientes y empleados</option>
                    <option value="8">8. Todos los productos y empleados</option>
                </optgroup>

                <optgroup label="SUBCONSULTAS">
                    <option value="9">9. Clientes de élite (Transportista 2)</option>
                    <option value="10">10. Productos con Precios Supremos</option>
                </optgroup>

                <optgroup label="CONSULTAS DERIVADAS">
                    <option value="11">11. Categorías Premium (Promedio > 20)</option>
                    <option value="12">12. Ranking de Ventas por Empleado</option>
                </optgroup>

                <optgroup label="VISTAS">
                    <option value="13">13. Vista: Logística Detallada</option>
                    <option value="14">14. Vista: Auditoría de Clientes</option>
                </optgroup>
            </select>
            <br>
            <button class="btn btn-primary btn-lg w-50" type="submit">Ejecutar SQL</button>
        </form>

        <div class="mt-5 w-100">
            <?php
            if (!empty($sql)) {
                $res = $conn->query($sql);
                if ($res) {
                    $total_registros = $res->num_rows; // Conteo de registros
                    echo "<div class='alert alert-info text-start d-flex justify-content-between align-items-center'>";
                    echo "<div><strong>Técnica:</strong> $tipo_nombre</div>";
                    echo "<div class='badge bg-primary fs-6'>Total de registros: $total_registros</div>";
                    echo "</div>";

                    if ($total_registros > 0) {
                        echo "<div class='table-responsive'><table class='table table-dark table-striped table-hover border-primary'>";
                        $firstRow = $res->fetch_assoc();
                        echo "<thead><tr>";
                        foreach ($firstRow as $col => $val) echo "<th>" . strtoupper($col) . "</th>";
                        echo "</tr></thead><tbody><tr>";
                        foreach ($firstRow as $val) echo "<td>" . ($val ?? '<i>NULL</i>') . "</td>";
                        echo "</tr>";
                        while ($row = $res->fetch_assoc()) {
                            echo "<tr>";
                            foreach ($row as $val) echo "<td>" . ($val ?? '<i>NULL</i>') . "</td>";
                            echo "</tr>";
                        }
                        echo "</tbody></table></div>";
                    } else {
                        echo "<div class='alert alert-warning'>No se encontraron datos.</div>";
                    }
                } else {
                    echo "<div class='alert alert-danger'>Error: " . $conn->error . "</div>";
                }
            }
            ?>
        </div>

        <div class="container text-white">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-white">© 2025 Cristopher, OMC</span>
                </div>
                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-white" href="https://www.instagram.com/fer.mvp_?igsh=ODlrdDE5OGhyMzll"><i class="bi bi-instagram" style="font-size: 1.5rem;"></i></a></li>
                    <li class="ms-3"><a class="text-white" href="https://www.facebook.com/cristopher.osorio.5872?mibextid=ZbWKwL"><i class="bi bi-facebook" style="font-size: 1.5rem;"></i></a></li>
                </ul>
            </footer>
        </div>
    </main>
</body>
</html>