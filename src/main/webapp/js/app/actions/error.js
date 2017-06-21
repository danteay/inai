var message = null;

require(
    [
        'urijs/URI'
    ],
    function(URI) {
        var query = URI(location.href).query(true);

        switch (parseInt(query.code)) {
            case 404:
                message = 'No se encontro la evaluación solicitada.';
                break;
            case 500:
                message = 'Se produjo un error en el servicio, intentelo mas tarde.';
                break;
            default:
                message = 'Se produjo un error inesperado, intentalo mas tarde.';
                break;
        }

        $('#message').html(message);
    }
);