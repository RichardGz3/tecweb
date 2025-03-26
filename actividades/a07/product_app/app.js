$(document).ready(function() {
    console.log('jQuery is Working');

    // Inicializar la lista de productos
    listarProductos();
    $('#product-result').hide();

    $(document).on('click', '.product-delete', function(e) {
        e.preventDefault();
        const productId = $(this).closest('tr').attr('productId');
        
        if (!productId) {
            console.error('ID de producto no encontrado');
            return;
        }

        if (confirm('¿Estás seguro de eliminar este producto?')) {
            $.ajax({
                url: './backend/product-delete.php',
                type: 'GET',
                data: { id: productId },
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        alert('Producto eliminado correctamente');
                        listarProductos(); // Recargar la lista
                    } else {
                        alert('Error: ' + (response.message || 'No se pudo eliminar'));
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar:', error);
                    alert('Error al conectar con el servidor');
                }
            });
        }
    });

    // 2. EVENTO PARA BUSCAR PRODUCTOS (FALTANTE)
    $('#search-form').submit(function(e) {
        e.preventDefault();
        const searchTerm = $('#search').val().trim();
        
        if (searchTerm.length >= 2) {
            $.ajax({
                url: './backend/product-search.php',
                type: 'GET',
                data: { search: searchTerm },
                dataType: 'json',
                success: function(response) {
                    if (response.length > 0) {
                        mostrarResultadosBusqueda(response);
                    } else {
                        $('#products').html('<tr><td colspan="4">No se encontraron productos</td></tr>');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error al buscar:', error);
                    $('#products').html('<tr><td colspan="4">Error al buscar productos</td></tr>');
                }
            });
        } else {
            listarProductos(); // Mostrar todos si la búsqueda es muy corta
        }
    });

    // Cambiar el texto del botón a "Modificar Producto" al editar un producto
    $(document).on('click', '.product-edit', function() {
        let id = $(this).closest('tr').attr('productId');

        $.ajax({
            url: './backend/product-single.php',
            type: 'GET',
            data: { id: id },
            success: function(response) {
                console.log('Respuesta del servidor (editar producto):', response); // Debug
                let producto = JSON.parse(response);

                // Cargar los datos en el formulario
                $('#name').val(producto.nombre);
                $('#precio').val(producto.precio);
                $('#unidades').val(producto.unidades);
                $('#modelo').val(producto.modelo);
                $('#marca').val(producto.marca);
                $('#detalles').val(producto.detalles);
                $('#imagen').val(producto.imagen);
                $('#productId').val(producto.id); // Guardar el ID del producto para la edición

                // Cambiar el texto del botón a "Modificar Producto"
                $('button.btn-primary').text("Modificar Producto");
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener el producto:', error);
                alert('Error al cargar el producto para editar. Verifica la consola para más detalles.');
            }
        });
    });

    // Cambiar el texto del botón a "Agregar Producto" al enviar el formulario
    $('#product-form').submit(function(e) {
        e.preventDefault();

        // Validar el formulario antes de enviar los datos
        if (!validarFormulario()) {
            console.log('Validación fallida');
            return; // Detener el envío si hay errores
        }

        // Crear el objeto JSON con los datos del formulario
        let producto = {
            nombre: $('#name').val().trim(),
            precio: parseFloat($('#precio').val().trim()),
            unidades: parseInt($('#unidades').val().trim()),
            modelo: $('#modelo').val().trim(),
            marca: $('#marca').val().trim(),
            detalles: $('#detalles').val().trim(),
            imagen: $('#imagen').val().trim()
        };

        // Agregar el ID si estamos editando
        let id = $('#productId').val();
        if (id) {
            producto.id = id;
        }

        let url = id ? './backend/product-edit.php' : './backend/product-add.php';
        let productoJsonString = JSON.stringify(producto);

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

                    // Mostrar el resultado en la barra de estado
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

                    // Cambiar el texto del botón a "Agregar Producto"
                    $('button.btn-primary').text("Agregar Producto");
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

    // Validar cada campo cuando se pierde el foco
    $('#name').blur(validarNombre);
    $('#precio').blur(validarPrecio);
    $('#unidades').blur(validarUnidades);
    $('#modelo').blur(validarModelo);
    $('#marca').blur(validarMarca);
    $('#detalles').blur(validarDetalles);
    $('#imagen').blur(validarImagen);

    // Validar el nombre del producto asíncronamente
    $('#name').keyup(function() {
        validarNombreExistente();
    });
});

// Función para listar productos
function listarProductos() {
    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        success: function(response) {
            console.log('Respuesta del servidor (lista de productos):', response); // Debug
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
            alert('Error al cargar la lista de productos. Verifica la consola para más detalles.');
        }
    });
}

