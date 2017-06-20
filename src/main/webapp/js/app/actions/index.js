var evalInfo = null;

require(['urijs/URI'], function(URI) {
    const evalId = URI(location.href).id;
    console.log(evalId);

    require(['evaluation/Evaluation'], function(Evaluation) {
        evalInfo = Evaluation.get(evalId);
    });
});

$(document).ready(function(){

    console.log(evalInfo);

});

