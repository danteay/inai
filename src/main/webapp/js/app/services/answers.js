define(function() {
    return {
        getByQuestion: function(id) {
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: '/api/v1/preguntas/' + id + '/respuestas',
                    type: 'get',
                    success: function(res) {
                        resolve({
                            afId: id,
                            info: res
                        });
                    },
                    error: function(err) {
                        console.log(err);
                        reject({
                            code: err.status,
                            error: true
                        });
                    }
                });
            });
        }
    };
});