$(document).ready(function() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    testUserProfile(userData);
    addUserName(userData);
    addBasicPageBehavior();
});

function addBasicPageBehavior() {
    $("#tabUsuarios").attr("href", "/usuarios.html");
    $("#tabPadrones").attr("href", "/padrones.html");
    $("#tabDescargas").attr("href", "/descargas.html");
    $("#logout").click(function() {
        localStorage.clear();
        window.location = 'index.html';
    });
}

// Testear la jerarquía del usuario para segurizar la navegación
function testUserProfile(userData) {
    // Pregunto la jerarquía del usuario
    if (userData && userData.perfil === "Admin") {
        // Si es administrador dibujo la solapa de Usuarios
        $("#visibilityUsuarios").css("display", "inherit");
    } else {
        $("#visibilityUsuarios").css("display", "none");
    }
}

// Dibuja el nombre de el usuario en la barra superior de la pantalla
function addUserName(userData) {
    if (userData) {
        $("#userBarName").html("Hola, " + userData.nombre);
    }
}
