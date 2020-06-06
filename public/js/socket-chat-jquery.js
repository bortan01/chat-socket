//====================================
//funciones para rendirizar usuarios
//====================================
var params = new URLSearchParams(window.location.search);
let nombre = params.get('nombre');
let sala = params.get('sala');

//referencias de jQuery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');

function renderizarUsuarios(personas) {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    let html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let index = 0; index < personas.length; index++) {
        html += '<li>';
        html += '<a data-id="' + personas[index].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[index].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';

    }
    divUsuarios.html(html);
    ///listeners de jquery

    divUsuarios.on('click', 'a', function() {
        var id = $(this).data('id');
        if (id) {
            console.log(id);
        }


    });
    formEnviar.on('submit', function(e) {
        e.preventDefault();
        if (txtMensaje.val().trim().length === 0) {
            return;
        }

        socket.emit('crearMensaje', {
            nombre: nombre,
            mensaje: txtMensaje.val()
        }, function(respuesta) {

            txtMensaje.val('').focus;
            renderizarMensajes(respuesta);
        });

    });

}

function renderizarMensajes(mensaje) {
    let html = '';

    html += '<li class="animated fadeIn">';
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '   <div class="chat-content">';
    html += '       <h5>' + mensaje.nombre + '</h5>';
    html += '       <div class="box bg-light-info">' + mensaje.mensaje + '</div>';
    html += '   </div>';
    html += '<div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChatbox.append(html);

}