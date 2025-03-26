$(document).ready(function() {
    console.log('✅ jQuery está funcionando');
    initApp();
});

// ======================
// 1. INICIALIZACIÓN
// ======================
function initApp() {
    listarProductos();
    $('#product-result').hide();
    setupEventHandlers();
}

// ======================
// 2. CONFIGURACIÓN DE EVENTOS
// ======================
function setupEventHandlers() {
    // Eliminar producto
    $(document).on('click', '.product-delete', handleDeleteProduct);

    // Buscar productos
    $('#search-form').submit(handleSearchProducts);

    // Editar producto
    $(document).on('click', '.product-edit', handleEditProduct);

    // Enviar formulario (agregar/editar)
    $('#product-form').submit(handleSubmitProductForm);

    // Validación de campos
    $('#name').blur(validarNombre);
    $('#precio').blur(validarPrecio);
    $('#unidades').blur(validarUnidades);
    $('#modelo').blur(validarModelo);
    $('#marca').blur(validarMarca);
    $('#detalles').blur(validarDetalles);
    $('#imagen').blur(validarImagen);

    // Validación asíncrona del nombre
    $('#name').keyup(validarNombreExistente);
}

// ======================
// 3. MANEJADORES PRINCIPALES
// ======================

// 🗑️ Eliminar producto
function handleDeleteProduct(e) {
    e.preventDefault();
    const productId = $(this).closest('tr').attr('productId');

    if (!productId) {
        console.error('❌ ID de producto no encontrado');
        showAlert('error', 'No se pudo identificar el producto');
        return;
    }

    showConfirmDialog(
        '⚠️ ¿Estás seguro de eliminar este producto?',
        () => {
            $.ajax({
                url: './backend/product-delete.php',
                type: 'GET',
                data: { id: productId },
                dataType: 'json',
                success: (response) => {
                    if (response && response.status === 'success') {
                        showAlert('success', '✅ Producto eliminado correctamente');
                        listarProductos();
                    } else {
                        const errorMsg = response?.message || '❌ Error al eliminar el producto';
                        showAlert('error', errorMsg);
                    }
                },
                error: (xhr, status, error) => {
                    console.error('❌ Error al eliminar:', xhr.responseText);
                    showAlert('error', '🔌 Error de conexión con el servidor');
                }
            });
        }
    );
}

// 🔍 Buscar productos
function handleSearchProducts(e) {
    e.preventDefault();
    const searchTerm = $('#search').val().trim();

    if (searchTerm.length < 2) {
        listarProductos();
        return;
    }

    showLoading(true);

    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: { search: searchTerm },
        dataType: 'json',
        success: (response) => {
            showLoading(false);

            if (Array.isArray(response)) {
                mostrarResultadosBusqueda(response);
            } else if (response?.status === 'error') {
                showAlert('error', response.message);
                $('#products').html(`<tr><td colspan="4">${response.message}</td></tr>`);
            } else {
                showAlert('error', '⚠️ Respuesta inesperada del servidor');
                console.error('Respuesta inesperada:', response);
            }
        },
        error: (xhr, status, error) => {
            showLoading(false);
            console.error('❌ Error al buscar:', xhr.responseText);
            showAlert('error', '🔍 Error al buscar productos');
            $('#products').html('<tr><td colspan="4">Error al buscar productos</td></tr>');
        }
    });
}

// ✏️ Editar producto
function handleEditProduct() {
    const id = $(this).closest('tr').attr('productId');

    $.ajax({
        url: './backend/product-single.php',
        type: 'GET',
        data: { id },
        dataType: 'json',
        success: (producto) => {
            $('#name').val(producto.nombre);
            $('#precio').val(producto.precio);
            $('#unidades').val(producto.unidades);
            $('#modelo').val(producto.modelo);
            $('#marca').val(producto.marca);
            $('#detalles').val(producto.detalles);
            $('#imagen').val(producto.imagen);
            $('#productId').val(producto.id);
            $('button.btn-primary').text("✏️ Modificar Producto");
        },
        error: (xhr, status, error) => {
            console.error('❌ Error al cargar producto:', xhr.responseText);
            showAlert('error', '⚠️ Error al cargar el producto');
        }
    });
}

// 📤 Enviar formulario (Agregar/Editar)
function handleSubmitProductForm(e) {
    e.preventDefault();

    if (!validarFormulario()) {
        showAlert('error', '❌ Por favor, corrige los errores en el formulario');
        return;
    }

    const producto = {
        nombre: $('#name').val().trim(),
        precio: parseFloat($('#precio').val().trim()),
        unidades: parseInt($('#unidades').val().trim()),
        modelo: $('#modelo').val().trim(),
        marca: $('#marca').val().trim(),
        detalles: $('#detalles').val().trim(),
        imagen: $('#imagen').val().trim()
    };

    const id = $('#productId').val();
    if (id) producto.id = id;

    const url = id ? './backend/product-edit.php' : './backend/product-add.php';
    const productoJson = JSON.stringify(producto);

    showLoading(true);

    $.ajax({
        url,
        type: 'POST',
        contentType: 'application/json',
        data: productoJson,
        dataType: 'json',
        success: (response) => {
            showLoading(false);

            if (response?.status === 'success') {
                showAlert('success', `✅ ${response.message}`);
                $('#product-result').show();
                $('#container').html(`
                    <li style="list-style: none;">status: ${response.status}</li>
                    <li style="list-style: none;">message: ${response.message}</li>
                `);
                listarProductos();
                $('#product-form').trigger('reset');
                $('#productId').val('');
                $('button.btn-primary').text("➕ Agregar Producto");
            } else {
                showAlert('error', `❌ ${response?.message || 'Error desconocido'}`);
            }
        },
        error: (xhr, status, error) => {
            showLoading(false);
            console.error('❌ Error al guardar:', xhr.responseText);
            showAlert('error', '🔌 Error de conexión con el servidor');
        }
    });
}

