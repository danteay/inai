define(function() {
    return {
        component: `
        <div class="ui buttons center">
            <button class="ui labeled icon button">
                <i class="left chevron icon"></i> Anterior
            </button>
            
            {{items}}
            
            <button class="ui right labeled icon button">
                Siguiente <i class="right chevron icon"></i>
            </button>
        </div>`,

        item: `<button class="ui button reload-page" data-artid="{{artId}}" data-page="{{page}}">{{label}}</button>`,

        events: function(){
            $('.reload-page').click(function(){
                const artId = $(this).attr('data-artid');
                const page = $(this).attr('data-page');
                const evalInfo = JSON.parse(localStorage.getItem('evalInfo'));

                require(
                    [
                        'services/questions',
                        'components/question'
                    ],
                    function(Questions, Question) {
                        Questions.getByArticle(evalInfo.evaluacionId, artId, page)
                            .then(function(res) {
                                var questionsId = '#preguntas-art-'+res.artId;

                                $(questionsId).html('');

                                for (var i = 0; i < res.data.data.length; i++) {
                                    const data = {
                                        evalId: res.evalId,
                                        artId: res.artId,
                                        descripcion: res.data.data[i].descripcion,
                                        comentario: res.data.data[i].comentario,
                                        articuloFraccionId: res.data.data[i].articuloFraccionId
                                    };

                                    Question.add(questionsId, data);
                                }
                            })
                            .catch(function(err) {
                                console.log(err);
                                throw err;
                            });
                    }
                );
            });
        },

        render: function(cId, data) {
            var items = '';

            for (var i = 0; i < data.pag.totalPages; i++) {
                items = items + this.item
                    .replace('{{label}}', i+1)
                    .replace('{{artId}}', data.artId)
                    .replace('{{page}}', i+1);
            }

            var component = this.component.replace('{{items}}', items);

            $(cId).html(component);

            this.events();
        }
    };
});