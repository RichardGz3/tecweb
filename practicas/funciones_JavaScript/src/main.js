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

function ejemplo10() {
    var x = 1;
    var resultado = "";
    while (x <= 100) {
        resultado += x + "<br>";
        x = x + 1;
    }
    document.getElementById('resultado10').innerHTML = resultado;
}

function ejemplo11() {
    var x = 1;
    var suma = 0;
    var resultado = "";
    
    while (x <= 5) {
        var valor = prompt('Ingresa el valor:', '');
        valor = parseInt(valor);
        suma = suma + valor;
        x = x + 1;
    }
    
    resultado = "<h3>La suma de los valores es " + suma + "</h3>";
    document.getElementById('resultado11').innerHTML = resultado;
}

function ejemplo12() {
    var resultado = "";
    var valor;
    
    do {
        valor = prompt('Ingresa un valor entre 0 y 999:', '');
        valor = parseInt(valor);
        
        if (valor !== 0) {
            resultado += "El valor " + valor + " tiene ";
            if (valor < 10) {
                resultado += "1 dígito";
            } else if (valor < 100) {
                resultado += "2 dígitos";
            } else {
                resultado += "3 dígitos";
            }
            resultado += "<br>";
        }
    } while (valor !== 0);
    
    document.getElementById('resultado12').innerHTML = resultado;
}

function ejemplo13() {
    var resultado = "";
    
    for (var f = 1; f <= 10; f++) {
        resultado += f + " ";
    }
    
    document.getElementById('resultado13').innerHTML = "<h3>" + resultado + "</h3>";
}

function ejemplo14() {
    var resultado = "";
    for (var i = 0; i < 3; i++) {
        resultado += "Cuidado<br>Ingresa tu documento correctamente<br>";
    }
    document.getElementById('resultado14').innerHTML = resultado;
}

function ejemplo15() {
    function mostrarMensaje() {
        return "Cuidado<br>Ingresa tu documento correctamente<br>";
    }
    
    var resultado = mostrarMensaje() + mostrarMensaje() + mostrarMensaje();
    document.getElementById('resultado15').innerHTML = resultado;
}

function ejemplo16() {
    var valor1 = prompt('Ingresa el valor inferior:', '');
    valor1 = parseInt(valor1);
    var valor2 = prompt('Ingresa el valor superior:', '');
    valor2 = parseInt(valor2);

    function mostrarRango(x1, x2) {
        var resultado = "";
        for (var inicio = x1; inicio <= x2; inicio++) {
            resultado += inicio + " ";
        }
        return resultado;
    }

    document.getElementById('resultado16').innerHTML = "<h3>" + mostrarRango(valor1, valor2) + "</h3>";
}

function ejemplo17() {
    function convertirCastellano(x) {
        if (x == 1) return "uno";
        else if (x == 2) return "dos";
        else if (x == 3) return "tres";
        else if (x == 4) return "cuatro";
        else if (x == 5) return "cinco";
        else return "valor incorrecto";
    }

    var valor = prompt("Ingresa un valor entre 1 y 5", "");
    valor = parseInt(valor);
    document.getElementById('resultado17').innerHTML = "<h3>" + convertirCastellano(valor) + "</h3>";
}

function ejemplo18() {
    function convertirCastellano(x) {
        switch (x) {
            case 1: return "uno";
            case 2: return "dos";
            case 3: return "tres";
            case 4: return "cuatro";
            case 5: return "cinco";
            default: return "valor incorrecto";
        }
    }

    var valor = prompt("Ingresa un valor entre 1 y 5", "");
    valor = parseInt(valor);
    document.getElementById('resultado18').innerHTML = "<h3>" + convertirCastellano(valor) + "</h3>";
}

