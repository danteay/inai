define(function() {
    return {
        getByQuestion: function(evalId, artId, questId) {
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: '/api/v1/evaluaciones/'+evalId+'/articulos/'+artId+'/preguntas/'+questId+'/respuestas',
                    type: 'get',
                    success: function(res) {
                        resolve({
                            afId: questId,
                            info: res
                        });
                    },
                    error: function(err) {
                        console.log(err);
                        reject({
                            code: err.status,
                            error: true,
                            service: 'answers service'
                        });
                    }
                });
            });
        }
    };
});