// ======================
// 4. FUNCIONES AUXILIARES
// ======================

// 🔄 Listar productos
function listarProductos() {
    showLoading(true);

    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        dataType: 'json',
        success: (productos) => {
            showLoading(false);
            renderProductList(productos);
        },
        error: (xhr, status, error) => {
            showLoading(false);
            console.error('❌ Error al cargar productos:', xhr.responseText);
            showAlert('error', '⚠️ Error al cargar la lista');
            $('#products').html('<tr><td colspan="4">Error al cargar productos</td></tr>');
        }
    });
}

// 🖼️ Renderizar lista de productos
function renderProductList(productos) {
    let template = '';

    if (productos?.length > 0) {
        productos.forEach(producto => {
            template += `
                <tr productId="${producto.id}">
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>
                        <ul>
                            <li>Precio: $${producto.precio}</li>
                            <li>Unidades: ${producto.unidades}</li>
                            <li>Modelo: ${producto.modelo}</li>
                            <li>Marca: ${producto.marca}</li>
                        </ul>
                    </td>
                    <td>
                        <button class="product-edit btn btn-warning">✏️ Editar</button>
                        <button class="product-delete btn btn-danger">🗑️ Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } else {
        template = '<tr><td colspan="4">No hay productos disponibles</td></tr>';
    }

    $('#products').html(template);
}

// 🔍 Mostrar resultados de búsqueda
function mostrarResultadosBusqueda(productos) {
    renderProductList(productos);
}

// ======================
// 5. VALIDACIÓN DE FORMULARIO
// ======================
function validarFormulario() {
    let valido = true;
    valido = validarNombre() && valido;
    valido = validarPrecio() && valido;
    valido = validarUnidades() && valido;
    valido = validarModelo() && valido;
    valido = validarMarca() && valido;
    valido = validarDetalles() && valido;
    valido = validarImagen() && valido;
    return valido;
}

function validarNombre() {
    const nombre = $('#name').val().trim();
    if (!nombre) {
        mostrarError('name', 'El nombre no puede estar vacío');
        return false;
    }
    ocultarError('name');
    return true;
}

function validarPrecio() {
    const precio = $('#precio').val().trim();
    if (!precio || isNaN(precio) || parseFloat(precio) < 0) {
        mostrarError('precio', 'Precio inválido (debe ser un número positivo)');
        return false;
    }
    ocultarError('precio');
    return true;
}

function validarUnidades() {
    const unidades = $('#unidades').val().trim();
    if (!unidades || isNaN(unidades) || parseInt(unidades) < 0) {
        mostrarError('unidades', 'Unidades inválidas (debe ser un número positivo)');
        return false;
    }
    ocultarError('unidades');
    return true;
}

function validarModelo() {
    const modelo = $('#modelo').val().trim();
    if (!modelo) {
        mostrarError('modelo', 'El modelo no puede estar vacío');
        return false;
    }
    ocultarError('modelo');
    return true;
}

function validarMarca() {
    const marca = $('#marca').val().trim();
    if (!marca) {
        mostrarError('marca', 'La marca no puede estar vacía');
        return false;
    }
    ocultarError('marca');
    return true;
}

function validarDetalles() {
    const detalles = $('#detalles').val().trim();
    if (!detalles) {
        mostrarError('detalles', 'Los detalles no pueden estar vacíos');
        return false;
    }
    ocultarError('detalles');
    return true;
}

function validarImagen() {
    const imagen = $('#imagen').val().trim();
    if (!imagen) {
        mostrarError('imagen', 'La imagen no puede estar vacía');
        return false;
    }
    ocultarError('imagen');
    return true;
}

function validarNombreExistente() {
    const nombre = $('#name').val().trim();
    if (!nombre) return;

    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: { search: nombre },
        dataType: 'json',
        success: (productos) => {
            if (productos?.length > 0) {
                mostrarError('name', '⚠️ Este producto ya existe');
            } else {
                ocultarError('name');
            }
        },
        error: (xhr, status, error) => {
            console.error('❌ Error al validar nombre:', xhr.responseText);
        }
    });
}

// ======================
// 6. UTILIDADES
// ======================
function mostrarError(campo, mensaje) {
    $(`#${campo}`).addClass('is-invalid');
    $(`#${campo}-error`).text(mensaje);
}

function ocultarError(campo) {
    $(`#${campo}`).removeClass('is-invalid');
    $(`#${campo}-error`).text('');
}

function showAlert(type, message) {
    alert(message); // Puedes reemplazarlo con SweetAlert o Toast
}

function showConfirmDialog(message, callback) {
    if (confirm(message)) callback();
}

function showLoading(show) {
    if (show) {
        $('#products').html('<tr><td colspan="4">⌛ Cargando...</td></tr>');
        $('.btn').prop('disabled', true);
    } else {
        $('.btn').prop('disabled', false);
    }
}