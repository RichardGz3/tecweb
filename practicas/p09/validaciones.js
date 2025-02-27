document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formularioProductos");
    
    formulario.addEventListener("submit", function (evento) {
        let valido = true;
        
        // Validar Nombre
        const nombre = document.getElementById("nombre");
        if (nombre.value.trim() === "" || nombre.value.length > 100) {
            alert("El nombre del producto es obligatorio y debe tener 100 caracteres o menos.");
            valido = false;
        }

        // Validar Marca (lista de opciones)
        const marca = document.getElementById("marca");
        if (marca.value.trim() === "") {
            alert("Debes seleccionar una marca.");
            valido = false;
        }

        // Validar Modelo (alfanumérico y 25 caracteres máximo)
        const modelo = document.getElementById("modelo");
        const regexAlfanumerico = /^[a-zA-Z0-9\s\-]+$/;
        if (!regexAlfanumerico.test(modelo.value) || modelo.value.length > 25) {
            alert("El modelo debe ser alfanumérico y tener 25 caracteres o menos.");
            valido = false;
        }

        // Validar Precio (mayor a 99.99)
        const precio = document.getElementById("precio");
        if (isNaN(precio.value) || precio.value <= 99.99) {
            alert("El precio debe ser mayor a 99.99.");
            valido = false;
        }

        // Validar Detalles (máximo 250 caracteres)
        const detalles = document.getElementById("detalles");
        if (detalles.value.length > 250) {
            alert("Los detalles no pueden superar los 250 caracteres.");
            valido = false;
        }

        // Validar Unidades (número mayor o igual a 0)
        const unidades = document.getElementById("unidades");
        if (isNaN(unidades.value) || unidades.value < 0) {
            alert("Las unidades deben ser un número mayor o igual a 0.");
            valido = false;
        }

        // Validar Imagen (si no hay imagen, establecer imagen por defecto)
        const imagen = document.getElementById("imagen");
        if (imagen.files.length === 0) {
            alert("No seleccionaste una imagen. Se usará una imagen por defecto.");
            imagen.dataset.default = "imagenes/default.png";  // Ruta de imagen por defecto
        }

        // Si alguna validación falla, detener el envío del formulario
        if (!valido) {
            evento.preventDefault();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const inputImagen = document.getElementById("imagen");
    const imagenPrevia = document.getElementById("imagenDefault");

    inputImagen.addEventListener("change", function (event) {
        const archivo = event.target.files[0];

        if (archivo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagenPrevia.src = e.target.result; 
            };
            reader.readAsDataURL(archivo);
        } else {
            imagenPrevia.src = "src/cat.png"; 
        }
    });
});
