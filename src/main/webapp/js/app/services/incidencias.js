define(function(){
    return {
        getAll: function() {
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: '/api/v1/incidencias',
                    type: 'get',
                    success: function(res) {
                        resolve(res);
                    },
                    error: function(err) {
                        console.log(err);
                        reject({
                            code: err.status,
                            error: true,
                            service: 'incidencias service'
                        });
                    }
                });
            });
        }
    };
});