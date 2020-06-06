//====================================
//funciones para rendirizar usuarios
//====================================
var params = new URLSearchParams(window.location.search);

//referencias de jQuery
let divUsuarios = $('#divUsuarios');

function renderizarUsuarios(personas) {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    let html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let index = 0; index < personas.length; index++) {
        html += '<li>';
        html += '<a data-id="' + personas[index] + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[index].nombre + '<small class="text-success">online</small></span></a>';
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

}