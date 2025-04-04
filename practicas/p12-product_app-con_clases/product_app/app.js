// JSON BASE PARA DESCRIPCIÓN
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
};

$(document).ready(function(){
    let edit = false;
    $('#product-result').hide();
    listarProductos();

    function listarProductos() {
        $.ajax({
            url: './backend/product-list.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                let html = '';
                
                if (response && response.data && response.data.length > 0) {
                    response.data.forEach(producto => {
                        html += `
                            <tr productId="${producto.id}">
                                <td>${producto.id}</td>
                                <td><a href="#" class="product-item">${producto.nombre}</a></td>
                                <td>
                                    <ul>
                                        <li>Precio: ${producto.precio}</li>
                                        <li>Unidades: ${producto.unidades}</li>
                                        <li>Marca: ${producto.marca}</li>
                                        <li>Modelo: ${producto.modelo}</li>
                                        <li>Detalles: ${producto.detalles}</li>
                                    </ul>
                                </td>
                                <td>
                                    <button class="btn btn-danger product-delete">Eliminar</button>
                                </td>
                            </tr>
                        `;
                    });
                } else {
                    html = '<tr><td colspan="4">No hay productos registrados</td></tr>';
                }
                
                $('#products').html(html);
            },
            error: function() {
                $('#products').html('<tr><td colspan="4">Error al cargar productos</td></tr>');
            }
        });
    }

// Barra de búsqueda funcional
$('#search').on('input', function() {
    const searchTerm = $(this).val().trim().toLowerCase();
    
    if (searchTerm.length < 2) {
        $('#product-result').hide();
        listarProductos();
        return;
    }

    // Filtrar localmente los productos existentes
    const $rows = $('#products tr[productId]');
    let hasMatches = false;
    
    $rows.each(function() {
        const $row = $(this);
        const productName = $row.find('.product-item').text().toLowerCase();
        const productDetails = $row.text().toLowerCase();
        
        if (productName.includes(searchTerm) || productDetails.includes(searchTerm)) {
            $row.show();
            hasMatches = true;
        } else {
            $row.hide();
        }
    });

    // Mostrar mensaje si no hay coincidencias
    if (!hasMatches) {
        $('#products').html('<tr><td colspan="4">No se encontraron coincidencias</td></tr>');
    }
});

$('#product-form').submit(function(e) {
    e.preventDefault();
    
    // Validación básica
    const nombre = $('#name').val().trim();
    const precio = $('#price').val();
    
    if (!nombre) {
        alert('El nombre del producto es requerido');
        return;
    }
    
    if (!precio || isNaN(precio)) {
        alert('El precio debe ser un número válido');
        return;
    }
    
    // Preparar datos para enviar
    const formData = {
        id: $('#productId').val(),  // Importante para edición
        nombre: nombre,
        precio: parseFloat(precio),
        unidades: parseInt($('#units').val()) || 1,
        marca: $('#brand').val().trim() || 'NA',
        modelo: $('#model').val().trim() || 'XX-000',
        detalles: $('#details').val().trim() || 'NA',
        imagen: $('#image').val().trim() || 'img/default.png'
    };
    
    // Determinar si es creación o edición
    const url = formData.id ? './backend/product-update.php' : './backend/product-add.php';
    const method = 'POST';
    
    console.log("Enviando datos a", url, ":", formData); // Para depuración
    
    // Enviar la solicitud
    $.ajax({
        url: url,
        type: method,
        data: formData,
        dataType: 'json',
        success: function(response) {
            console.log("Respuesta del servidor:", response);
            
            if (response && response.status === 'success') {
                alert(formData.id ? 'Producto actualizado' : 'Producto creado');
                resetForm();
                listarProductos();
            } else {
                alert('Error: ' + (response.message || 'Error desconocido'));
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la petición:", {
                status: xhr.status,
                error: error,
                response: xhr.responseText
            });
            alert('Error al procesar la solicitud. Ver consola para detalles.');
        }
    });
});

function resetForm() {
    $('#product-form')[0].reset();
    $('#productId').val('');
    $('#submit-btn').text('Agregar Producto');
}

    // Edición de productos - Versión garantizada
$(document).on('click', '.product-item', function(e) {
    e.preventDefault();
    
    const $row = $(this).closest('tr');
    const productId = $row.attr('productId');
    
    // Extraer datos directamente de la fila (método confiable)
    const productData = {
        id: productId,
        nombre: $row.find('td:eq(1)').text().trim(),
        precio: parseFloat($row.find('td:eq(2) li:eq(0)').text().replace('Precio: ', '')),
        unidades: parseInt($row.find('td:eq(2) li:eq(1)').text().replace('Unidades: ', '')),
        marca: $row.find('td:eq(2) li:eq(3)').text().replace('Marca: ', ''),
        modelo: $row.find('td:eq(2) li:eq(4)').text().replace('Modelo: ', ''),
        detalles: $row.find('td:eq(2) li:eq(5)').text().replace('Detalles: ', ''),
        imagen: 'img/default.png' // Valor por defecto
    };
    
    // Llenar el formulario
    $('#name').val(productData.nombre);
    $('#price').val(productData.precio);
    $('#units').val(productData.unidades);
    $('#brand').val(productData.marca);
    $('#model').val(productData.modelo);
    $('#details').val(productData.detalles);
    $('#productId').val(productData.id);
    
    // Cambiar a modo edición
    $('#submit-btn').text('Actualizar Producto');
    
    // Hacer scroll al formulario
    $('html, body').animate({
        scrollTop: $('#product-form').offset().top
    }, 200);
});

    // Eliminar producto
    $(document).on('click', '.product-delete', function(e) {
        if(confirm('¿Estás seguro de eliminar este producto?')) {
            const element = $(this).closest('tr');
            const id = element.attr('productId');
            
            $.post('./backend/product-delete.php', {id: id}, function(response) {
                try {
                    const result = JSON.parse(response);
                    if(result.status === 'success') {
                        alert('Producto eliminado correctamente');
                        listarProductos();
                    } else {
                        alert('Error: ' + (result.message || 'Error al eliminar'));
                    }
                } catch (e) {
                    console.error("Error al eliminar:", e);
                    alert('Error al procesar la respuesta');
                }
                $('#product-result').hide();
            });
        }
    });
});