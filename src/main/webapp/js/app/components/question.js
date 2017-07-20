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

            const component = this.component
                .replace('{{title}}', data.descripcion)
                .replace('{{afId}}', data.articuloFraccionId)
                .replace('{{afId}}', data.articuloFraccionId);

            const comentInfo = {
                articuloFraccionId: data.articuloFraccionId,
                comentario: data.comentario,
                evalId: data.evalId,
                artId: data.artId
            };

            $(cId).html($(cId).html() + component);

            const comentsTag = '#coment-' + data.articuloFraccionId;
            const aswersTag = '#answers-' + data.articuloFraccionId;

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