function ejemplo1() {
    var div = document.getElementById("ejemplo1");
    div.innerHTML = "<h3>Hola Mundo</h3>";
}

function ejemplo2() {
    var nombre = 'Juan';
    var edad = 10;
    var altura = 1.92;
    var casado = false;
    
    var resultadoDiv = document.getElementById('resultado2');
    resultadoDiv.innerHTML = 
    '<h3>Nombre: ' + nombre + '</h3>' +
    '<h3>Edad: ' + edad + '</h3>' +
    '<h3>Altura: ' + altura + '</h3>' +
    '<h3>Casado: ' + casado + '</h3>';
}

function ejemplo3() {
    var nombre = prompt("Ingresa tu nombre:", "");
    var edad = prompt("Ingresa tu edad:", "");
    
    document.getElementById('resultado3').innerHTML = '<h3>Hola ' + nombre + ', así que tienes ' + edad + ' años.</h3>';
}
