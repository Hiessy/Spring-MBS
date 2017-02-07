var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false,
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            submitHandler: function(){
                var requestData = {
                    "correo": $("#correo").val(),
                    "contrasena": $("#contrasena").val()
                }

                $.ajax({
                    url: "/manager/validate/usuario",
                    type: "PUT",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(requestData)
                }).done(function(data){
                    // Mete datos en localStorage
                    var userData = data.data;
                    localStorage.setItem('userData', JSON.stringify(userData));
                    // Redirige a la pantalla correspondiente
                    window.location = 'main.html';
                }).fail(function(data){
                    // Mostrar mensaje de error
                    toastr.error("Correo o usuario inválidos.");
                });
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit();
                }
                return false;
            }
        });
    }

    return {
        init: function() {
            handleLogin();
        }
    };
}();

jQuery(document).ready(function() {
    // Limpia localStorage
    localStorage.clear();
    Login.init();
});