const Evaluation = {

  get: function(id) {
      var eval = null;

      $.ajax({
          method: 'get',
          url: '/api/v1/evaluaciones/'+id,
          success: function(res) {
              console.log(res);
              eval = res.data;
          },
          error: function(err) {
              console.log(err);
          }
      });

      return eval;
  }

};

