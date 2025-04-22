function validarPago() {
    const nombreSolicitante = document.getElementById('nombre-solicitante').value;
    const nombreTarjeta = document.getElementById('nombre-tarjeta').value;
    const tarjeta = document.getElementById('tarjeta').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const cvv = document.getElementById('cvv').value;

    if (nombreSolicitante.trim() === '' || nombreTarjeta.trim() === '' || tarjeta.trim() === '' || vencimiento.trim() === '' || cvv.trim() === '') {
        alert('Por favor, complete todos los campos de información del solicitante y pago.');
        return;
    }

    if (nombreSolicitante.toLowerCase() !== nombreTarjeta.toLowerCase()) {
        alert('El nombre del solicitante debe coincidir con el nombre en la tarjeta.');
        return;
    }

    // Recopilar la información de la excursión (para el mensaje de la alerta)
    const destino = document.getElementById('destino').value;
    const tipo = document.getElementById('tipo').value;
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    const transporte = document.querySelector('input[name="transporte"]').checked;
    const alojamiento = document.querySelector('input[name="alojamiento"]').checked;
    const almuerzo = document.querySelector('input[name="almuerzo"]').checked;
    const guia = document.querySelector('input[name="guia"]').checked;

    const serviciosAdicionales = [];
    if (transporte) serviciosAdicionales.push('Transporte');
    if (alojamiento) serviciosAdicionales.push('Alojamiento');
    if (almuerzo) serviciosAdicionales.push('Almuerzo Buffet');
    if (guia) serviciosAdicionales.push('Guía Turístico');

    const mensajeCorreo = `
        Nueva Reserva de Excursión/Tour:

        Información del Solicitante:
        Nombre: ${nombreSolicitante}

        Detalles de la Excursión:
        Destino: ${destino || 'No seleccionado'}
        Tipo: ${tipo}
        Fecha: ${fecha || 'No seleccionada'}
        Número de Personas: ${personas}
        Servicios Adicionales: ${serviciosAdicionales.length > 0 ? serviciosAdicionales.join(', ') : 'Ninguno'}

        Información de Pago:
        Nombre en Tarjeta: ${nombreTarjeta}
        Número de Tarjeta: ${tarjeta}
        Fecha de Vencimiento: ${vencimiento}
        CVV: ${cvv}

        ¡Gracias por su reserva!
    `;

    alert('Reserva realizada. La siguiente información sería enviada a tomasf@gmail.com:\n\n' + mensajeCorreo);

    // Recargar la página principal después de "procesar el pago"
    window.location.href = 'index.html';
}

function mostrarOpcionesPago() {
    const destino = document.getElementById('destino').value;
    const tipo = document.getElementById('tipo').value;
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    const transporte = document.querySelector('input[name="transporte"]').checked;
    const alojamiento = document.querySelector('input[name="alojamiento"]').checked;
    const almuerzo = document.querySelector('input[name="almuerzo"]').checked;
    const guia = document.querySelector('input[name="guia"]').checked;

    const resumenPedidoDiv = document.getElementById('resumen-pedido');
    resumenPedidoDiv.innerHTML = `
        <h3>Resumen de tu Pedido</h3>
        <p><strong>Destino:</strong> ${destino || 'No seleccionado'}</p>
        <p><strong>Tipo de Excursión:</strong> ${tipo}</p>
        <p><strong>Fecha:</strong> ${fecha || 'No seleccionada'}</p>
        <p><strong>Número de Personas:</strong> ${personas}</p>
        <p><strong>Servicios Adicionales:</strong></p>
        <ul>
            ${transporte ? '<li>Transporte</li>' : ''}
            ${alojamiento ? '<li>Alojamiento</li>' : ''}
            ${almuerzo ? '<li>Almuerzo Buffet</li>' : ''}
            ${guia ? '<li>Guía Turístico</li>' : ''}
            ${(!transporte && !alojamiento && !almuerzo && !guia) ? '<li>Ninguno seleccionado</li>' : ''}
        </ul>
        <p><strong>Importante:</strong> Por favor, complete su información de contacto y pago.</p>
    `;

    document.getElementById('pago').style.display = 'block';
    document.getElementById('crear-excursion').style.display = 'none';
}
function mostrarPagoExcursionPopular(nombreExcursion, precio) {
    const resumenPedidoDiv = document.getElementById('resumen-pedido');
    resumenPedidoDiv.innerHTML = `
        <h3>Resumen de tu Pedido</h3>
        <p><strong>Excursión:</strong> ${nombreExcursion}</p>
        <p><strong>Precio por persona:</strong> $${precio} USD</p>
        <p><strong>Número de Personas:</strong> 1 (Por favor, indique el número en la información del solicitante)</p>
        <p><strong>Importante:</strong> Por favor, complete su información de contacto y pago.</p>
    `;

    document.getElementById('pago').style.display = 'block';
    document.getElementById('excursiones-populares').style.display = 'none';
    document.getElementById('crear-excursion').style.display = 'none'; // Oculta también la sección de crear excursión si está visible
}