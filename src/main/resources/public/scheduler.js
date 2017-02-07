$(document).ready(function() {
    loadDescargas();
});

var botones = "<div class='btn-group btn-group-xs' style='width: 120px'>" +
    "<button type='button' class='btn red btn-circle' data-toggle='tooltip' title='Eliminar'><i class='icon-close'></i></button>" +
    "<button type='button' class='btn yellow btn-circle' data-toggle='tooltip' title='Editar'><i class='icon-pencil'></i></button>" +
    "<button type='button' class='btn green btn-circle' data-toggle='tooltip' title='Ejecutar'><i class='icon-control-play'></i></button>" +
    "<button type='button' class='btn blue btn-circle' data-toggle='tooltip' title='Descargar a PC'><i class='icon-cloud-download'></i></button>" +
    "</div>";

var table;

function loadDescargas() {
    $.ajax({
        url: "/descargas/list/descargas",
        type: "GET",
        dataType: "json",
        contentType: "application/json"
    }).done(function(data){
        loadDataTable(data.data);
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar traer el listado de descargas.");
    });
}

function loadDataTable(columnsData) {
    table = $('#descargasTable').DataTable({
        scrollX: true,
        paging: true,
        ordering: true,
        info: false,
        data: columnsData,
        columns: [
            { data: 'id' },
            { data: 'descripcion' },
            { data: 'rutaDesde' },
            { data: 'horaEjecucion' },
            { data: 'fbackup' },
            { data: 'diaSemana' }, // Queda definir cual es este dato, por ahora pongo un X
            { data: 'frecuencia' },
            { data: 'ultimaDescarga' },
            { data: 'errorUltimaDescarga' },
            { data: '' }
        ],
        columnDefs: [{
            targets: -1,
            data: null,
            defaultContent: botones
        }],
        drawCallback: addPageBehavior
    });
}

function addPageBehavior() {
    $('.btn.red.btn-circle').click(function(){
        var data = table.row($(this).parents('tr')).data();
        idClick = data.id;
        bootbox.confirm("¿Seguro desea borrar?", function(result) {
            if (result) {
                eliminarDescarga(idClick);
            }
        }); 
    });

    $("#btnNuevaDescarga").click(function(){
        window.location = 'descargasNuevoEditar.html';
    });

    $('.btn.yellow.btn-circle').click(function(){
        var data = table.row($(this).parents('tr')).data();
        idClick = data.id;
        window.location = 'descargasNuevoEditar.html?' + idClick;
    });

    $('.btn.green.btn-circle').click(function(){
        var data = table.row($(this).parents('tr')).data();
        idClick = data.id;
        toastr.success("Ha comenzado el proceso de descarga, será avisado al finalizar el mismo.");
        ejecutarDescarga(idClick);
    });

    $('.btn.blue.btn-circle').click(function(){
        var data = table.row($(this).parents('tr')).data();
        var nombre = data.nombreArchivoOriginal;
        toastr.success("Ha comenzado el proceso de descarga, será avisado al finalizar el mismo.");
        descargarPC(nombre);
    });
}

function descargarPC(nombre) {
    $.ajax({
        url: "/descargas/" + nombre + "/local",
        type: "GET",
    }).done(function(data){
        // Mostrar mensaje de éxito
        toastr.success("¡Descarga de archivo exitosa!");
        download(nombre, data);
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar descargar el archivo.");
    });
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function eliminarDescarga(id) {
    $.ajax({
        url: "/descargas/remove/" + id + "/descargas",
        type: "DELETE",
    }).done(function(){
        // Mostrar mensaje de éxito
        toastr.success("¡Descarga borrada exitosamente!");
        table.destroy();
        loadDescargas();
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar borrar la descarga.");
    });
}

function ejecutarDescarga(id) {
    $.ajax({
        url: "/descargas/ejecutar/" + id + "/descargas",
        type: "PUT",
    }).done(function(){
        // Mostrar mensaje de éxito
        toastr.success("¡Descarga ejecutada exitosamente!");
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar ejecutar la descarga.");
    });
}
