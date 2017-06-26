define(function() {
    return {
        component: `
        <div class="question">
            <p><b class="qtitle">{{title}}</b></p>
            
            <hr><br>
           
            <p id="answers-{{afId}}"></p>
            <p id="coment-{{afId}}"></p>
        </div>
        `,



        add: function(cId, data) {
            console.log(data);

            var component = this.component
                .replace('{{title}}', data.descripcion)
                .replace('{{afId}}', data.articuloFraccionId)
                .replace('{{afId}}', data.articuloFraccionId);

            var comentInfo = {
                articuloFraccionId: data.articuloFraccionId,
                comentario: data.comentario
            };

            $(cId).html($(cId).html() + component);

            var comentsTag = '#coment-' + data.articuloFraccionId;
            var aswersTag = '#answers-' + data.articuloFraccionId;

            require(
                [
                    'components/coments',
                    'components/answers'
                ],
                function(Coments, Answers) {
                    Coments.render(comentsTag, comentInfo);
                    Answers.render(aswersTag, comentInfo);
                }
            );
        }
    };
});