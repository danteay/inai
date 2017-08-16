define(function(){
    return {
        component: `
        <div class="item">
            <button id="co_eval" data-action="{{action}}" href="#" class="ui primary button">{{text}}</button>
        </div>
        <div class="item">
            <a href="{{resume_link}}" id="resumen" class="ui button">Resumen</a>
        </div>
        `,

        events: function() {
            $('#co_eval').click(function() {

                const status = $(this).attr('data-action');

                require(
                    [
                        'urijs/URI',
                        'services/evaluation'
                    ],
                    function(URI, Evaluation) {
                        const query = URI(location.href).query(true);

                        Evaluation.setStatus(query.id, status)
                            .then(function(resp) {
                                location.href = '/?id=' + resp.evalId;
                            })
                            .catch(function(err) {
                                console.log(err);
                                alert('Ocurrio un error inesperado, itentelo mas tarde.');
                            });
                    }
                );
            });


        },

        render: function(cId, data){
            const component = this.component
                .replace('{{action}}', data.cierre === 1 ? 'open' : 'close')
                .replace('{{text}}', data.cierre === 0 ? 'Finalizar' : 'Abrir')
                .replace('{{resume_link}}', '/resume.html?id=' + data.evaluacionId);

            $(cId).html(component);
            this.events();
        }
    };
});