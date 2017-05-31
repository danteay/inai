package com.inai.controllers;

import com.inai.helpers.IOHelpers;
import com.inai.libs.DB;
import com.inai.models.Articulo;
import com.inai.models.Evaluacion;
import com.inai.models.SujetoObligado;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/v1")
public class Rest {

    @GET
    @Path("/evaluations/{eval_id}/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getArticlesForEvaluation(@Context HttpServletRequest req, @PathParam("eval_id") int id) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Evaluacion evaluacion = new Evaluacion(conx);

            resp.put("data", evaluacion.getByEvaluacionId(id));

            System.out.println(resp);
        } catch(Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

}
