function setComent(elem) {
    const id = $(elem).attr('data-afid');
    const target = '#comentario[data-afid="' + id +'"]';

    console.log($(target));

    $(target).val($(elem).val());
}

define(function() {
    return {
        component: `
        <div class="ui form">
            <div class="eight wide columns">
                <div class="field">
                    <label>Incidencias</label>
                    <select class="ui fluid dropdown" onchange="setComent(this)" id="incidencia" data-afid="{{afId}}" {{disabled}}>
                      {{incidencias}}
                    </select>
                </div>    
            </div>
            <div class="eight wide columns">
                <div class="field">
                    <label>Comentarions</label>
                    <textarea id="comentario" data-afid="{{afId}}" rows="2" {{disabled}}>{{comentario}}</textarea>
                </div>
            </div>
        </div>
        `,

        item: `
        <option value="{{value}}">{{value}}</option>
        `,

        events: function() {
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

                            const evalInfo = JSON.parse(localStorage.getItem('evalInfo'));

                            var component = _this.component
                                .replace('{{comentario}}', info.comentario)
                                .replace('{{afId}}', info.articuloFraccionId)
                                .replace('{{afId}}', info.articuloFraccionId)
                                .replace('{{afId}}', info.articuloFraccionId)
                                .replace('{{incidencias}}', items)
                                .replace('{{disabled}}', evalInfo.cierre === 1 ? 'disabled' : '')
                                .replace('{{disabled}}', evalInfo.cierre === 1 ? 'disabled' : '');

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