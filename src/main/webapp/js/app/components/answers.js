define(function() {
    return {
        component: `
        <div class="ui form">
            <div class="ui grid">
                <div class="sixteen wide column">
                    <div class="field">
                        <label>Respuesta</label>
                        <select class="ui fluid dropdown" name="valor-afId" id="valor-afId-{{afId}}" {{disabled}}>
                            <option value="0"  {{select-1}}>0</option>
                            <option value="0.5" {{select-2}}>0.5</option>
                            <option value="1" {{select-3}}>1</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        `,

        render: function(cId, info) {
            const evalInfo = JSON.parse(localStorage.getItem('evalInfo'));


            var component = this.component
                .replace('{{disabled}}', evalInfo.cierre === 1 ? 'disabled' : '')
                .replace('{{afId}}', info.articuloFraccionId);

            if (info.respuesta > 0 && info.respuesta <= 0.5) {
                component = component
                    .replace('{{select-2}}', 'selected')
                    .replace('{{select-1}}', '')
                    .replace('{{select-3}}', '')
            } else if (info.respuesta > 0.5 && info.respuesta <= 1) {
                component = component
                    .replace('{{select-2}}', '')
                    .replace('{{select-1}}', '')
                    .replace('{{select-3}}', 'selected')
            } else {
                component = component
                    .replace('{{select-2}}', '')
                    .replace('{{select-1}}', 'selected')
                    .replace('{{select-3}}', '')
            }

            $(cId).html(component);
        }
    };
});