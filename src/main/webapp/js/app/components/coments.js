define(function() {
    return {
        component: `
        <div class="ui form">
            <div class="eight wide columns">
                <div class="field">
                    <label>Comentarions</label>
                    <textarea id="comentario" data-afid="{{afId}}" rows="2" >{{comentario}}</textarea>
                </div>
            </div>
            <div class="eight wide columns">
                <div class="field">
                    <label>Incidencias</label>
                    <div class="ui selection dropdown">
                        <input id="incidencia" data-afid="{{afId}}" type="hidden">
                        <i class="dropdown icon"></i>
                        <div class="default text">Seleccione un comentario automatico.</div>
                        <div class="menu" id="list-incidencias-{{afId}}">
                            {{incidencias}}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        `,

        item: `
        <div class="item" data-value="{{value}}">{{value}}</div>
        `,

        events: function() {
            $('input:hidden#incidencia').change(function(e) {
                var id = $(this).attr('data-afid');
                var target = '#comentario[data-afid="' + id +'"]';

                $(target).val($(this).val());
            });
        },

        render: function(cId, info) {
            var _this = this;

            require(
                [
                    'services/incidencias'
                ],
                function(Incidencias) {
                    Incidencias.getAll()
                        .then(function(res){
                            var items = '';

                            for (var i = 0; i < res.data.length; i++) {
                                var aux = _this.item
                                    .replace('{{value}}', res.data[i].descripcion)
                                    .replace('{{value}}', res.data[i].descripcion);

                                items += aux;
                            }

                            var component = _this.component
                                .replace('{{comentario}}', info.comentario)
                                .replace('{{afId}}', info.articuloFraccionId)
                                .replace('{{afId}}', info.articuloFraccionId)
                                .replace('{{afId}}', info.articuloFraccionId)
                                .replace('{{incidencias}}', items);

                            $(cId).html(component);
                            $('.ui.dropdown').dropdown();

                            _this.events();
                        })
                        .catch(function(err){
                            throw err;
                        });
                }
            );
        }
    };
});