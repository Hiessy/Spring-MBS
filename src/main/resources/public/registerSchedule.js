$(document).ready(function() {
    addPageBehavior();
    manejarValidacion();
    idDescarga = window.location.search.substring(1);
    if (idDescarga) {
        getDescarga(idDescarga);
    }
});

var idDescarga;

function getDescarga(idDescarga) {
    $.ajax({
        url: "/descargas/" + idDescarga + "/descargas",
        type: "GET",
        dataType: "json",
        contentType: "application/json"
    }).done(function(data){
        mostrarDescarga(data.data);
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar editar la descarga.");
    });
}

function mostrarDescarga(descarga) {
    $("#descripcion").val(descarga.descripcion);
    $("#rutaDesde").val(descarga.rutaDesde);
    $("#nombreArchivoBusqueda").val(descarga.nombreArchivoBusqueda);

    if ("nousa" === descarga.userProxy) {
        $("#userProxyNoUsa").prop("checked", true);
    } else {
        $("#userProxyInput").val(descarga.userProxy);
    }

    if ("nousa" === descarga.pswProxy) {
        $("#pswProxyNoUsa").prop("checked", true);
    } else {
        $("#pswProxyInput").val(descarga.pswProxy);
    }

    $("#fbackup").val(descarga.fbackup);
    $("#frecuencia").val(descarga.frecuencia);
    if ("1" === descarga.ignorarUltimaDescarga) {
        $("#ignorarUltimaDescargaSi").prop("checked", true);
    } else {
        $("#ignorarUltimaDescargaNo").prop("checked", true);
    }
    if ("1" === descarga.errorUltimaDescarga) {
        $("#errorUltimaDescargaSi").prop("checked", true);
    } else {
        $("#errorUltimaDescargaNo").prop("checked", true);
    }
    $("#diaSemana").val(descarga.diaSemana);
    $("#diaMes").val(descarga.diaMes);
    $("#horaEjecucion").val(descarga.horaEjecucion);
    $("#ultimaDescarga").val(descarga.ultimaDescarga);
    if ("1" === descarga.ultimaDescargaEsVacia) {
        $("#ultimaDescargaEsVaciaSi").prop("checked", true);
    } else {
        $("#ultimaDescargaEsVaciaNo").prop("checked", true);
    }
    if ("1" === descarga.pdfConvert) {
        $("#pdfConvertSi").prop("checked", true);
    } else {
        $("#pdfConvertNo").prop("checked", true);
    }
    if ("1" === descarga.html) {
        $("#htmlSi").prop("checked", true);
    } else {
        $("#htmlNo").prop("checked", true);
    }
    $("#nombreArchivoOriginal").val(descarga.nombreArchivoOriginal);
    $("#ultimoLog").val(descarga.ultimoLog);
    $("#extensionArchivoOriginal").val(descarga.extensionArchivoOriginal);
    $("#cuitPrefijo").val(descarga.cuitPrefijo);
    $("#cuitMedio").val(descarga.cuitMedio);
    $("#cuitVerif").val(descarga.cuitVerif);
    $("#passwordARBA").val(descarga.passwordARBA);
    $("#descargaActivada").val(descarga.descargaActivada);
    $("#nombreArchivoFinal").val(descarga.nombreArchivoFinal);
}

// Agrega el link al botón volver e inicializa el dropdown.
function addPageBehavior() {
    $("#linkVolver").click(function() {
        window.location = 'descargas.html';
    });
}

// Maneja el llamado al servicio de edición de descarga.
function editarDescarga(descarga) {
    $.ajax({
        url: "/descargas/change/" + idDescarga + "/descargas",
        type: "PUT",
        data: JSON.stringify(descarga),
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        // Mostrar mensaje de éxito
        toastr.success("¡Descarga editada exitosamente!");
    }).fail(function() {
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar editar la descarga.");
    });
}

// Maneja el llamado al servicio de creación de descarga.
function nuevaDescarga(descarga) {
    $.ajax({
        url: "/descargas/add/descargas",
        type: "POST",
        data: JSON.stringify(descarga),
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        // Mostrar mensaje de éxito
        toastr.success("¡Descarga creada exitosamente!");
    }).fail(function() {
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar crear la descarga.");
    });
}

