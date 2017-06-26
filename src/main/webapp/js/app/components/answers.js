define(function() {
    return {
        component: `
        <div class="ui form">
            <div class="ui grid">
                <div class="sixteen wide column" id="cont-adj-{{afId}}">
                    <span class="subtitle">Adjetivos</span>
                    <div class="ui divider"></div>
                    
                    <div id="answ-adj-{{afId}}"></div>
                </div>
                
                <div class="sixteen wide column" id="cont-sus-{{afId}}">
                    <span class="subtitle">Sustantivos</span>
                    <div class="ui divider"></div>
                    
                    <div id="answ-sus-{{afId}}"></div>
                </div>
            </div>
        </div>
        `,

        item: `
        <div class="inline field">
            <div class="ui checkbox">
                <input tabindex="0" class="hidden" type="checkbox" 
                    data-efid="{{afId}}"
                    data-afrid="{{afrId}}"
                    value="{{value}}">
                <label>{{label}}</label>
            </div>
        </div>
        `,

        render: function(cId, info) {
            var _this = this;

            var component = this.component
                .replace('{{afId}}', info.articuloFraccionId)
                .replace('{{afId}}', info.articuloFraccionId)
                .replace('{{afId}}', info.articuloFraccionId)
                .replace('{{afId}}', info.articuloFraccionId);

            $(cId).html(component);

            require(
                [
                    'services/answers'
                ],
                function(Answers) {
                    Answers.getByQuestion(info.articuloFraccionId)
                        .then(function(res){
                            console.log(res);
                            var sustantivos = res.info.data.sustantivos;
                            var adjetivos = res.info.data.adjetivos;

                            var auxSus = '';
                            var auxAdj = '';

                            if (sustantivos.length >= 1) {
                                for (var i = 0; i < sustantivos.length; i++) {
                                    var aux = _this.item
                                        .replace('{{afId}}', sustantivos[i].articuloFraccionId)
                                        .replace('{{afrId}}', sustantivos[i].artFraccRespuestaId)
                                        .replace('{{value}}', sustantivos[i].valor)
                                        .replace('{{label}}', sustantivos[i].respuesta);

                                    auxSus += aux;
                                }
                            } else {
                                $('#cont-sus-'+res.afId).css('display','none');
                            }

                            if (adjetivos.length >= 1) {
                                for (var i = 0; i < adjetivos.length; i++) {
                                    var aux = _this.item
                                        .replace('{{afId}}', adjetivos[i].articuloFraccionId)
                                        .replace('{{afrId}}', adjetivos[i].artFraccRespuestaId)
                                        .replace('{{value}}', adjetivos[i].valor)
                                        .replace('{{label}}', adjetivos[i].respuesta);

                                    auxAdj += aux;
                                }
                            } else {
                                $('#cont-adj-'+res.afId).css('display','none');
                            }

                            $('#answ-sus-'+res.afId).html(auxSus);
                            $('#answ-adj-'+res.afId).html(auxAdj);
                        })
                        .catch(function(err){
                            throw err;
                        });
                }
            );
        }
    };
});