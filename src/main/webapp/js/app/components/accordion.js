define(function(){
    return {
        required: [
            'services/questions',
            'components/pagination',
            'components/question'
        ],

        component: `
        <div class="ui styled fluid accordion">
            {{items}}
        </div>`,

        item: `
        <div class="title" data-article="{{articleId}}">
            <i class="dropdown icon"></i>
            {{title}} 
            <span style="float: right;">Completado: {{artPercent}} %</span>
        </div>
        <div class="content">
            <div id="preguntas-art-{{articleId}}" class="transition hidden"></div>
            
            <p class="transition hidden">
                <div class="ui grid">
                    <div id="pagination-art-{{articleId}}" class="twelve wide column"></div>
                    <div class="four wide column text-right">
                        <button class="ui primary button" {{hide_save}}>Guardar</button>
                    </div>
                </div>
            </p>
        </div>`,

        onClick: function(
            QuestionsService,
            Pagination,
            Question
        ) {
            $('.ui.accordion .title').click(function(){
                const artId = $(this).attr('data-article');
                const evalInfo = JSON.parse(localStorage.getItem('evalInfo'));

                QuestionsService.getByArticle(evalInfo.evaluacionId, artId, 1)
                    .then(function(res) {
                        const questionsId = '#preguntas-art-'+res.artId;

                        if ($(questionsId).html() === '') {
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
                        }

                        const pagInfo = {
                            pag: res.data.pagination,
                            artId: res.artId
                        };

                        Pagination.render('#pagination-art-'+res.artId, pagInfo);
                    })
                    .catch(function(err) {
                        console.log(err);
                        throw err;
                    });
            });
        },

        render: function(cId, data) {
            const _this = this;
            const evalInfo = JSON.parse(localStorage.getItem('evalInfo'));

            require(this.required,
                function(
                    QuestionsService,
                    Pagination,
                    Question
                ) {
                    var items = '';

                    for (var i = 0; i < data.length; i++){
                        const articuloId = data[i].articuloId;
                        const title = 'Articulo ' + data[i].articuloClave + ': '+data[i].descripcion;
                        const percent = data[i].percent;

                        items += _this.item
                            .replace('{{title}}', title)
                            .replace('{{articleId}}', articuloId)
                            .replace('{{articleId}}', articuloId)
                            .replace('{{articleId}}', articuloId)
                            .replace('{{artPercent}}', percent)
                            .replace('{{hide_save}}', evalInfo.cierre === 1 ? 'style="display: none"': '');
                    }

                    const component = _this.component.replace('{{items}}', items);

                    $(cId).html(component);
                    $('.ui.accordion').accordion();

                    _this.onClick(
                        QuestionsService,
                        Pagination,
                        Question
                    );
                }
            );
        }
    };
});
