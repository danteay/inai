define(function() {
    return {
        getByArticle: function(id, page = 1) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    method: 'get',
                    url: '/api/v1/articulos/' + id + '/preguntas?page='+page,
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
