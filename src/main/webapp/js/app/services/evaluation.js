define(function(){
    return {
        get: function(id) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    method: 'get',
                    url: '/api/v1/evaluaciones/'+id,
                    success: function(res) {
                        resolve(res);
                    },
                    error: function(err) {
                        reject({
                            code: err.status,
                            error: true,
                            service: 'evaluation service'
                        });
                    }
                });
            });
        }
    };
});

