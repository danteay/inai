require(
    [
        'urijs/URI',
        'services/evaluation',
        'components/evaluation-info',
        'components/accordion',
        'components/loader',
        'components/nav-actions'
    ],
    function(
        URI,
        Evaluation,
        EvalInfo,
        Accordion,
        Loader,
        NavActions
    ) {
        Loader.render('#main-loader');
        const query = URI(location.href).query(true);

        Evaluation.get(query.id)
            .then(function(res) {
                try {
                    NavActions.render('#nav_actions', res.data);
                    EvalInfo.render('#evalInfo', res.data);
                    Accordion.render('#fracciones', res.data.articulos);

                    $('#fullPercent').html(res.data.resultado);
                    $('#main-loader').css('display', 'none');

                    localStorage.setItem('evalInfo', JSON.stringify(res.data));
                } catch (e) {
                    return Promise.reject(e);
                }
            })
            .catch(function(err) {
                location.href = '/error.html?code='+err.code;
            });
    }
);