function loadDescarga() {
    var descripcion = $("#descripcion").val();
    var rutaDesde = $("#rutaDesde").val();
    var nombreArchivoBusqueda = $("#nombreArchivoBusqueda").val();

    var userProxy
    if ($('#userProxyNoUsa').is(":checked")) {
        userProxy = $("#userProxyNoUsa").val();
    } else {
        userProxy = $("#userProxyInput").val();
    }

    var pswProxy
    if ($('#pswProxyNoUsa').is(":checked")) {
        userProxy = $("#pswProxyNoUsa").val();
    } else {
        userProxy = $("#pswProxyInput").val();
    }

    var fbackup = $("#fbackup").val();
    var frecuencia = $("#frecuencia").val();
    var ignorarUltimaDescarga = $("input[name='ignorarUltimaDescarga']:checked").val();
    var errorUltimaDescarga = $("input[name='errorUltimaDescarga']:checked").val();
    var diaSemana = $("#diaSemana").val();
    var diaMes = $("#diaMes").val();
    var horaEjecucion = $("#horaEjecucion").val();
    var ultimaDescarga = $("#ultimaDescarga").val();
    var ultimaDescargaEsVacia = $("input[name='ultimaDescargaEsVacia']:checked").val();
    var pdfConvert = $("input[name='pdfConvert']:checked").val();
    var html = $("input[name='html']:checked").val();
    var nombreArchivoOriginal = $("#nombreArchivoOriginal").val();
    var ultimoLog = $("#ultimoLog").val();
    var extensionArchivoOriginal = $("#extensionArchivoOriginal").val();
    var cuitPrefijo = $("#cuitPrefijo").val();
    var cuitMedio = $("#cuitMedio").val();
    var cuitVerif = $("#cuitVerif").val();
    var passwordARBA = $("#passwordARBA").val();
    var descargaActivada = $("#descargaActivada").val();
    var nombreArchivoFinal = $("#nombreArchivoFinal").val();

    return {
        id: idDescarga,
        descripcion: descripcion,
        rutaDesde: rutaDesde,
        nombreArchivoBusqueda: nombreArchivoBusqueda,
        userProxy: userProxy,
        pswProxy: pswProxy,
        fbackup: fbackup,
        frecuencia: frecuencia,
        ignorarUltimaDescarga: ignorarUltimaDescarga,
        errorUltimaDescarga: errorUltimaDescarga,
        diaSemana: diaSemana,
        diaMes: diaMes,
        horaEjecucion: horaEjecucion,
        ultimaDescarga: ultimaDescarga,
        ultimaDescargaEsVacia: ultimaDescargaEsVacia,
        pdfConvert: pdfConvert,
        html: html,
        nombreArchivoOriginal: nombreArchivoOriginal,
        ultimoLog: ultimoLog,
        extensionArchivoOriginal: extensionArchivoOriginal,
        cuitPrefijo: cuitPrefijo,
        cuitMedio: cuitMedio,
        cuitVerif: cuitVerif,
        passwordARBA: passwordARBA,
        descargaActivada: descargaActivada  ,
        nombreArchivoFinal: nombreArchivoFinal
    }
}

// Pasa parámetros a la función "validate" de jQuery.
function manejarValidacion() {
    var form = $('#formDescargas');
    var error = $('.alert-danger', form);

    form.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: false,
        ignore: "",
        // Decide que inputs son obligatorios.
        rules: {
            descripcion: {
                required: true,
            },
            rutaDesde: {
                required: true,
            },
            nombreArchivoBusqueda: {
                required: true,
            },
            frecuencia: {
                required: true,
            },
            ignorarUltimaDescarga: {
                required: true,
            },
            diaSemana: {
                required: true,
            },
            diaMes: {
                required: true,
            },
            horaEjecucion: {
                required: true,
            },
            nombreArchivoFinal: {
                required: true,
            },
            descargaActivada: {
                required: true,
            }
        },
        invalidHandler: function (event, validator) {           
            error.show();
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function (form) {
            error.hide();
            var descarga = loadDescarga();
            if (idDescarga) {
                editarDescarga(descarga);
            } else {
                nuevaDescarga(descarga);
            }
        }
    });
}

// Cambia el valor de los mensajes de validación.
jQuery.extend(jQuery.validator.messages, {
    required: "Campo obligatorio."
});
