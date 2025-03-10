// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
};

function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     * ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
     */
    var JsonString = JSON.stringify(baseJSON,null,2);
    document.getElementById("description").value = JsonString;

    // SE LISTAN TODOS LOS PRODUCTOS
    listarProductos();
}

// Función para listar productos
function listarProductos() {
    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        success: function(response) {
            let productos = JSON.parse(response);
            let template = '';

            productos.forEach(producto => {
                let descripcion = `
                    <li>precio: ${producto.precio}</li>
                    <li>unidades: ${producto.unidades}</li>
                    <li>modelo: ${producto.modelo}</li>
                    <li>marca: ${producto.marca}</li>
                    <li>detalles: ${producto.detalles}</li>
                `;

                template += `
                    <tr productId="${producto.id}">
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td><ul>${descripcion}</ul></td>
                        <td>
                            <button class="product-edit btn btn-warning">Editar</button>
                            <button class="product-delete btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                `;
            });

            $('#products').html(template);
        },
        error: function(xhr, status, error) {
            console.error('Error al listar productos:', error);
        }
    });
}

$(document).ready(function() {
    console.log('jQuery is Working');

    init();
    $('#product-result').hide();

    //Para el campo de búsqueda
    $('#search').keyup(function() {
        let search = $('#search').val();
        if (search) {
            $.ajax({
                url: './backend/product-search.php',
                type: 'GET',
                data: { search: search },
                success: function(response) {
                    let productos = JSON.parse(response);
                    let template = '';
                    let template_bar = '';

                    productos.forEach(producto => {
                        let descripcion = `
                            <li>precio: ${producto.precio}</li>
                            <li>unidades: ${producto.unidades}</li>
                            <li>modelo: ${producto.modelo}</li>
                            <li>marca: ${producto.marca}</li>
                            <li>detalles: ${producto.detalles}</li>
                        `;

                        template += `
                            <tr productId="${producto.id}">
                                <td>${producto.id}</td>
                                <td>${producto.nombre}</td>
                                <td><ul>${descripcion}</ul></td>
                                <td>
                                    <button class="product-edit btn btn-warning">Editar</button>
                                    <button class="product-delete btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        `;

                        template_bar += `<li>${producto.nombre}</li>`;
                    });

                    $('#product-result').show();
                    $('#container').html(template_bar);
                    $('#products').html(template);
                },
                error: function(xhr, status, error) {
                    console.error('Error en la búsqueda:', error);
                }
            });
        } else {
            $('#product-result').hide();
            listarProductos();
        }
    });

    //Para editar un producto
    $(document).on('click', '.product-edit', function() {
        let id = $(this).closest('tr').attr('productId');
    
        $.ajax({
            url: './backend/product-single.php',
            type: 'GET',
            data: { id: id },
            success: function(response) {
                let producto = JSON.parse(response);
    
                //Cargar los datos en el formulario
                $('#name').val(producto.nombre);
    
                let productoJSON = {
                    precio: parseFloat(producto.precio),
                    unidades: parseInt(producto.unidades),
                    modelo: producto.modelo,
                    marca: producto.marca,
                    detalles: producto.detalles,
                    imagen: producto.imagen
                };
    
                // Convertir el objeto a una cadena JSON
                $('#description').val(JSON.stringify(productoJSON, null, 2));
                $('#productId').val(producto.id); // Guardar el ID del producto para la edición
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener el producto:', error);
            }
        });
    });

    // Para el formulario de agregar/editar producto
    $('#product-form').submit(function(e) {
        e.preventDefault();
        console.log('Formulario enviado');
    
        // Validar el formulario antes de enviar los datos
        if (!validarFormulario()) {
            console.log('Validación fallida');
            return; // Detener el envío si hay errores
        }
    
        console.log('Formulario válido'); 
    
        let productoJsonString = $('#description').val();
        let finalJSON = JSON.parse(productoJsonString);
    
        finalJSON.precio = parseFloat(finalJSON.precio);
        finalJSON.unidades = parseInt(finalJSON.unidades);
    
        finalJSON['nombre'] = $('#name').val();
    
        let id = $('#productId').val();
        if (id) {
            finalJSON['id'] = id; // Agregar el ID al JSON
        }
    
        productoJsonString = JSON.stringify(finalJSON, null, 2);
    
        let url = id ? './backend/product-edit.php' : './backend/product-add.php'; 
    
        console.log('URL:', url); 
        console.log('Datos enviados:', productoJsonString);
    
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: productoJsonString,
            success: function(response) {
                console.log('Respuesta del servidor:', response); 
    
                try {
                    let respuesta = JSON.parse(response);
    
                    if (respuesta.status === 'success') {
                        alert(respuesta.message);
                    } else {
                        alert(respuesta.message);
                    }
    
                    let template_bar = `
                        <li style="list-style: none;">status: ${respuesta.status}</li>
                        <li style="list-style: none;">message: ${respuesta.message}</li>
                    `;
    
                    $('#product-result').show();
                    $('#container').html(template_bar);
                    listarProductos();
    
                    // Limpiar el formulario después de guardar
                    $('#product-form').trigger('reset');
                    $('#productId').val(''); // Limpiar el ID del producto
                } catch (e) {
                    alert('Hubo un problema al procesar la respuesta del servidor.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al guardar el producto:', error);
                alert('Hubo un problema al intentar guardar el producto.');
            }
        });
    });

    // Eliminar un producto
    $(document).on('click', '.product-delete', function() {
        // Mostrar confirmación antes de eliminar
        if (confirm("¿Está seguro que desea eliminar este producto?")) {
            let id = $(this).closest('tr').attr('productId');

            $.ajax({
                url: './backend/product-delete.php',
                type: 'GET',
                data: { id: id },
                success: function(response) {
                    let respuesta = JSON.parse(response);

                    // Mostrar mensaje de éxito con alert
                    alert('El producto fue eliminado exitosamente.');

                    // Mostrar el resultado en la barra de estado
                    let template_bar = `
                        <li style="list-style: none;">status: ${respuesta.status}</li>
                        <li style="list-style: none;">message: ${respuesta.message}</li>
                    `;

                    $('#product-result').show();
                    $('#container').html(template_bar);
                    listarProductos(); // Actualizar la lista de productos
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar producto:', error);
                }
            });
        } else {
            // Si el usuario cancela, no hacer nada
            console.log('Eliminación cancelada por el usuario.');
        }
    });
});

