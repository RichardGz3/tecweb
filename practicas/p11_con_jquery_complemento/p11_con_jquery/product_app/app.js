// JSON BASE A MOSTRAR EN FORMULARIO
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

    // let JsonString = JSON.stringify(baseJSON,null,2);
    // $('#description').val(JsonString);
    $('#product-result').hide();
    listarProductos();

    function listarProductos() {
        $.ajax({
            url: './backend/product-list.php',
            type: 'GET',
            success: function(response) {
                // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                const productos = JSON.parse(response);
            
                // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                if(Object.keys(productos).length > 0) {
                    // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                    let template = '';

                    productos.forEach(producto => {
                        // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                        let descripcion = '';
                        descripcion += '<li>precio: '+producto.precio+'</li>';
                        descripcion += '<li>unidades: '+producto.unidades+'</li>';
                        descripcion += '<li>modelo: '+producto.modelo+'</li>';
                        descripcion += '<li>marca: '+producto.marca+'</li>';
                        descripcion += '<li>detalles: '+producto.detalles+'</li>';
                    
                        template += `
                            <tr productId="${producto.id}">
                                <td>${producto.id}</td>
                                <td><a href="#" class="product-item">${producto.nombre}</a></td>
                                <td><ul>${descripcion}</ul></td>
                                <td>
                                    <button class="product-delete btn btn-danger" onclick="eliminarProducto()">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                    $('#products').html(template);
                }
            }
        });
    }

    $('#search').keyup(function() {
        if($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: './backend/product-search.php?search='+$('#search').val(),
                data: {search},
                type: 'GET',
                success: function (response) {
                    if(!response.error) {
                        // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                        const productos = JSON.parse(response);
                        
                        // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                        if(Object.keys(productos).length > 0) {
                            // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                            let template = '';
                            let template_bar = '';

                            productos.forEach(producto => {
                                // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                                let descripcion = '';
                                descripcion += '<li>precio: '+producto.precio+'</li>';
                                descripcion += '<li>unidades: '+producto.unidades+'</li>';
                                descripcion += '<li>modelo: '+producto.modelo+'</li>';
                                descripcion += '<li>marca: '+producto.marca+'</li>';
                                descripcion += '<li>detalles: '+producto.detalles+'</li>';
                            
                                template += `
                                    <tr productId="${producto.id}">
                                        <td>${producto.id}</td>
                                        <td><a href="#" class="product-item">${producto.nombre}</a></td>
                                        <td><ul>${descripcion}</ul></td>
                                        <td>
                                            <button class="product-delete btn btn-danger">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                `;

                                template_bar += `
                                    <li>${producto.nombre}</il>
                                `;
                            });
                            // SE HACE VISIBLE LA BARRA DE ESTADO
                            $('#product-result').show();
                            // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
                            $('#container').html(template_bar);
                            // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                            $('#products').html(template);    
                        }
                    }
                }
            });
        }
        else {
            $('#product-result').hide();
        }
    });

    $('#product-form').submit(e => {
        e.preventDefault();

        // SE CONVIERTE EL JSON DE STRING A OBJETO
        let postData = JSON.parse( $('#description').val() );
        // SE AGREGA AL JSON EL NOMBRE DEL PRODUCTO
        postData['nombre'] = $('#name').val();
        postData['id'] = $('#productId').val();

        /**
         * AQUÍ DEBES AGREGAR LAS VALIDACIONES DE LOS DATOS EN EL JSON
         * --> EN CASO DE NO HABER ERRORES, SE ENVIAR EL PRODUCTO A AGREGAR
         **/

        let valido = true;
        $('#product-form input').each(function () {
            if ($(this).val().trim() === '') {
                mostrarError($(this).attr('id'), 'Este campo es requerido');
                valido = false;
            }
        });

        // Si algún campo no es válido, detener el envío del formulario
        if (!valido) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        /*if ($('#name').val() === '' || $('#marca').val() === '' || $('#modelo').val() === '' || $('#precio').val() === '' || $('#detalles').val() === '' || $('#unidades').val() === '' || $('#imagen').val() === '') {
            alert('Los campos estan vacios');
            return;
        }*/

        const url = edit === false ? './backend/product-add.php' : './backend/product-edit.php';
        
        $.post(url, postData, (response) => {
            //console.log(response);
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let respuesta = JSON.parse(response);
            // SE CREA UNA PLANTILLA PARA CREAR INFORMACIÓN DE LA BARRA DE ESTADO
            let template_bar = '';
            template_bar += `
                        <li style="list-style: none;">status: ${respuesta.status}</li>
                        <li style="list-style: none;">message: ${respuesta.message}</li>
                    `;
            // SE REINICIA EL FORMULARIO
            $('#name').val('');
            $('#description').val(JsonString);
            // SE HACE VISIBLE LA BARRA DE ESTADO
            $('#product-result').show();
            // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
            $('#container').html(template_bar);
            // SE LISTAN TODOS LOS PRODUCTOS
            listarProductos();

            // CAMBIAR EL TEXTO DEL BOTON A "Agregar Producto"
            $('button.btn-primary').text("Agregar Producto")

            // SE REGRESA LA BANDERA DE EDICIÓN A false
            edit = false;
        });
    });

    $(document).on('click', '.product-delete', (e) => {
        if(confirm('¿Realmente deseas eliminar el producto?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr('productId');
            $.post('./backend/product-delete.php', {id}, (response) => {
                $('#product-result').hide();
                listarProductos();
            });
        }

        /*// CAMBIAR EL TEXTO DEL BOTON A "Modificar Producto" En la practica dice que deberia de ir aqui, pero el texto se modifica unicamente cuando presiono el boton de 'Eliminar', por lo que lo agregue en la funcion de abajo
        $('button.btn-primary').text("Modificar Producto");*/

    });

    $(document).on('click', '.product-item', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('productId');
        $.post('./backend/product-single.php', {id}, (response) => {
            // SE CONVIERTE A OBJETO EL JSON OBTENIDO
            let product = JSON.parse(response);
            // SE INSERTAN LOS DATOS ESPECIALES EN LOS CAMPOS CORRESPONDIENTES
            $('#name').val(product.nombre);
            // EL ID SE INSERTA EN UN CAMPO OCULTO PARA USARLO DESPUÉS PARA LA ACTUALIZACIÓN
            $('#productId').val(product.id);
            // SE ELIMINA nombre, eliminado E id PARA PODER MOSTRAR EL JSON EN EL <textarea>
            delete(product.nombre);
            delete(product.eliminado);
            delete(product.id);
            // SE CONVIERTE EL OBJETO JSON EN STRING
            let JsonString = JSON.stringify(product,null,2);
            // SE MUESTRA STRING EN EL <textarea>
            $('#description').val(JsonString);
            
            // CAMBIAR EL TEXTO DEL BOTON A "Modificar Producto"
            $('button.btn-primary').text("Modificar Producto");

            // SE PONE LA BANDERA DE EDICIÓN EN true
            edit = true;
        });
        e.preventDefault();
    });    
});

// Función para validar el campo "Nombre"
$('#name').on('blur', function () {
    let nombre = $('#name').val().trim();
    if (nombre === '') {
        mostrarError('name', 'El nombre es requerido');
    } else {
        mostrarExito('name');
    }
});

// Función para validar el campo "Marca"
$('#marca').on('blur', function () {
    let marca = $('#marca').val().trim();
    if (marca === '') {
        mostrarError('marca', 'La marca es requerida');
    } else {
        mostrarExito('marca');
    }
});

// Función para validar el campo "Modelo"
$('#modelo').on('blur', function () {
    let modelo = $('#modelo').val().trim();
    if (modelo === '') {
        mostrarError('modelo', 'El modelo es requerido');
    } else {
        mostrarExito('modelo');
    }
});

// Función para validar el campo "Precio"
$('#precio').on('blur', function () {
    let precio = $('#precio').val().trim();
    if (precio === '') {
        mostrarError('precio', 'El precio es requerido');
    } else if (isNaN(precio) || parseFloat(precio) <= 0) {
        mostrarError('precio', 'El precio debe ser un número mayor que 0');
    } else {
        mostrarExito('precio');
    }
});

// Función para validar el campo "Detalles"
$('#detalles').on('blur', function () {
    let detalles = $('#detalles').val().trim();
    if (detalles === '') {
        mostrarError('detalles', 'Los detalles son requeridos');
    } else {
        mostrarExito('detalles');
    }
});

// Función para validar el campo "Unidades"
$('#unidades').on('blur', function () {
    let unidades = $('#unidades').val().trim();
    if (unidades === '') {
        mostrarError('unidades', 'Las unidades son requeridas');
    } else {
        mostrarExito('unidades');
    }
});

// Función para validar el campo "Imagen"
$('#imagen').on('blur', function () {
    let imagen = $('#imagen').val().trim();
    if (imagen === '') {
        mostrarError('imagen', 'La imagen es requerida');
    } else {
        mostrarExito('imagen');
    }
});

// Función para mostrar un mensaje de error
function mostrarError(campo, mensaje) {
    $(`#${campo}`).addClass('is-invalid');
    $(`#${campo}`).next('.invalid-feedback').text(mensaje);
}

// Función para mostrar que el campo es válido
function mostrarExito(campo) {
    $(`#${campo}`).removeClass('is-invalid');
    $(`#${campo}`).addClass('is-valid');
}