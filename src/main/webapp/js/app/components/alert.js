define(function() {
    return {
        component: `
        <div class="ui icon {{class}} large message">
            <i class="{{icon}} icon"></i>
            <div class="content">
                <div class="header">
                    {{header}}
                </div>
                <p>{{message}}</p>
            </div>
        </div>
        `,

        events: function() {
        },

        render: function(cId, percent) {
            const colors = {
                error:   'negative',
                warning: 'yellow',
                good:    'blue',
                perfect: 'green'
            };

            const icons = {
                error:   'remove circle',
                warning: 'warning circle',
                good:    'check circle',
                perfect: 'star'
            };

            const headers = {
                error:   'Evaluación no aceptable.',
                warning: 'Evaluación en riesgo.',
                good:    'Evaluación aceptable.',
                perfect: 'Evaluación perfecta.'
            };

            const messages = {
                error:   `Su nivel de cumplimiento es demasiado bajo, lo exhortamos para que complete y actualice la 
                         información mínima de oficio en su portal de internet, evitando futuras sanciones.`,
                warning: `Lo invitamos a seguir completando y actualizando la información en su portal de transparencia, 
                         evitando así futuras sanciones por incumplimiento en la publicación de la información mínima de 
                         oficio.`,
                good:    `Su nivel de cumplimiento es aceptable, sin embargo puede  aumentar el nivel del mismo por lo 
                         que lo invitamos a seguir completando y actualizando la información en su portal de 
                         transparencia.`,
                perfect: `Lo felicitamos por haber logrado el cien por ciento de cumplimiento de la información mínima 
                         de oficio, lo invitamos a seguir completando y actualizando la información en su portal de 
                         transparencia.`
            };

            if (percent == 100) {
                const component = this.component
                    .replace('{{class}}', colors.perfect)
                    .replace('{{icon}}', icons.perfect)
                    .replace('{{header}}', headers.perfect)
                    .replace('{{message}}', messages.perfect);

                $(cId).html(component);
            } else if (percent >= 80 && percent < 100) {
                const component = this.component
                    .replace('{{class}}', colors.good)
                    .replace('{{icon}}', icons.good)
                    .replace('{{header}}', headers.good)
                    .replace('{{message}}', messages.good);

                $(cId).html(component);
            } else if (percent >= 60 && percent < 80) {
                const component = this.component
                    .replace('{{class}}', colors.warning)
                    .replace('{{icon}}', icons.warning)
                    .replace('{{header}}', headers.warning)
                    .replace('{{message}}', messages.warning);

                $(cId).html(component);
            } else if (percent < 60) {
                const component = this.component
                    .replace('{{class}}', colors.error)
                    .replace('{{icon}}', icons.error)
                    .replace('{{header}}', headers.error)
                    .replace('{{message}}', messages.error);

                $(cId).html(component);
            }

            this.events();
        }
    };
});