// Función para validar el formulario
function validarFormulario() {
    let valido = true;

    if (!validarNombre()) valido = false;
    if (!validarPrecio()) valido = false;
    if (!validarUnidades()) valido = false;
    if (!validarModelo()) valido = false;
    if (!validarMarca()) valido = false;
    if (!validarDetalles()) valido = false;
    if (!validarImagen()) valido = false;

    return valido;
}

// Funciones de validación individuales
function validarNombre() {
    let nombre = $('#name').val().trim();
    if (nombre === '') {
        mostrarError('name', 'El nombre no puede estar vacío.');
        return false;
    } else {
        ocultarError('name');
        return true;
    }
}

function validarPrecio() {
    let precio = $('#precio').val().trim();
    if (precio === '' || isNaN(precio) || parseFloat(precio) < 0) {
        mostrarError('precio', 'El precio debe ser un número válido y no negativo.');
        return false;
    } else {
        ocultarError('precio');
        return true;
    }
}

function validarUnidades() {
    let unidades = $('#unidades').val().trim();
    if (unidades === '' || isNaN(unidades) || parseInt(unidades) < 0) {
        mostrarError('unidades', 'Las unidades deben ser un número entero no negativo.');
        return false;
    } else {
        ocultarError('unidades');
        return true;
    }
}

function validarModelo() {
    let modelo = $('#modelo').val().trim();
    if (modelo === '') {
        mostrarError('modelo', 'El modelo no puede estar vacío.');
        return false;
    } else {
        ocultarError('modelo');
        return true;
    }
}

function validarMarca() {
    let marca = $('#marca').val().trim();
    if (marca === '') {
        mostrarError('marca', 'La marca no puede estar vacía.');
        return false;
    } else {
        ocultarError('marca');
        return true;
    }
}

function validarDetalles() {
    let detalles = $('#detalles').val().trim();
    if (detalles === '') {
        mostrarError('detalles', 'Los detalles no pueden estar vacíos.');
        return false;
    } else {
        ocultarError('detalles');
        return true;
    }
}

function validarImagen() {
    let imagen = $('#imagen').val().trim();
    if (imagen === '') {
        mostrarError('imagen', 'La imagen no puede estar vacía.');
        return false;
    } else {
        ocultarError('imagen');
        return true;
    }
}

// Función para validar si el nombre del producto ya existe
function validarNombreExistente() {
    let nombre = $('#name').val().trim();
    if (nombre !== '') {
        $.ajax({
            url: './backend/product-search.php',
            type: 'GET',
            data: { search: nombre },
            success: function(response) {
                let productos = JSON.parse(response);
                if (productos.length > 0) {
                    mostrarError('name', 'El nombre del producto ya existe.');
                } else {
                    ocultarError('name');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la búsqueda:', error);
            }
        });
    }
}

// Función para mostrar errores en los campos
function mostrarError(campo, mensaje) {
    $('#' + campo).addClass('is-invalid');
    $('#' + campo + '-error').text(mensaje);
}

// Función para ocultar errores en los campos
function ocultarError(campo) {
    $('#' + campo).removeClass('is-invalid');
    $('#' + campo + '-error').text('');
}

// Agrega esta función al final de tu archivo app.js
function mostrarResultadosBusqueda(productos) {
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

    $('#products').html(template || '<tr><td colspan="4">No se encontraron productos</td></tr>');
}

/*$(document).on('click', '.product-delete', function(e) {
    e.preventDefault();
    const productId = $(this).closest('tr').attr('productId');
    
    if (!productId) {
        console.error('ID de producto no encontrado');
        return;
    }

    if (confirm('¿Estás seguro de eliminar este producto?')) {
        $.ajax({
            url: './backend/product-delete.php',
            type: 'GET',
            data: { id: productId },
            dataType: 'json',
            success: function(response) {
                if (response && response.status === 'success') {
                    alert(response.message || 'Producto eliminado correctamente');
                    listarProductos();
                } else {
                    alert(response.message || 'Error al eliminar el producto');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar:', error);
                alert('Error de conexión con el servidor');
            }
        });
    }
});*/