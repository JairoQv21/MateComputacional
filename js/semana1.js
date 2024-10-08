// Función del método de la bisección
function metodoBiseccion(funcion, limiteInferior, limiteSuperior, tolerancia, maxIteraciones, redondeo) {
    if (funcion(limiteInferior) * funcion(limiteSuperior) >= 0) {
        throw new Error("La función debe tener signos opuestos en los extremos del intervalo.");
    }

    let tablaIteraciones = [];
    let conteoIteraciones = 0;
    let puntoMedio = 0;

    while (conteoIteraciones < maxIteraciones) {
        puntoMedio = parseFloat(((limiteInferior + limiteSuperior) / 2).toFixed(redondeo));
        let fPuntoMedio = funcion(puntoMedio);

        tablaIteraciones.push({
            iteracion: conteoIteraciones + 1,
            a: limiteInferior,
            b: limiteSuperior,
            x: puntoMedio,
            fx: fPuntoMedio,
            error: Math.abs(limiteSuperior - limiteInferior) / 2
        });

        if (Math.abs(fPuntoMedio) < tolerancia) {
            break;
        }

        if (funcion(puntoMedio) * funcion(limiteInferior) < 0) {
            limiteSuperior = puntoMedio;
        } else {
            limiteInferior = puntoMedio;
        }

        conteoIteraciones++;
    }

    return { raiz: puntoMedio, tabla: tablaIteraciones };
}

// Función para manejar el formulario y mostrar los resultados
document.getElementById('biseccionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const funcionStr = document.getElementById('funcion').value;
    const limiteInferior = parseFloat(document.getElementById('limiteInferior').value);
    const limiteSuperior = parseFloat(document.getElementById('limiteSuperior').value);
    const tolerancia = parseFloat(document.getElementById('tolerancia').value);
    const maxIteraciones = parseInt(document.getElementById('maxIteraciones').value);
    const redondeo = parseInt(document.getElementById('redondeo').value);

    // Limpiar la tabla anterior
    const tbody = document.getElementById('tablaResultados').querySelector('tbody');
    tbody.innerHTML = '';

    try {
        // Crear la función dinámica usando eval
        const funcion = new Function('x', `return ${funcionStr};`);

        // Ejecutar el método de la bisección
        const resultado = metodoBiseccion(funcion, limiteInferior, limiteSuperior, tolerancia, maxIteraciones, redondeo);

        // Insertar las filas en la tabla
        resultado.tabla.forEach(fila => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${fila.iteracion}</td>
                <td>${fila.a.toFixed(redondeo)}</td>
                <td>${fila.b.toFixed(redondeo)}</td>
                <td>${fila.x.toFixed(redondeo)}</td>
                <td>${fila.fx.toFixed(6)}</td>
                <td>${fila.error.toFixed(6)}</td>
            `;
        });

        // Mostrar la raíz aproximada
        document.getElementById('raiz').textContent = resultado.raiz.toFixed(6);
    } catch (error) {
        alert('Error al evaluar la función: ' + error.message);
    }
});