define(function() {
    return {
        getByArticle: function(evalId, artId, page = 1) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    method: 'get',
                    url: '/api/v1/evaluaciones/' + evalId + '/articulos/' + artId + '/preguntas?page=' + page,
                    success: function(res) {
                        resolve({
                            data: res,
                            artId: artId,
                            evalId: evalId
                        });
                    },
                    error: function(err) {
                        reject({
                            code: err.status,
                            error: true,
                            service: 'question service'
                        });
                    }
                });
            });
        }
    };
});
