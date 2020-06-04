var socket = io();

let paramas = new URLSearchParams(window.location.search);


if (!paramas.has('nombre')) {
    window.location = 'index.html';
    throw new Error('el nombre es necesario');
}

let usuario = {
    nombre: paramas.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(respuesta) {
        console.log(respuesta);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMesaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMesaje', function(mensaje) {

    console.log('desde socket-chat: ', mensaje);

});


//escuchar cuando un usuario entra o sale del chat 
socket.on('listaPersonas', function(usuarios) {

    console.log('Servidor: ', usuarios);

});