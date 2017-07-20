require(
    [
        'urijs/URI',
        'services/evaluation',
        'components/evaluation-info',
        'components/accordion',
        'components/loader'
    ],
    function(
        URI,
        Evaluation,
        EvalInfo,
        Accordion,
        Loader
    ) {
        Loader.render('#main-loader');
        const query = URI(location.href).query(true);

        localStorage.setItem("evalId", query.id);

        Evaluation.get(query.id)
            .then(function(res) {
                try {
                    EvalInfo.render('#evalInfo', res.data);
                    Accordion.render('#fracciones', res.data.articulos);

                    $('#fullPercent').html(res.data.resultado);
                    $('#resumen').attr('href', '/resume.html?id='+res.data.evaluacionId);

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