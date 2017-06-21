define(function(){
    return {
        required: [
            'services/questions',
            'components/pagination'
        ],

        component: `
        <div class="ui styled fluid accordion">
            {{items}}
        </div>`,

        item: `
        <div class="title">
            <i class="dropdown icon"></i>
            {{title}} 
            <span style="float: right">Completado: {{artPrecent}} %</span>
        </div>
        <div class="content">
            <p id="preguntas-art-{{art_question_id}}" class="transition hidden"></p>
            
            <p id="pagination-art-{{art_pag_id}}" class="transition hidden"></p>
        </div>`,

        render: function(cId, data) {
            var _this = this;

            require(this.required,
                function(
                    QuestionsService,
                    Pagination
                ) {
                    var items = '';

                    for (var i = 0; i < data.length; i++){
                        var articuloId = data[i].articuloId;
                        var title = 'Articulo ' + data[i].articuloClave + ': '+data[i].descripcion;

                        var aux = _this.item
                            .replace('{{title}}', title)
                            .replace('{{art_question_id}}', articuloId)
                            .replace('{{art_pag_id}}', articuloId);

                        QuestionsService.getByArticle(articuloId)
                            .then(function(res) {
                                console.log(res);
                                Pagination.render('#pagination-art-'+res.articuloId, res.data.pagination)
                            })
                            .catch(function(err) {
                                throw err;
                            });

                        items = items + aux;
                    }

                    var component = _this.component.replace('{{items}}', items);

                    $(cId).html(component);
                    $('.ui.accordion').accordion();
                }
            );
        }
    };
});
