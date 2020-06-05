const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades.js');
const usuarios = new Usuarios();



io.on('connection', (client) => {
    // console.log("usuario conectado");

    client.on('entrarChat', (data, respuesta) => {

        if (!data.nombre || !data.sala) {
            return respuesta({
                err: true,
                mensaje: "el nombre es neccesario"
            });
        }
        // console.log(data);
        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.nombre, data.sala);


        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

        respuesta(usuarios.getPersonasPorSala(data.sala));

    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit("crearMesaje", crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    client.on('crearMesaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMesaje', mensaje);
    });
    ////mensajes privadodos
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });



});