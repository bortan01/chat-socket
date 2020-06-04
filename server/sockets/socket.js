const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades.js');
const usuarios = new Usuarios();



io.on('connection', (client) => {
    // console.log("usuario conectado");

    client.on('entrarChat', (data, respuesta) => {

        if (!data.nombre) {
            return respuesta({
                err: true,
                mensaje: "el nombre es neccesario"
            });
        }
        let TodasLasPersonas = usuarios.agregarPersona(client.id, data.nombre);


        client.broadcast.emit('listaPersonas', usuarios.getPersonas());

        respuesta(TodasLasPersonas);

    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.emit("crearMesaje", crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });

    client.on('crearMesaje', (data) => {
        let mensaje = crearMensaje(data.nombre, data.mensaje);
        client.broadcast.emit('crearMesaje', mensaje);
    });
});