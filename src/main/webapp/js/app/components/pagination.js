define(function() {
    return {
        component: `
        <div class="ui buttons center">
            <button class="ui labeled icon button">
                <i class="left chevron icon"></i> Anterior
            </button>
            
            {{items}}
            
            <button class="ui right labeled icon button">
                Siguiente <i class="right chevron icon"></i>
            </button>
        </div>`,

        item: `<button class="ui button">{{label}}</button>`,

        render: function(cId, data) {
            var items = '';

            for (var i = 0; i < data.totalPages; i++) {
                items = items + this.item.replace('{{label}}', i+1);
            }

            var component = this.component.replace('{{items}}', items);

            console.log(cId);
            console.log(document.querySelector(cId));
            $(cId).html(component);
        }
    };
});