// Función para validar el formulario
function validarFormulario() {
    let nombre = $('#name').val().trim();
    let descripcion = $('#description').val().trim();

    // Validar que el nombre no esté vacío
    if (nombre === '') {
        alert('El campo "Nombre de producto" no puede estar vacío.');
        return false;
    }

    // Validar que el JSON no esté vacío
    if (descripcion === '') {
        alert('El campo "JSON de producto" no puede estar vacío.');
        return false;
    }

    // Validar que el JSON sea válido
    try {
        let json = JSON.parse(descripcion);

        // Validar que el precio no sea negativo
        if (json.precio < 0) {
            alert('El precio no puede ser un número negativo.');
            return false;
        }

        // Validar que las unidades no sean negativas
        if (json.unidades < 0) {
            alert('Las unidades no pueden ser un número negativo.');
            return false;
        }

        // Validar que las unidades sean un número entero
        if (!Number.isInteger(json.unidades)) {
            alert('Las unidades deben ser un número entero.');
            return false;
        }

        // Validar que el precio sea un número válido
        if (isNaN(json.precio)) {
            alert('El precio debe ser un número válido.');
            return false;
        }
    } catch (e) {
        alert('El campo "JSON de producto" debe contener un JSON válido.');
        return false;
    }

    return true;
}