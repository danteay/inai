require(
    [
        'urijs/URI',
        'services/evaluation',
        'components/evaluation-info',
        'components/resume-table',
        'components/alert',
        'components/loader'
    ],
    function(
        URI,
        Evaluation,
        EvalInfo,
        ResumeTable,
        Alert,
        Loader
    ) {
        Loader.render('#main-loader');
        const queryString = URI(location.href).query(true);

        if (queryString.id) {
            Evaluation.get(queryString.id)
                .then(function(res) {
                    try {
                        Alert.render('#message', res.data.resultado);
                        EvalInfo.render('#evalInfo', res.data);
                        ResumeTable.render('#resumeTable', res.data.articulos);

                        $('#fullPercent').html(res.data.resultado);
                        $('#returnln').attr('href', '/?id='+res.data.evaluacionId);
                        $('#main-loader').css('display', 'none');
                    } catch (e) {
                        return Promise.reject(e);
                    }
                })
                .catch(function(err) {
                    location.href = '/error.html?code='+err.code;
                });
        } else {
            location.href = '/error.html?code=404';
        }
    }
);