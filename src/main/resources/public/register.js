$(document).ready(function() {
    addPageBehavior();
    manejarValidacion();

    var id = window.location.search.substring(1);
    if (id) {
        $.ajax({
            url: "/manager/" + id + "/usuario",
            type: "GET",
            dataType: "json",
            contentType: "application/json"
        }).done(function(data){
            loadData(data.data);
        }).fail(function(){
            // Mostrar mensaje de error
            toastr.error("Hubo un problema al buscar el id del usuario.");
        });
    }
});

// Llena el formulario con la información para la edición.
function loadData(data) {
    $("#inputNombre").val(data.nombre);
    $("#inputApellido").val(data.apellido);
    $("#inputCorreo").val(data.correo);
    $("#inputContrasena").val(data.contrasena);
    $("#inputPerfil").val(data.perfil);
}

// Agrega el link al botón volver e inicializa el dropdown.
function addPageBehavior() {
    $("#linkVolver").click(function() {
        window.location = 'usuarios.html';
    });
    $(".select2").select2();
}

// Maneja el llamado al servicio de alta de usuario.
function guardarUsuario() {
    // Recoge la información del id para determinar si se trata de una edición o un alta.
    var id = window.location.search.substring(1);
    // Recoge la información de pantalla y crea la variable "data".
    var nombre = $("#inputNombre").val();
    var apellido = $("#inputApellido").val();
    var correo = $("#inputCorreo").val();
    var contrasena = $("#inputContrasena").val();
    var perfil = $("#inputPerfil").val();

    var urlAjax;
    var methodAjax;
    if (id) {
        methodAjax = "PUT";
        urlAjax = "/manager/change/" + id + "/usuario";
    } else {
        methodAjax = "POST";
        urlAjax = "/manager/add/usuario";
    }

    var data = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena,
        perfil: perfil
    }

    $.ajax({
        url: urlAjax,
        type: methodAjax,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
    }).done(function(){
        // Mostrar mensaje de éxito
        window.location.href = "usuarios.html";
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar crear el usuario.");
    });
}

// Pasa parámetros a la función "validate" de jQuery.
function manejarValidacion() {
    var form = $('#formUsuarios');
    var error = $('.alert-danger', form);

    form.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: false,
        ignore: "",
        // Agrega comportamiento a los inputs a validar.
        rules: {
            inputCorreo: {
                required: true,
                email: true
            },
            inputContrasena: {
                minlength: 8,
                required: true
            }
        },
        invalidHandler: function (event, validator) {           
            error.show();
        },
        highlight: function (element) {
            $(element)
            .closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
            .closest('.form-group').removeClass('has-error');
        },
        submitHandler: function (form) {
            error.hide();
            guardarUsuario();
        }
    });
}

// Cambia el valor de los mensajes de validación.
jQuery.extend(jQuery.validator.messages, {
    required: "Campo obligatorio.",
    email: "Ingrese un correo válido.",
    minlength: jQuery.validator.format("Ingrese al menos {0} caracteres.")
});
