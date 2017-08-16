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
                    value="{{value}}"
                    {{checked}} {{disable}}>
                <label>{{label}}</label>
            </div>
        </div>
        `,

        render: function(cId, info) {
            const _this = this;

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
                    Answers.getByQuestion(info.evalId, info.artId, info.articuloFraccionId)
                        .then(function(res){
                            const sustantivos = res.info.data.sustantivos;
                            const adjetivos = res.info.data.adjetivos;

                            var auxSus = '';
                            var auxAdj = '';

                            const evalInfo = JSON.parse(localStorage.getItem('evalInfo'));
                            const statusBlock = evalInfo.cierre === 1 ? 'disabled' : '';

                            if (sustantivos.length >= 1) {
                                for (var i = 0; i < sustantivos.length; i++) {
                                    var aux1 = _this.item
                                        .replace('{{afId}}', sustantivos[i].articuloFraccionId)
                                        .replace('{{afrId}}', sustantivos[i].artFraccRespuestaId)
                                        .replace('{{value}}', sustantivos[i].valor)
                                        .replace('{{label}}', sustantivos[i].respuesta)
                                        .replace('{{disable}}', statusBlock);

                                    if (sustantivos[i].checked) {
                                        aux1 = aux1.replace('{{checked}}', 'checked');
                                    }

                                    auxSus += aux1;
                                }
                            } else {
                                $('#cont-sus-'+res.afId).css('display','none');
                            }

                            if (adjetivos.length >= 1) {
                                for (var i = 0; i < adjetivos.length; i++) {
                                    var aux2 = _this.item
                                        .replace('{{afId}}', adjetivos[i].articuloFraccionId)
                                        .replace('{{afrId}}', adjetivos[i].artFraccRespuestaId)
                                        .replace('{{value}}', adjetivos[i].valor)
                                        .replace('{{label}}', adjetivos[i].respuesta)
                                        .replace('{{disable}}', statusBlock);

                                    if (adjetivos[i].checked) {
                                        aux2 = aux2.replace('{{checked}}', 'checked');
                                    }

                                    auxAdj += aux2;
                                }
                            } else {
                                $('#cont-adj-'+res.afId).css('display','none');
                            }

                            $('#answ-sus-'+res.afId).html(auxSus);
                            $('#answ-adj-'+res.afId).html(auxAdj);
                        })
                        .catch(function(err){
                            console.log(err);
                            throw err;
                        });
                }
            );
        }
    };
});