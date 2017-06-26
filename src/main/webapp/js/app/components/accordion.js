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
            <span style="float: right;">Completado: {{artPrecent}} %</span>
        </div>
        <div class="content">
            <div id="preguntas-art-{{articleId}}" class="transition hidden"></div>
            
            <p class="transition hidden">
                <div class="ui grid">
                    <div id="pagination-art-{{articleId}}" class="twelve wide column"></div>
                    <div class="four wide column text-right">
                        <button class="ui primary button">
                            Guardar
                        </button>
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
                var articleId = $(this).attr('data-article');

                QuestionsService.getByArticle(articleId)
                    .then(function(res) {
                        var questionsId = '#preguntas-art-'+res.articuloId;

                        if ($(questionsId).html() === '') {
                            for (var i = 0; i < res.data.data.length; i++) {
                                Question.add(questionsId, res.data.data[i]);
                            }
                        }

                        var pagInfo = {
                            pag: res.data.pagination,
                            artId: res.articuloId
                        };

                        Pagination.render('#pagination-art-'+res.articuloId, pagInfo);
                    })
                    .catch(function(err) {
                        throw err;
                    });
            });
        },

        render: function(cId, data) {
            var _this = this;

            require(this.required,
                function(
                    QuestionsService,
                    Pagination,
                    Question
                ) {
                    var items = '';

                    for (var i = 0; i < data.length; i++){
                        var articuloId = data[i].articuloId;
                        var title = 'Articulo ' + data[i].articuloClave + ': '+data[i].descripcion;

                        var aux = _this.item
                            .replace('{{title}}', title)
                            .replace('{{articleId}}', articuloId)
                            .replace('{{articleId}}', articuloId)
                            .replace('{{articleId}}', articuloId);

                        items = items + aux;
                    }

                    var component = _this.component.replace('{{items}}', items);

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
