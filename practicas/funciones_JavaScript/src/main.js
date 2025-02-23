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

function ejemplo4() {
    var valor1 = prompt('Introducir primer número:', '');
    var valor2 = prompt('Introducir segundo número:', '');
    var suma = parseInt(valor1) + parseInt(valor2);
    var producto = parseInt(valor1) * parseInt(valor2);
    
    document.getElementById('resultado4').innerHTML = 
    '<h3>La suma es ' + suma + '</h3>' +
    '<h3>El producto es ' + producto + '</h3>';
}

function ejemplo5() {
    var nombre = prompt('Ingresa tu nombre:', '');
    var nota = prompt('Ingresa tu nota:', '');
    
    if (nota >= 4) {
        document.getElementById('resultado5').innerHTML = '<h3>' + nombre + ' está aprobado con un ' + nota + '</h3>';
    } else {
        document.getElementById('resultado5').innerHTML = '<h3>' + nombre + ' está reprobado con un ' + nota + '</h3>';
    }
}

function ejemplo6() {
    var num1 = prompt('Ingresa el primer número:', '');
    var num2 = prompt('Ingresa el segundo número:', '');
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    
    if (num1 > num2) {
        document.getElementById('resultado6').innerHTML = '<h3>El mayor es ' + num1 + '</h3>';
    } else {
        document.getElementById('resultado6').innerHTML = '<h3>El mayor es ' + num2 + '</h3>';
    }
}

function ejemplo7() {
    var nota1 = prompt('Ingresa 1ra. nota:', '');
    var nota2 = prompt('Ingresa 2da. nota:', '');
    var nota3 = prompt('Ingresa 3ra. nota:', '');
    
    nota1 = parseInt(nota1);
    nota2 = parseInt(nota2);
    nota3 = parseInt(nota3);
    
    var promedio = (nota1 + nota2 + nota3) / 3;
    var resultadoTexto = '';
    
    if (promedio >= 7) {
        resultadoTexto = 'Aprobado';
    } else if (promedio >= 4) {
        resultadoTexto = 'Regular';
    } else {
        resultadoTexto = 'Reprobado';
    }
    
    document.getElementById('resultado7').innerHTML = '<h3>El resultado es: ' + resultadoTexto + '</h3>';
}

function ejemplo8() {
    var valor = prompt('Ingresar un valor comprendido entre 1 y 5:', '');
    valor = parseInt(valor);
    var texto = '';

    switch (valor) {
        case 1: texto = 'Uno'; break;
        case 2: texto = 'Dos'; break;
        case 3: texto = 'Tres'; break;
        case 4: texto = 'Cuatro'; break;
        case 5: texto = 'Cinco'; break;
        default: texto = 'Debe ingresar un valor comprendido entre 1 y 5.';
    }

    document.getElementById('resultado8').innerHTML = '<h3>' + texto + '</h3>';
}

function ejemplo9() {
    var col = prompt('Ingresa el color con que quieres pintar el fondo de la ventana (rojo, verde, azul):', '');
    
    switch (col.toLowerCase()) {
        case 'rojo': 
            document.body.style.backgroundColor = '#ff0000';
            break;
        case 'verde': 
            document.body.style.backgroundColor = '#00ff00';
            break;
        case 'azul': 
            document.body.style.backgroundColor = '#0000ff';
            break;
        default:
            alert('Color no reconocido. Intenta con rojo, verde o azul.');
    }
}
