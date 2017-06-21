define(function() {
    return {
        getByArticle: function(id) {
            console.log('=====>> /api/v1/articulos/' + id + '/preguntas');

            return new Promise(function(resolve, reject) {
                $.ajax({
                    method: 'get',
                    url: '/api/v1/articulos/' + id + '/preguntas',
                    success: function(res) {
                        resolve({
                            data: res,
                            articuloId: id
                        });
                    },
                    error: function(err) {
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
