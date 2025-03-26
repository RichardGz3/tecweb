// =============================================
// INITIALIZATION
// =============================================
$(document).ready(function() {
    console.log('✅ jQuery está funcionando');
    initApp();
});

function initApp() {
    // Mostrar estado inicial
    $('#product-result').hide();
    
    // Cargar lista inicial de productos
    listarProductos();
    
    // Configurar eventos
    setupEventHandlers();
    
    // Debug: Verificar eventos de click
    setupDebugListeners();
}

// =============================================
// EVENT HANDLERS
// =============================================
function setupEventHandlers() {
    // Eliminar producto
    $(document).on('click', '.product-delete', handleDeleteClick);
    
    // Buscar productos
    $('#search-form').submit(handleSearchSubmit);
    
    // Editar producto
    $(document).on('click', '.product-edit', handleEditClick);
    
    // Enviar formulario
    $('#product-form').submit(handleFormSubmit);
    
    // Validación de campos
    setupFormValidation();
}

function setupDebugListeners() {
    // Debug para verificar clicks
    $(document).on('click', function(e) {
        if ($(e.target).hasClass('product-delete')) {
            console.log('🟢 Debug: Click en ELIMINAR detectado', e.target);
        }
        if ($(e.target).hasClass('product-edit')) {
            console.log('🔵 Debug: Click en EDITAR detectado', e.target);
        }
    });
}

// =============================================
// MAIN FUNCTIONS
// =============================================

// 🗑️ Manejar click en eliminar
function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔴 Evento eliminar ejecutado');
    
    const productId = $(this).closest('tr').attr('data-product-id');
    
    if (!productId) {
        console.error('❌ Error: No se encontró ID del producto');
        showAlert('error', 'No se pudo identificar el producto');
        return;
    }

    showConfirmDialog(
        '⚠️ ¿Estás seguro de eliminar este producto?',
        () => deleteProduct(productId)
    );
}

// 🔍 Manejar búsqueda
function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = $('#search').val().trim();
    
    if (searchTerm.length >= 2) {
        searchProducts(searchTerm);
    } else {
        listarProductos();
    }
}

// ✏️ Manejar edición
function handleEditClick() {
    const productId = $(this).closest('tr').attr('data-product-id');
    
    $.ajax({
        url: './backend/product-single.php',
        type: 'GET',
        data: { id: productId },
        dataType: 'json',
        success: (producto) => {
            // Llenar formulario con datos del producto
            $('#name').val(producto.nombre);
            $('#precio').val(producto.precio);
            $('#unidades').val(producto.unidades);
            $('#modelo').val(producto.modelo);
            $('#marca').val(producto.marca);
            $('#detalles').val(producto.detalles);
            $('#imagen').val(producto.imagen);
            $('#productId').val(producto.id);
            
            // Cambiar texto del botón
            $('button.btn-primary').text("✏️ Modificar Producto");
        },
        error: (xhr) => {
            console.error('❌ Error al cargar producto:', xhr.responseText);
            showAlert('error', 'Error al cargar datos del producto');
        }
    });
}

// 📤 Manejar envío de formulario
function handleFormSubmit(e) {
    e.preventDefault();

    if (!validarFormulario()) {
        showAlert('error', 'Por favor complete todos los campos correctamente');
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
    
    showLoading(true);

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(producto),
        dataType: 'json',
        success: (response) => {
            handleFormResponse(response);
        },
        error: (xhr) => {
            console.error('❌ Error al guardar:', xhr.responseText);
            showAlert('error', 'Error al conectar con el servidor');
        },
        complete: () => {
            showLoading(false);
        }
    });
}

// =============================================
// CRUD OPERATIONS
// =============================================

function deleteProduct(productId) {
    showLoading(true);
    
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
                const errorMsg = response?.message || 'Error desconocido al eliminar';
                showAlert('error', `❌ ${errorMsg}`);
            }
        },
        error: (xhr) => {
            console.error('❌ Error al eliminar:', xhr.responseText);
            showAlert('error', 'Error al conectar con el servidor');
        },
        complete: () => {
            showLoading(false);
        }
    });
}

function searchProducts(searchTerm) {
    showLoading(true);
    
    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: { search: searchTerm },
        dataType: 'json',
        success: (response) => {
            if (Array.isArray(response)) {
                renderProductList(response);
            } else if (response?.status === 'error') {
                showAlert('error', response.message);
                $('#products').html(`<tr><td colspan="4">${response.message}</td></tr>`);
            } else {
                console.error('Respuesta inesperada:', response);
                showAlert('error', 'Formato de respuesta inesperado');
            }
        },
        error: (xhr) => {
            console.error('❌ Error al buscar:', xhr.responseText);
            showAlert('error', 'Error al buscar productos');
            $('#products').html('<tr><td colspan="4">Error al buscar</td></tr>');
        },
        complete: () => {
            showLoading(false);
        }
    });
}

