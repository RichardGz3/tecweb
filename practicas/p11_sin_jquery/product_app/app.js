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

// FUNCIÓN CALLBACK AL CARGAR LA PÁGINA O AL AGREGAR UN PRODUCTO
function listarProductos() {
    // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
    var client = getXMLHttpRequest();
    client.open('GET', './backend/product-list.php', true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.onreadystatechange = function () {
        // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
        if (client.readyState == 4 && client.status == 200) {
            //console.log('[CLIENTE]\n'+client.responseText);
            
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let productos = JSON.parse(client.responseText);    // similar a eval('('+client.responseText+')');
            
            // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
            if(Object.keys(productos).length > 0) {
                // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                let template = '';

                productos.forEach(producto => {
                    // SE COMPRUEBA QUE SE OBTIENE UN OBJETO POR ITERACIÓN
                    //console.log(producto);

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
                            <td>${producto.nombre}</td>
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
                document.getElementById("products").innerHTML = template;
            }
        }
    };
    client.send();
}

// FUNCIÓN CALLBACK DE BOTÓN "Buscar"
function buscarProducto(e) {
    /**
     * Revisar la siguiente información para entender porqué usar event.preventDefault();
     * http://qbit.com.mx/blog/2013/01/07/la-diferencia-entre-return-false-preventdefault-y-stoppropagation-en-jquery/#:~:text=PreventDefault()%20se%20utiliza%20para,escuche%20a%20trav%C3%A9s%20del%20DOM
     * https://www.geeksforgeeks.org/when-to-use-preventdefault-vs-return-false-in-javascript/
     */
    e.preventDefault();

    // SE OBTIENE EL ID A BUSCAR
    var search = document.getElementById('search').value;

    // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
    var client = getXMLHttpRequest();
    client.open('GET', './backend/product-search.php?search='+search, true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.onreadystatechange = function () {
        // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
        if (client.readyState == 4 && client.status == 200) {
            //console.log('[CLIENTE]\n'+client.responseText);
            
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let productos = JSON.parse(client.responseText);    // similar a eval('('+client.responseText+')');
            
            // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
            if(Object.keys(productos).length > 0) {
                // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                let template = '';
                let template_bar = '';

                productos.forEach(producto => {
                    // SE COMPRUEBA QUE SE OBTIENE UN OBJETO POR ITERACIÓN
                    //console.log(producto);

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
                            <td>${producto.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                            <td>
                                <button class="product-delete btn btn-danger" onclick="eliminarProducto()">
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
                document.getElementById("product-result").className = "card my-4 d-block";
                // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
                document.getElementById("container").innerHTML = template_bar;  
                // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                document.getElementById("products").innerHTML = template;
            }
        }
    };
    client.send();
}

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
function agregarProducto(e) {
    e.preventDefault();

    // SE OBTIENE DESDE EL FORMULARIO EL JSON A ENVIAR
    var productoJsonString = document.getElementById('description').value;
    // SE CONVIERTE EL JSON DE STRING A OBJETO
    var finalJSON = JSON.parse(productoJsonString);
    // SE AGREGA AL JSON EL NOMBRE DEL PRODUCTO
    finalJSON['nombre'] = document.getElementById('name').value;
    // SE OBTIENE EL STRING DEL JSON FINAL
    productoJsonString = JSON.stringify(finalJSON, null, 2);

    // VALIDACIONES DE LOS DATOS
    let errores = [];

    // Validar que el nombre no esté vacío
    if (!finalJSON.nombre || finalJSON.nombre.trim() === '') {
        errores.push("El nombre del producto no puede estar vacío.");
    }

    // Validar que el precio sea un número positivo
    if (isNaN(finalJSON.precio) || finalJSON.precio < 0) {
        errores.push("El precio debe ser un número positivo.");
    }

    // Validar que las unidades sean un número entero positivo
    if (!Number.isInteger(finalJSON.unidades) || finalJSON.unidades < 0) {
        errores.push("Las unidades deben ser un número entero positivo.");
    }

    // Validar que el modelo no esté vacío
    if (!finalJSON.modelo || finalJSON.modelo.trim() === '') {
        errores.push("El modelo del producto no puede estar vacío.");
    }

    // Validar que la marca no esté vacía
    if (!finalJSON.marca || finalJSON.marca.trim() === '') {
        errores.push("La marca del producto no puede estar vacía.");
    }

    // Validar que los detalles no estén vacíos
    if (!finalJSON.detalles || finalJSON.detalles.trim() === '') {
        errores.push("Los detalles del producto no pueden estar vacíos.");
    }

    // Validar que la imagen tenga una extensión válida (opcional)
    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
    const extension = finalJSON.imagen.substring(finalJSON.imagen.lastIndexOf('.')).toLowerCase();
    if (!extensionesValidas.includes(extension)) {
        errores.push("La imagen debe tener una extensión válida (jpg, jpeg, png, gif).");
    }

    // SI HAY ERRORES, SE MUESTRAN Y NO SE ENVÍA EL PRODUCTO
    if (errores.length > 0) {
        let template_bar = '';
        errores.forEach(error => {
            template_bar += `<li style="list-style: none; color: red;">${error}</li>`;
        });

        // SE HACE VISIBLE LA BARRA DE ESTADO
        document.getElementById("product-result").className = "card my-4 d-block";
        // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
        document.getElementById("container").innerHTML = template_bar;
        return;
    }

    // SI NO HAY ERRORES, SE ENVÍA EL PRODUCTO A AGREGAR
    var client = getXMLHttpRequest();
    client.open('POST', './backend/product-add.php', true);
    client.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    client.onreadystatechange = function () {
        // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
        if (client.readyState == 4 && client.status == 200) {
            console.log(client.responseText);
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let respuesta = JSON.parse(client.responseText);

            // SE CREA UNA PLANTILLA PARA CREAR INFORMACIÓN DE LA BARRA DE ESTADO
            let template_bar = '';

            // SI EL PRODUCTO SE AGREGÓ CORRECTAMENTE, SE MUESTRA UN MENSAJE DE ÉXITO
            if (respuesta.status === "success") {
                template_bar += `
                    <li style="list-style: none; color: green;">${respuesta.message}</li>
                    <li style="list-style: none; color: green;">Producto agregado correctamente.</li>
                `;
            } else {
                // SI HUBO UN ERROR EN EL SERVIDOR, SE MUESTRA EL MENSAJE DE ERROR
                template_bar += `
                    <li style="list-style: none; color: red;">${respuesta.message}</li>
                `;
            }

            // SE HACE VISIBLE LA BARRA DE ESTADO
            document.getElementById("product-result").className = "card my-4 d-block";
            // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
            document.getElementById("container").innerHTML = template_bar;

            // SE LISTAN TODOS LOS PRODUCTOS
            listarProductos();
        }
    };
    client.send(productoJsonString);
}


// FUNCIÓN CALLBACK DE BOTÓN "Eliminar"
function eliminarProducto() {
    if( confirm("De verdad deseas eliminar el Producto") ) {
        var id = event.target.parentElement.parentElement.getAttribute("productId");
        //NOTA: OTRA FORMA PODRÍA SER USANDO EL NOMBRE DE LA CLASE, COMO EN LA PRÁCTICA 7

        // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
        var client = getXMLHttpRequest();
        client.open('GET', './backend/product-delete.php?id='+id, true);
        client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        client.onreadystatechange = function () {
            // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
            if (client.readyState == 4 && client.status == 200) {
                console.log(client.responseText);
                // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                let respuesta = JSON.parse(client.responseText);
                // SE CREA UNA PLANTILLA PARA CREAR INFORMACIÓN DE LA BARRA DE ESTADO
                let template_bar = '';
                template_bar += `
                            <li style="list-style: none;">status: ${respuesta.status}</li>
                            <li style="list-style: none;">message: ${respuesta.message}</li>
                        `;

                // SE HACE VISIBLE LA BARRA DE ESTADO
                document.getElementById("product-result").className = "card my-4 d-block";
                // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
                document.getElementById("container").innerHTML = template_bar;

                // SE LISTAN TODOS LOS PRODUCTOS
                listarProductos();
            }
        };
        client.send();
    }
}

// SE CREA EL OBJETO DE CONEXIÓN COMPATIBLE CON EL NAVEGADOR
function getXMLHttpRequest() {
    var objetoAjax;

    try{
        objetoAjax = new XMLHttpRequest();
    }catch(err1){
        /**
         * NOTA: Las siguientes formas de crear el objeto ya son obsoletas
         *       pero se comparten por motivos historico-académicos.
         */
        try{
            // IE7 y IE8
            objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err2){
            try{
                // IE5 y IE6
                objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(err3){
                objetoAjax = false;
            }
        }
    }
    return objetoAjax;
}