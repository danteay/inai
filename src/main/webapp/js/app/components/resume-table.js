define(function() {
    return {
        component: `
        <table class="ui celled table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Articulo</th>
                    <th>Porcentaje</th>
                </tr>
            </thead>
            <tbody>
                {{items}}
            </tbody>
        </table>
        `,

        item: `
        <tr class="{{class}}">
            <td>{{artNumber}}</td>
            <td>{{title}}</td>
            <td>{{percent}}</td>
        </tr>
        `,

        events: function() {},

        render: function(cId, data) {
            const colors = {
                error:   'negative',
                warning: 'warning',
                good:    '',
                perfect: ''
            };

            var items = '';

            for (var i = 0; i < data.length; i++){
                const title = 'Articulo ' + data[i].articuloClave + ': '+data[i].descripcion;
                const percent = data[i].percent;

                items += this.item
                    .replace('{{title}}', title)
                    .replace('{{class}}', function () {
                        if (percent == 100) {
                            return colors.perfect;
                        } else if (percent >= 80 && percent < 100) {
                            return colors.good;
                        } else if (percent >= 60 && percent < 80) {
                            return colors.warning;
                        } else if (percent < 60) {
                            return colors.error;
                        } else {
                            return '';
                        }
                    })
                    .replace('{{artNumber}}', data[i].articuloClave)
                    .replace('{{percent}}', percent);
            }

            const component = this.component.replace('{{items}}', items);

            $(cId).html(component);

            this.events();
        },
    };
});