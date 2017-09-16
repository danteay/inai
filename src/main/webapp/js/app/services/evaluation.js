define(function(){
    return {
        /**
         * Returns basic evaluation info
         *
         * @param id
         * @returns {Promise}
         */
        get: function(id) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    type: 'get',
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
        },

        /**
         * Close or open a specific evaliation
         *
         * @param id
         * @param status
         */
        setStatus: function(id, status) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    type: 'post',
                    url: '/api/v1/evaluaciones/' + id + '/?status=' + status,
                    success: function(res) {
                        resolve(res);
                    },
                    error: function(err) {
                        console.log(err);
                        reject({
                            code: err.status,
                            error: true,
                            service: 'colse-open.evaluation'
                        });
                    }
                });
            });
        }
    };
});

