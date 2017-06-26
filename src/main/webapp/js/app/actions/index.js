require(
    [
        'urijs/URI',
        'services/evaluation',
        'components/accordion',
        'components/loader'
    ],
    function(
        URI,
        Evaluation,
        Accordion,
        Loader
    ) {
        Loader.render('#main-loader');
        const query = URI(location.href).query(true);

        Evaluation.get(query.id)
            .then(function(res) {
                console.log(res);
                fillData(res.data);

                try {
                    Accordion.render('#fracciones', res.data.articulos);
                    $('#main-loader').css('display', 'none');
                } catch (e) {
                    return Promise.reject(e);
                }
            })
            .catch(function(err) {
                location.href = '/error.html?code='+err.code;
            });
    }
);

function fillSujetoObligado(data) {
    $('#nombreSO').html(data.sujeto);
    $('#portalSO').html(data.portalInternet);
    $('#correoSO').html(data.correoWeb);
    $('#direccion').html(data.direccion);
}

function fillData(data) {
    fillSujetoObligado(data.sujetoObligado);

    $('#fechaEval').html(data.fechaEvaluacion);
    $('#fullPercent').html(data.resultado.toFixed(2));
}
