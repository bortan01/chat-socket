var socket = io();

let paramas = new URLSearchParams(window.location.search);


if (!paramas.has('nombre') || !paramas.has('sala')) {
    window.location = 'index.html';
    throw new Error('el nombre y sala es necesario');
}

let usuario = {
    nombre: paramas.get('nombre'),
    sala: paramas.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(respuesta) {
        console.log(respuesta);
        renderizarUsuarios(respuesta);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('crearMesaje', function(mensaje) {

    console.log('desde socket-chat: ', mensaje);

});

//escuchar cuando un usuario entra o sale del chat 
socket.on('listaPersonas', function(usuarios) {
    renderizarUsuarios(usuarios);
    console.log('Servidor: ', usuarios);

});

// mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log("mensaje privado ", mensaje);
});


//mensaje privado
// socket.emit('mensajePrivado', {
//     para: 'Od0vDENTi2I3K8iNAAAH',
//     mensaje: 'Hola que tal'
// });