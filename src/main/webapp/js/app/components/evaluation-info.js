define(function() {
    return {
        component: `
        <div class="sixteen wide column info-so">
            <div class="ui piled segment">
                <h2 class="ui header">Sujeto obligado <small style="float: right" id="fechaEval"></small></h2>
                <div class="ui divider"></div>
                <p id="infoSO">
                    <b>Nombre:</b> <span id="nombreSO"></span> <br/>
                    <b>Portal:</b> <span id="portalSO"></span> <br/>
                    <b>Correo:</b> <span id="correoSO"></span> <br/>
                    <b>Direccion:</b> <span id="direccion"></span> <br/>
                </p>
            </div>
        </div>
        `,

        render: function(cId, data) {
            $(cId).html(this.component);

            $('#nombreSO').html(data.sujetoObligado.sujeto);
            $('#portalSO').html(data.sujetoObligado.portalInternet);
            $('#correoSO').html(data.sujetoObligado.correoWeb);
            $('#direccion').html(data.sujetoObligado.direccion);

            $('#fechaEval').html(data.fechaEvaluacion)
        }
    };
});