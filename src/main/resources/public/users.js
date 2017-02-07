$(document).ready(function() {
    loadUsuarios();
});

var table;
var idClick;

var botones = "<div class='btn-group btn-group-xs'>" +
    "<button type='button' class='btn red btn-circle'>Eliminar</button>" +
    "<button type='button' class='btn yellow btn-circle'>Editar</button>" +
    "</div>";

function loadUsuarios() {
    $.ajax({
        url: "/manager/list/usuarios",
        type: "GET",
        dataType: "json",
        contentType: "application/json"
    }).done(function(data){
        loadDataTable(data.data);
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar traer el listado de usuarios.");
    });
}

function loadDataTable(columnsData) {
    table = $('#usuariosTable').DataTable({
        paging: true,
        ordering: true,
        info: false,
        data: columnsData,
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'apellido' },
            { data: 'correo' },
            { data: 'perfil' },
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
    $("#btnNuevoUsuario").click(function() {
        window.location = 'usuariosNuevoEditar.html';
    });

    $('button.red').click(function(){
        var data = table.row($(this).parents('tr')).data();
        idClick = data.id;
        bootbox.confirm("¿Seguro desea borrar?", function(result) {
            if (result) {
                eliminarUsuario(idClick);
            }
        }); 
    });

    $('button.yellow').click(function(){
        var data = table.row($(this).parents('tr')).data();
        idClick = data.id;
        window.location = 'usuariosNuevoEditar.html?' + idClick;
    });
}

function eliminarUsuario(id) {
    $.ajax({
        url: "/manager/remove/" + id + "/usuario",
        type: "DELETE",
    }).done(function(){
        // Mostrar mensaje de éxito
        toastr.success("¡Usuario borrado exitosamente!");
        table.destroy();
        loadUsuarios();
    }).fail(function(){
        // Mostrar mensaje de error
        toastr.error("Hubo un problema al intentar borrar el usuario.");
    });
}