function listarProductos() {
    showLoading(true);
    
    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        dataType: 'json',
        success: (productos) => {
            renderProductList(productos);
        },
        error: (xhr) => {
            console.error('❌ Error al cargar lista:', xhr.responseText);
            showAlert('error', 'Error al cargar productos');
            $('#products').html('<tr><td colspan="4">Error al cargar</td></tr>');
        },
        complete: () => {
            showLoading(false);
        }
    });
}

// =============================================
// UI RENDERING
// =============================================

function renderProductList(productos) {
    let template = '';

    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            template += `
                <tr data-product-id="${producto.id}">
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li><strong>Precio:</strong> $${producto.precio}</li>
                            <li><strong>Unidades:</strong> ${producto.unidades}</li>
                            <li><strong>Modelo:</strong> ${producto.modelo}</li>
                            <li><strong>Marca:</strong> ${producto.marca}</li>
                        </ul>
                    </td>
                    <td class="product-actions">
                        <button class="product-edit btn btn-warning btn-sm">Editar</button>
                        <button class="product-delete btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } else {
        template = '<tr><td colspan="4">No se encontraron productos</td></tr>';
    }

    $('#products').html(template);
}

function handleFormResponse(response) {
    if (response?.status === 'success') {
        showAlert('success', response.message);
        
        // Mostrar feedback
        $('#product-result').show();
        $('#container').html(`
            <li style="list-style: none;">status: ${response.status}</li>
            <li style="list-style: none;">message: ${response.message}</li>
        `);
        
        // Resetear formulario
        $('#product-form').trigger('reset');
        $('#productId').val('');
        $('button.btn-primary').text("➕ Agregar Producto");
        
        // Actualizar lista
        listarProductos();
    } else {
        showAlert('error', response?.message || 'Error desconocido');
    }
}

// =============================================
// FORM VALIDATION
// =============================================

function setupFormValidation() {
    $('#name').blur(validarNombre);
    $('#precio').blur(validarPrecio);
    $('#unidades').blur(validarUnidades);
    $('#modelo').blur(validarModelo);
    $('#marca').blur(validarMarca);
    $('#detalles').blur(validarDetalles);
    $('#imagen').blur(validarImagen);
    $('#name').keyup(validarNombreExistente);
}

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
        mostrarError('name', 'Nombre requerido');
        return false;
    }
    ocultarError('name');
    return true;
}

function validarPrecio() {
    const precio = $('#precio').val().trim();
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
        mostrarError('precio', 'Precio inválido');
        return false;
    }
    ocultarError('precio');
    return true;
}

function validarUnidades() {
    const unidades = $('#unidades').val().trim();
    if (!unidades || isNaN(unidades) || parseInt(unidades) < 0) {
        mostrarError('unidades', 'Unidades inválidas');
        return false;
    }
    ocultarError('unidades');
    return true;
}

function validarModelo() {
    const modelo = $('#modelo').val().trim();
    if (!modelo) {
        mostrarError('modelo', 'Modelo requerido');
        return false;
    }
    ocultarError('modelo');
    return true;
}

function validarMarca() {
    const marca = $('#marca').val().trim();
    if (!marca) {
        mostrarError('marca', 'Marca requerida');
        return false;
    }
    ocultarError('marca');
    return true;
}

function validarDetalles() {
    const detalles = $('#detalles').val().trim();
    if (!detalles) {
        mostrarError('detalles', 'Detalles requeridos');
        return false;
    }
    ocultarError('detalles');
    return true;
}

function validarImagen() {
    const imagen = $('#imagen').val().trim();
    if (!imagen) {
        mostrarError('imagen', 'Imagen requerida');
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
                mostrarError('name', 'Este producto ya existe');
            } else {
                ocultarError('name');
            }
        },
        error: (xhr) => {
            console.error('Error al validar nombre:', xhr.responseText);
        }
    });
}

function mostrarError(campo, mensaje) {
    $(`#${campo}`).addClass('is-invalid');
    $(`#${campo}-error`).text(mensaje);
}

function ocultarError(campo) {
    $(`#${campo}`).removeClass('is-invalid');
    $(`#${campo}-error`).text('');
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function showAlert(type, message) {
    // Puedes reemplazar esto con SweetAlert o similar
    alert(message);
}

function showConfirmDialog(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

function showLoading(show) {
    if (show) {
        $('#products').html('<tr><td colspan="4">Cargando...</td></tr>');
        $('.btn').prop('disabled', true);
    } else {
        $('.btn').prop('disabled', false);
    }
}